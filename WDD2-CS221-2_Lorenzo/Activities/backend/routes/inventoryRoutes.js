import express from "express";
import {
  create,
  update,
  getAll,
  remove,
} from "../controllers/inventoryController.js";

const router = express.Router();

router.get("/", getAll); // GET /api/inventory
router.post("/create", create); // POST /api/inventory/create
router.put("/update/:objectId", update); // PUT /api/inventory/update/:id
router.delete("/delete/:objectId", remove); // DELETE /api/inventory/delete/:id

export default router;
