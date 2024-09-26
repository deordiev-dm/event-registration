import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Alert from "../components/Alert";
import { EventType } from "../types";
import SkeletonCard from "../components/SkeletonCard";

export default function EventRegistration() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    dateOfBirth: "",
    referralSource: null,
  });
  const [submissionStatus, setSubmissionStatus] = useState<
    "success" | "error" | null
  >(null);
  const [event, setEvent] = useState<EventType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const params = useParams();
  const eventId = params.id;
  const location = useLocation();

  useEffect(() => {
    async function fetchEvent() {
      try {
        setLoading(true);

        let eventData = null;

        if (location.state?.event) {
          eventData = location.state.event;
        } else {
          const eventResponse = await fetch(
            `http://localhost:3000/api/events/${eventId}`,
          );

          if (!eventResponse.ok) {
            throw new Error("Failed to fetch event data");
          }

          eventData = await eventResponse.json();
        }

        setEvent(eventData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchEvent();
  }, [eventId, location.state]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setSubmissionStatus(null);
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSubmissionStatus(null);

    const dataToSend = {
      ...formData,
      eventId,
    };

    try {
      const response = await fetch("http://localhost:3000/api/registrations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      console.info("Data has been saved successfully", result);

      setSubmissionStatus("success");

      setFormData({
        fullName: "",
        email: "",
        dateOfBirth: "",
        referralSource: null,
      });
    } catch (err) {
      console.error("Error when submitting form:", err);
      setSubmissionStatus("error");
    }
  }

  return (
    <>
      {error && (
        <Alert variant="error">
          It seems the server is down :( <br /> Please try again later.
        </Alert>
      )}
      {submissionStatus === "success" && (
        <Alert variant="success">Success! Waiting for you on the event!</Alert>
      )}
      {submissionStatus === "error" && (
        <Alert variant="error">
          We're sorry, it seems the server is down. Please try again later.
        </Alert>
      )}
      <main className="items-start space-y-8 p-6 lg:grid lg:grid-cols-3 lg:gap-x-16">
        <section className="lg:col-span-2">
          <header className="mb-6">
            <h1 className="text-4xl font-bold">Event Registration</h1>
          </header>
          <section>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="flex flex-col items-start">
                <label htmlFor="fullName" className="text-md cursor-pointer">
                  Full Name<span className="text-red-600">*</span>
                </label>
                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  required
                  className="w-full rounded-lg border border-gray-200 bg-transparent px-3 py-2 text-base focus-within:border-blue-400"
                  placeholder="Joe Smith"
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col items-start">
                <label htmlFor="email" className="text-md cursor-pointer">
                  Email<span className="text-red-600">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  required
                  className="w-full rounded-lg border border-gray-200 bg-transparent px-3 py-2 text-base focus-within:border-blue-400"
                  placeholder="joesmith@gmail.com"
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col items-start">
                <label htmlFor="dateBirth" className="text-md cursor-pointer">
                  Date of birth<span className="text-red-600">*</span>
                </label>
                <input
                  id="dateBirth"
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  required
                  className="w-full rounded-lg border border-gray-200 bg-transparent px-3 py-2 text-base focus-within:border-blue-400"
                  placeholder="joesmith@gmail.com"
                  onChange={handleInputChange}
                />
              </div>
              <div className="text-md">
                <h2 className="mb-2 text-xl font-semibold">
                  Where did you hear about this event?
                </h2>
                <div className="flex items-center gap-x-1">
                  <input
                    type="radio"
                    value="social media"
                    name="referralSource"
                    id="socialMedia"
                    checked={formData.referralSource === "social media"}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="socialMedia" className="cursor-pointer">
                    Social media
                  </label>
                </div>
                <div className="flex items-center gap-x-1">
                  <input
                    type="radio"
                    value="friends"
                    name="referralSource"
                    id="friends"
                    checked={formData.referralSource === "friends"}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="friends" className="cursor-pointer">
                    Friends
                  </label>
                </div>
                <div className="flex items-center gap-x-1">
                  <input
                    type="radio"
                    value="found myself"
                    name="referralSource"
                    id="foundMyself"
                    checked={formData.referralSource === "found myself"}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="foundMyself" className="cursor-pointer">
                    Found myself
                  </label>
                </div>
              </div>
              <button className="w-full rounded-lg bg-blue-500 px-3 py-2 text-lg font-semibold text-white transition-colors hover:bg-blue-600 focus:bg-blue-700 active:bg-blue-800">
                Apply for the event
              </button>
            </form>
          </section>
        </section>
        {loading || !event ? (
          <SkeletonCard />
        ) : (
          <section className="rounded bg-green-100 p-4">
            <h2 className="mb-4 text-xl font-semibold">{event.title}</h2>
            <div className="text-md space-y-3">
              <p>
                <span className="font-medium">About the event:</span>{" "}
                {event.description}
              </p>
              <p>
                <span className="font-medium">Organizers:</span>{" "}
                {event.organizer}
              </p>
              <p>
                <span className="font-medium">Event date: </span>
                {new Date(event.eventDate).toLocaleString("default", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                })}
              </p>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
