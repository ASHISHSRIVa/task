import express from "express";

import Project from "../models/Project.js";

const router = express.Router();

// GET PROJECTS
router.get("/", async (req, res) => {
  try {
    const projects =
      await Project.find()
        .populate("teamMembers");

    res.json(projects);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// CREATE PROJECT
router.post("/", async (req, res) => {
  try {
    const project =
      await Project.create({
        ...req.body,
        teamMembers: [],
      });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ASSIGN MEMBER TO PROJECT
router.put(
  "/:id/assign",
  async (req, res) => {
    try {
      const { userId } = req.body;

      const project =
        await Project.findById(
          req.params.id
        );

      if (!project) {
        return res.status(404).json({
          message:
            "Project Not Found",
        });
      }

      // PREVENT DUPLICATE MEMBERS
      if (
        !project.teamMembers.includes(
          userId
        )
      ) {
        project.teamMembers.push(
          userId
        );

        await project.save();
      }

      const updatedProject =
        await Project.findById(
          req.params.id
        ).populate("teamMembers");

      res.json(updatedProject);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

export default router;