import { ParticipantType } from "../types";

type ParticipantCardProps = {
  person: ParticipantType;
};

export default function ParticipantCard({ person }: ParticipantCardProps) {
  const { fullName, email, registrationDate } = person;
  return (
    <article className="flex flex-col rounded p-6 shadow transition-shadow">
      <h2 className="mb-4 text-xl font-semibold">{fullName}</h2>
      <div className="space-y-2">
        <p>
          <span className="font-medium">Email:</span> {email}
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
