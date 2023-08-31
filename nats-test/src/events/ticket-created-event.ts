import { Subjects } from "./subjects";

// describes the coupling between subject and particular kind of data:
export interface TicketCreatedEvent {
  subject: Subjects.TicketCreated;
  data: {
    id: string;
    title: string;
    price: number;
  };
}
