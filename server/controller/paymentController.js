import simulateBankPayment from "../services/bankSimulator.js";
import transaction from "../models/Transaction.js";
import { selectBestBank } from "../services/routingService.js";

// temporary bank list
const banks = ["SBI", "JP Morgan", "HDFC", "Wells FARGO", "ICICI",  "GOLDMAN", "BoA"];

// simple random selection (we'll replace with routing engine later)
function selectBank() {
  return banks[Math.floor(Math.random() * banks.length)];
}

export async function makePayment(req, res) {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ message: "Amount is required" });
    }
    // 🔥 Step 1: intelligent bank selection
    //const bank = await selectBestBank();


    // 🔹 Step 2: call simulator
    const result = await simulateBankPayment("Wells FARGO");

    const t1 = await transaction.create({
      amount,
      bank: result.bank,
      status: result.status,
      latency: result.latency
    });

    // 🔹 Step 3: return response
    res.json({
     message: "Payment processed",
      t1
    });

  } catch (error) {
    res.status(500).json({ message: "Payment failed", error });
  }
}