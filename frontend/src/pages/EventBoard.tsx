import { useCallback, useEffect, useState } from "react";
import { EventType } from "../types";
import { fetchEvents } from "../api/fetchEvents";
import EventCard from "../components/EventCard";
import Pagination from "../components/Pagination";
import SkeletonCard from "../components/SkeletonCard";
import Alert from "../components/Alert";
import DropdownMenu from "../components/dropdownMenu/DropdownMenu";
import DropdownElement from "../components/dropdownMenu/DropdownElement";

export type SortOptionType = {
  field: "title" | "eventDate" | "organizer";
  order: "asc" | "desc";
  label: string;
};

const SORT_OPTIONS: Record<string, SortOptionType> = {
  TITLE_ASC: { field: "title", order: "asc", label: "Title (A-Z)" },
  TITLE_DESC: { field: "title", order: "desc", label: "Title (Z-A)" },
  DATE_ASC: { field: "eventDate", order: "asc", label: "Date (closer)" },
  DATE_DESC: { field: "eventDate", order: "desc", label: "Date (further)" },
  ORGANIZER_ASC: { field: "organizer", order: "asc", label: "Organizer (A-Z)" },
  ORGANIZER_DESC: {
    field: "organizer",
    order: "desc",
    label: "Organizer (Z-A)",
  },
};

export default function EventBoard() {
  const [events, setEvents] = useState<EventType[] | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sortOption, setSortOption] = useState<SortOptionType | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const placeholderItems = Array.from({ length: 6 });

  const loadEvents = useCallback(
    async (page: number) => {
      setLoading(true);
      try {
        const { events, totalPages } = await fetchEvents(page, 12, sortOption);
        setEvents(events);
        setTotalPages(totalPages);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    },
    [sortOption],
  );

  useEffect(() => {
    loadEvents(currentPage);
  }, [currentPage, loadEvents]);

  return (
    <>
      {error && (
        <Alert variant="error">
          We're sorry, it seems the server is down. Please try again later.
        </Alert>
      )}
      <main className="flex min-h-screen flex-col p-6">
        <header className="mb-6 flex flex-col items-start gap-x-5 gap-y-2 sm:flex-row sm:items-center">
          <h1 className="text-4xl font-bold">Events</h1>
          <DropdownMenu
            title={`Sort by${sortOption ? `: ${sortOption.label}` : ""}`}
          >
            <DropdownElement onClick={() => setSortOption(null)}>
              No Sorting
            </DropdownElement>
            <DropdownElement
              onClick={() => setSortOption(SORT_OPTIONS.TITLE_ASC)}
            >
              Title (A-Z)
            </DropdownElement>
            <DropdownElement
              onClick={() => setSortOption(SORT_OPTIONS.TITLE_DESC)}
            >
              Title (Z-A)
            </DropdownElement>
            <DropdownElement
              onClick={() => setSortOption(SORT_OPTIONS.DATE_ASC)}
            >
              Date (closer)
            </DropdownElement>
            <DropdownElement
              onClick={() => setSortOption(SORT_OPTIONS.DATE_DESC)}
            >
              Date (further)
            </DropdownElement>
            <DropdownElement
              onClick={() => setSortOption(SORT_OPTIONS.ORGANIZER_ASC)}
            >
              Organizer (A-Z)
            </DropdownElement>
            <DropdownElement
              onClick={() => setSortOption(SORT_OPTIONS.ORGANIZER_DESC)}
            >
              Organizer (Z-A)
            </DropdownElement>
          </DropdownMenu>
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
