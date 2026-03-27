import { Schema, model } from "mongoose";

const transactionSchema = new Schema({
  amount: {
    type: Number,
    required: true
  },
  bank: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["SUCCESS", "FAILED", "PENDING"],
    required: true
  },
  latency: {
    type: Number
  }
}, {
  timestamps: true
});

export default model("Transaction", transactionSchema);