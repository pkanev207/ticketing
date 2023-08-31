import { Publisher, OrderCreatedEvent, Subjects } from "@pgticketsorg/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
