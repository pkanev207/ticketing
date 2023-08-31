import Queue from "bull";
import { ExpirationCompletePublisher } from "../events/publishers/expiration-complete-publisher";
// whenever we want to publish an event we need nats client
import { natsWrapper } from "../nats-wrapper";

// A "Job" is just a javascript object, Bull is used on the Web Server
// and in each Worker Service, with Redis holding a list of jobs
interface Payload {
  orderId: string;
}
// Payload applied as generic type to Queue
const expirationQueue = new Queue<Payload>("order:expiration", {
  redis: {
    host: process.env.REDIS_HOST,
  },
});

expirationQueue.process(async (job) => {
  console.log("From job received back:");
  console.log(job);
  new ExpirationCompletePublisher(natsWrapper.client).publish({
    orderId: job.data.orderId,
  });
});

export { expirationQueue };
