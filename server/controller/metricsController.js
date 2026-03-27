import { getBankMetrics } from "../services/metricsService.js";

export async function getMetrics(req, res) {
  try {
    const data = await getBankMetrics();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching metrics" });
  }
}