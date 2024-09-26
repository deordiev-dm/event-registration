export type EventType = {
  _id: string;
  description: string;
  eventDate: Date;
  organizer: string;
  title: string;
};

export type ParticipantType = {
  _id: string;
  eventId: string;
  fullName: string;
  email: string;
  referralSource: string;
  dateOfBirth: Date;
  registrationDate: Date;
};
