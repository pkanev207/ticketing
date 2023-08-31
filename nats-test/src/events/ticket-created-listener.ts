import { Message } from "node-nats-streaming";
import { Listener } from "./base-listener";
import { TicketCreatedEvent } from "./ticket-created-event";
import { Subjects } from "./subjects";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  // providing type annotation - makes sure we will never change the value
  // if we provide only the value - subject can b e any of the enums?
  // like keyword final - readonly in ts
  readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
  // subject: string = "ticket:created";
  queueGroupName: string = "payments-service";

  onMessage(data: TicketCreatedEvent["data"], msg: Message): void {
    // console.log(`Received event #${msg.getSequence()}, with data: ${data}`);
    console.log("Number:", msg.getSequence(), "Event data:", data);
    // console.log(data.name);
    console.log(data.title);

    msg.ack();
  }
}
