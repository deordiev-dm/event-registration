import { Link } from "react-router-dom";
import { EventType } from "../types";

type EventCardProps = {
  event: EventType;
};

export default function EventCard({ event }: EventCardProps) {
  return (
    <article className="flex flex-col rounded p-6 shadow transition-shadow hover:shadow-lg">
      <h2 className="mb-3 text-xl font-semibold">{event.title}</h2>
      <div className="mb-6 flex-grow space-y-2">
        <p>{event.description}</p>
        <p>
          <span className="font-medium">Organizer: </span>
          {event.organizer}
        </p>
        <p>
          <span className="font-medium">Event date: </span>
          {new Date(event.eventDate).toLocaleString("default", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>
      <div className="flex justify-between text-blue-500">
        <Link
          className="rounded-lg border border-blue-500 px-3 py-1 transition-colors hover:bg-blue-100 hover:text-blue-700"
          to={`/registration/${event._id}`}
          state={{ event }}
        >
          Register
        </Link>
        <Link
          className="rounded-lg border border-blue-500 px-3 py-1 transition-colors hover:bg-blue-100 hover:text-blue-700"
          to={`/view/${event._id}`}
          state={{ event }}
        >
          View
        </Link>
      </div>
    </article>
  );
}
