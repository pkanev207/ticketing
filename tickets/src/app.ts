// // @ts-nocheck
import express from "express";
import "express-async-errors";
// import { json } from 'body-parser';
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError, currentUser } from "@pgticketsorg/common";
import { createTicketRouter } from "./routes/new";
import { showTicketRouter } from "./routes/show";
import { indexTicketRouter } from "./routes/index";
import { updateTicketRouter } from "./routes/update";

const app = express();
app.set("trust proxy", true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

// app.get("https://ticketing.dev/api/tickets/", (req: Request, res: Response) => {
//   res.send("what");
// });

app.use(currentUser);

app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

app.use(errorHandler);

app.all("*", async (req, res) => {
  console.log(req.url);

  throw new NotFoundError();
});

export { app };
