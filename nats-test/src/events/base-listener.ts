import { Message, Stan } from "node-nats-streaming";
import { Subjects } from "./subjects";
import { TicketCreatedEvent } from "./ticket-created-event";

interface Event {
  subject: Subjects;
  data: TicketCreatedEvent["data"];
  // data: any;
}

// abstract means they must be defined by a subclass?
// defined it as a generic class to have ts auto - type T
// so whenever we try to extend it we have to provide some custom type
export abstract class Listener<T extends Event> {
  // to make sure we have a match between subject and data
  // to match exactly whatever subject was provided on this argument
  abstract subject: T["subject"];
  // abstract subject: string;
  abstract queueGroupName: string;
  abstract onMessage(data: T["data"], msg: Message): void;
  // abstract onMessage(data: any, msg: Message): void;
  private client: Stan;
  // protected means the subclass can defined it if he wants to
  protected ackWait = 5 * 1000;

  // constructor requires pre-initialized client
  constructor(client: Stan) {
    this.client = client;
  }

  subscriptionOption() {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDurableName(this.queueGroupName);
  }

  listen() {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOption()
    );

    subscription.on("message", (msg: Message) => {
      console.log(`Message received: ${this.subject} / ${this.queueGroupName}`);

      const parsedData = this.parseMessage(msg);
      this.onMessage(parsedData, msg);
    });
  }

  parseMessage(msg: Message) {
    const data = msg.getData();

    return typeof data === "string"
      ? JSON.parse(data)
      : // that's how we parse a Buffer
        JSON.parse(data.toString("utf-8"));
  }
}
