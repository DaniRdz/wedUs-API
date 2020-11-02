const express = require("express");
const router = express.Router();

const orderController = require("../app/api/controllers/order");

router.post("/", orderController.create);
router.get("/", orderController.getAll);
router.put("/:orderId", orderController.updateById);

module.exports = router;