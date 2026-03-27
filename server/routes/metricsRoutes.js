import { Router } from "express";
const router = Router();

import { getMetrics } from "../controller/metricsController.js";

router.get("/metrics", getMetrics);

export default router;