import { useEffect, useState } from "react";
import { EventType } from "../types";
import { fetchEvents } from "../api/fetchEvents";
import EventCard from "../components/EventCard";
import Pagination from "../components/Pagination";
import SkeletonCard from "../components/SkeletonCard";
import Alert from "../components/Alert";

export default function EventBoard() {
  const [events, setEvents] = useState<EventType[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const placeholderItems = Array.from({ length: 6 });

  useEffect(() => {
    loadEvents(currentPage);
  }, [currentPage]);

  async function loadEvents(page: number): Promise<void> {
    setLoading(true);
    try {
      const { events, totalPages } = await fetchEvents(page, 12);
      setEvents(events);
      setTotalPages(totalPages);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {error && (
        <Alert variant="error">
          We're sorry, it seems the server is down. Please try again later.
        </Alert>
      )}
      <main className="flex min-h-screen flex-col p-6">
        <header className="mb-6">
          <h1 className="text-4xl font-bold">Events</h1>
        </header>
        <section className="mb-10 flex-grow">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {loading || events === null
              ? placeholderItems.map((_, index) => <SkeletonCard key={index} />)
              : events.map((event) => (
                  <EventCard key={event._id} event={event} />
                ))}
          </div>
        </section>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </main>
    </>
  );
}
