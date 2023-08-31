// //@ts-nocheck
import express from "express";
import "express-async-errors";
// import { json } from 'body-parser';
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError, currentUser } from "@pgticketsorg/common";
import { newOrderRouter } from "./routes/new";
import { showOrderRouter } from "./routes/show";
import { indexOrderRouter } from "./routes/index";
import { deleteOrderRouter } from "./routes/delete";

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

app.use(newOrderRouter);
app.use(showOrderRouter);
app.use(indexOrderRouter);
app.use(deleteOrderRouter);

app.use(errorHandler);

app.all("*", async (req, res) => {
  console.log(req.url);

  throw new NotFoundError();
});

export { app };
