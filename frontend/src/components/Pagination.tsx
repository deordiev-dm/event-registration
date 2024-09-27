import { nanoid } from "nanoid";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: React.Dispatch<React.SetStateAction<number>>;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const buttonLabels = getLabels(currentPage, totalPages);

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center space-x-2 text-blue-600"
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className={`${currentPage === 1 && "pointer-events-none border-gray-400 bg-gray-100 text-gray-400 opacity-50"} hidden aspect-square items-center justify-center rounded border border-blue-500 px-2 hover:bg-blue-100 sm:flex`}
      >
        <FaArrowLeft className="h-4 w-4 transition-colors hover:text-blue-800" />
      </button>
      <div className="flex gap-x-2">
        {buttonLabels.map((label) => {
          if (label.type === "page") {
            const isActive = label.value === currentPage;
            return (
              <button
                key={nanoid()}
                className="aspect-square min-w-8 rounded border border-blue-500 px-2 py-1 transition-colors hover:bg-blue-100"
                style={{
                  backgroundColor: isActive ? "#3b82f6" : "",
                  color: isActive ? "#fff" : "#3b82f6",
                }}
                onClick={() => onPageChange(+label.value)}
              >
                {label.value}
              </button>
            );
          } else if (label.type === "ellipsis") {
            return (
              <button
                key={nanoid()}
                className="aspect-square min-w-8 rounded border border-blue-500 px-2 py-1 transition-colors hover:bg-blue-100"
                onClick={() => onPageChange(label.page)}
              >
                {label.value}
              </button>
            );
          }
        })}
      </div>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className={`${currentPage === totalPages && "pointer-events-none border-gray-400 bg-gray-100 text-gray-400 opacity-50"} hidden aspect-square items-center justify-center rounded border border-blue-500 px-2 hover:bg-blue-100 sm:flex`}
      >
        <FaArrowRight className="h-4 w-4 transition-colors hover:text-blue-800" />
      </button>
    </nav>
  );
}

type labelType =
  | { type: "page"; value: number }
  | {
      type: "ellipsis";
      value: "...";
      page: number;
    };

function getLabels(currentPage: number, totalPages: number): labelType[] {
  const labels: labelType[] = [];
  // when there is not a lof pages
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      labels.push({ type: "page", value: i });
    }
  } else {
    // current page is near the start
    if (currentPage <= 4) {
      for (let i = 1; i <= 5; i++) {
        labels.push({ type: "page", value: i });
      }
      labels.push(
        { type: "ellipsis", value: "...", page: 6 },
        { type: "page", value: totalPages },
      );
    }
    // current page is near the end
    else if (currentPage >= totalPages - 3) {
      labels.push(
        { type: "page", value: 1 },
        { type: "ellipsis", value: "...", page: totalPages - 5 },
      );
      for (let i = totalPages - 4; i <= totalPages; i++) {
        labels.push({ type: "page", value: i });
      }
    }
    // current page in the middle
    else {
      labels.push(
        { type: "page", value: 1 },
        { type: "ellipsis", value: "...", page: currentPage - 2 },
        { type: "page", value: currentPage - 1 },
        { type: "page", value: currentPage },
        { type: "page", value: currentPage + 1 },
        { type: "ellipsis", value: "...", page: currentPage + 2 },
        { type: "page", value: totalPages },
      );
    }
  }

  return labels;
}
