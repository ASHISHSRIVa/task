import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    res.json({
      totalProjects: 12,
      totalTasks: 34,
      pendingTasks: 5,
      completedTasks: 29,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;