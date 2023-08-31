// import { argv } from "process";
// import { parseArgs } from "util";

export enum Subjects {
  TicketCreated = "ticket:created",
  OrderUpdated = "order:updated",
}

// const printSubject = (subject: Subjects): void => {
//   argv.forEach((val, index) => {
//     console.log(`${index}: ${val}`);
//   });
// };

console.log(process.argv);
// printSubject(Subjects.OrderUpdated);
