import { getBankMetrics } from "./metricsService.js";

async function selectBestBank() {
  const metrics = await getBankMetrics();

  if (!metrics.length) {
    return "JP Morgan"; // default fallback
  }

  // sort by healthScore DESC
  metrics.sort((a, b) => b.healthScore - a.healthScore);

  return metrics[0].bank;
}

export { selectBestBank };