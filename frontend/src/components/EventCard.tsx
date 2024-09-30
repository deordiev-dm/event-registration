import { Link } from "react-router-dom";
import { EventType } from "../types";

type EventCardProps = {
  event: EventType;
};

export default function EventCard({ event }: EventCardProps) {
  const hasExpired = Date.now() > new Date(event.eventDate).getTime();

  return (
    <article
      className={`${hasExpired ? "bg-gray-100 opacity-50 shadow-none hover:shadow-none" : ""} flex flex-col rounded bg-blue-50 p-6 shadow transition-shadow hover:shadow-lg`}
    >
      <h2 className="mb-3 text-xl font-semibold">{event.title}</h2>
      <div className="mb-6 flex-grow space-y-2">
        <p>{event.description}</p>
        <p>
          <span className="font-medium">Organizer: </span>
          {event.organizer}
        </p>
        <p className="flex items-center">
          <span className="font-medium">Event date: </span>
          <span
            className={`${hasExpired ? "bg-red-500" : "bg-green-500"} ml-2 mr-1 inline-block h-2 w-2 animate-pulse rounded-full`}
          ></span>
          {new Date(event.eventDate).toLocaleString("default", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
        <p>
          {" "}
          <span className="font-medium">Participants registered: </span>
          {event.participantsCount}
        </p>
      </div>
      <div className="flex justify-between text-blue-500">
        <Link
          className={`rounded-lg border border-blue-500 px-3 py-1 transition-colors ${hasExpired ? "pointer-events-none select-none border-gray-500 bg-gray-200 text-gray-400" : "hover:bg-blue-100 hover:text-blue-700"}`}
          to={hasExpired ? "#" : `/registration/${event._id}`}
          state={{ event }}
          aria-hidden={hasExpired}
        >
          Register
        </Link>
        <Link
          className={`rounded-lg border border-blue-500 px-3 py-1 transition-colors ${hasExpired ? "pointer-events-none select-none border-gray-500 bg-gray-200 text-gray-400" : "hover:bg-blue-100 hover:text-blue-700"}`}
          to={hasExpired ? "#" : `/view/${event._id}`}
          state={{ event }}
          aria-hidden={hasExpired}
        >
          View
        </Link>
      </div>
    </article>
  );
}
