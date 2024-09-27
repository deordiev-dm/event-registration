import { ParticipantType } from "../types";

type ParticipantCardProps = {
  person: ParticipantType;
  highlight?: string;
};

export default function ParticipantCard({
  person,
  highlight,
}: ParticipantCardProps) {
  const { fullName, email, registrationDate } = person;

  function highlightText(text: string, query: string | undefined) {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) => {
      return part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} className="bg-blue-500 text-white">
          {part}
        </span>
      ) : (
        part
      );
    });
  }

  return (
    <article className="flex flex-col rounded bg-blue-50 p-6 shadow transition-shadow">
      <h2 className="mb-4 text-xl font-semibold">
        {highlightText(fullName, highlight)}
      </h2>
      <div className="space-y-2">
        <p>
          <span className="font-medium">Email:</span>{" "}
          {highlightText(email, highlight)}
        </p>
        <p>
          <span className="font-medium">Registered at:</span>{" "}
          {new Date(registrationDate).toLocaleString("default", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          })}
        </p>
      </div>
    </article>
  );
}
