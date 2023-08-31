import { Message } from "node-nats-streaming";
import { Subjects, Listener, TicketCreatedEvent } from "@pgticketsorg/common";
import { Ticket } from "../../models/ticket";
import { queueGroupName } from "./queue-group-name";

// Listener is generic, which means we have to provide a type
export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  // subject: Subjects.TicketCreated = Subjects.TicketCreated;
  readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: TicketCreatedEvent["data"], msg: Message) {
    const { id, title, price } = data;
    // whenever we are replicating data between services we need identical ids
    const ticket = Ticket.build({
      id,
      title,
      price,
    });
    await ticket.save();

    msg.ack();
  }
}
