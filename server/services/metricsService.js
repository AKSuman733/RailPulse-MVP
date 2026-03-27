import Transaction from "../models/Transaction.js";

async function getBankMetrics() {
  const banks = ["SBI", "JP Morgan", "HDFC", "Wells FARGO", "ICICI",  "GOLDMAN", "BoA"];
  const result = [];

  for (let bank of banks) {
    const transactions = await Transaction.find({ bank });

    const total = transactions.length;

    if (total === 0) {
      result.push({
        bank,
        successRate: 0,
        pendingRate: 0,
        failureRate: 0,
        avgLatency: 0,
        healthScore: 0
      });
      continue;
    }

    let success = 0;
    let pending = 0;
    let failed = 0;
    let totalLatency = 0;

    transactions.forEach(tx => {
      if (tx.status === "SUCCESS") success++;
      else if (tx.status === "PENDING") pending++;
      else if (tx.status === "FAILED") failed++;

      totalLatency += tx.latency || 0;
    });

    const successRate = success / total;
    const pendingRate = pending / total;
    const failureRate = failed / total;
    const avgLatency = totalLatency / total;

    // 🔥 Health Score Formula
    const healthScore =
      (0.7 * successRate) -
      (0.2 * pendingRate) -
      (0.1 * failureRate) -
      (avgLatency / 10000); // normalize latency

    function getStatus(healthScore) {
       if (healthScore > 0.6) return "HEALTHY";
       if (healthScore > 0.3) return "DEGRADED";
       return "CRITICAL";
    }

    result.push({
     bank,
     successRate: (successRate * 100).toFixed(1),
     pendingRate: (pendingRate * 100).toFixed(1),
     failureRate: (failureRate * 100).toFixed(1),
     avgLatency: Math.round(avgLatency),
     healthScore,
     status: getStatus(healthScore + 0.3)
    });
  }

  return result;
}

export { getBankMetrics };