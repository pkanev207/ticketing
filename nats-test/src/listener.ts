import nats, { Message, Stan } from "node-nats-streaming";
import { randomBytes } from "crypto";
import { TicketCreatedListener } from "./events/ticket-created-listener";
// nats by default stores all the events in-memory
console.clear();

const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Listener connected to NATS");

  stan.on("close", () => {
    console.log("NATS connection closed!");
    process.exit();
  });

  new TicketCreatedListener(stan).listen();

  // // we have this in the class
  // const options = stan
  //   .subscriptionOptions()
  //   // .setMaxInFlight(0)
  //   .setDeliverAllAvailable()
  //   // acknowledge, otherwise the server will redeliver the message:
  //   .setManualAckMode(true)
  //   // with a string as identifier for this subscription
  //   .setDurableName("accounting-service");

  // const subscription = stan.subscribe(
  //   "ticket:created",
  //   "queue-group-name",
  //   options
  // );

  // // here we handle massages in the subscription
  // subscription.on("message", (msg: Message) => {
  //   const data = msg.getData();

  //   if (typeof data === "string") {
  //     console.log(`Received event #${msg.getSequence()}, with data: ${data}`);
  //   }

  //   msg.ack();
  // });
});

// might not work on Windows
process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());
