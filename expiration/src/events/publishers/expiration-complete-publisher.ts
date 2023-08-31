import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from "@pgticketsorg/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
