import express, { Request, Response } from "express";
import { requireAuth } from "@pgticketsorg/common";
import { Order } from "../models/order";

const router = express.Router();

router.get("/api/orders", requireAuth, async (req: Request, res: Response) => {
  const orders = await Order.find({
    userId: req.currentUser!.id,
  }).populate("ticket");
  console.log(orders);

  // res.send("T'is fine");
  res.send(orders || []);
});

export { router as indexOrderRouter };
