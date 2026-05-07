import express from "express";

import Task from "../models/Task.js";

const router = express.Router();

// GET TASKS
router.get("/", async (req, res) => {
  const tasks = await Task.find();

  res.json(tasks);
});

// CREATE TASK
router.post("/", async (req, res) => {
  const task = await Task.create(req.body);

  res.json(task);
});

// UPDATE TASK
router.put("/:id", async (req, res) => {
  const updatedTask =
    await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

  res.json(updatedTask);
});

export default router;