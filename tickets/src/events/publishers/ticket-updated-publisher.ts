import { Publisher, Subjects, TicketUpdatedEvent } from "@pgticketsorg/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  //   readonly subject = Subjects.TicketUpdated;
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
  // constructor() {}
}
