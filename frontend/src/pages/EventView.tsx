import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Alert from "../components/Alert";
import SkeletonCard from "../components/SkeletonCard";
import { EventType, ParticipantType } from "../types";
import ParticipantCard from "../components/ParticipantCard";

import { BACKEND_URL } from "../api/fetchEvents";

export default function EventView() {
  const [event, setEvent] = useState<EventType | null>(null);
  const [participants, setParticipants] = useState<ParticipantType[] | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const params = useParams();
  const eventId = params.id;
  const location = useLocation();

  useEffect(() => {
    async function fetchEventsAndPartcipants() {
      try {
        setLoading(true);

        let eventData = null;

        if (location.state?.event) {
          eventData = location.state.event;
        } else {
          const eventResponse = await fetch(
            `${BACKEND_URL}/api/events/${eventId}`,
          );

          if (!eventResponse.ok) {
            throw new Error("Failed to fetch event data");
          }

          eventData = await eventResponse.json();
        }

        setEvent(eventData);

        const participantsResponse = await fetch(
          `${BACKEND_URL}/api/registrations/event/${eventId}`,
        );

        if (!participantsResponse.ok) {
          throw new Error("Failed to fetch participants");
        }
        const participantsData = await participantsResponse.json();
        setParticipants(participantsData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchEventsAndPartcipants();
  }, [eventId, location.state]);

  const placeholderItems = Array.from({ length: 6 });
  const filteredParticipants = participants?.filter((participant) => {
    return (
      participant.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      participant.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  let displayedContent;

  if (loading || participants === null) {
    displayedContent = placeholderItems.map((_, index) => (
      <SkeletonCard key={index} />
    ));
  } else if (participants && participants.length > 0) {
    if (filteredParticipants && filteredParticipants.length > 0) {
      displayedContent = filteredParticipants.map((person) => (
        <ParticipantCard
          key={person._id}
          person={person}
          highlight={searchQuery}
        />
      ));
    } else {
      displayedContent = (
        <div className="text-md col-span-full bg-red-100 p-6 text-center md:text-lg">
          No participants match your search query.
        </div>
      );
    }
  } else {
    displayedContent = (
      <div className="text-md col-span-full bg-green-100 p-6 text-center md:text-lg">
        <p className="mb-3">
          No participants have registered for this event yet. <br />
          Be the first one!
        </p>
        <Link className="underline" to={`/registration/${eventId}`}>
          Register for the event!
        </Link>
      </div>
    );
  }

  return (
    <>
      {error && (
        <Alert variant="error">
          It seems the server is down. <br /> Please try again later.
        </Alert>
      )}
      <main className="flex min-h-screen flex-col p-6">
        <header className="mb-6 space-y-3">
          <h1 className="text-balanc mb-5 text-2xl font-bold md:text-4xl">
            "{event?.title || "Event"}" Participants
          </h1>
          {event && (
            <div className="space-y-3 rounded bg-blue-100 p-4 text-lg">
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
          )}
          {participants?.length ? (
            <div className="flex flex-col items-start rounded bg-emerald-100 p-4">
              <label
                htmlFor="search"
                className="text-md text-md mb-2 cursor-pointer font-semibold"
              >
                Search participants by name or email
              </label>
              <input
                id="search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-emerald-600 bg-transparent px-3 py-2 focus-within:border-blue-400 md:max-w-sm"
                placeholder="e.g. Joe Doe"
              />
            </div>
          ) : null}
        </header>
        <section className="mb-10 flex-grow">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {displayedContent}
          </div>
        </section>
      </main>
    </>
  );
}
