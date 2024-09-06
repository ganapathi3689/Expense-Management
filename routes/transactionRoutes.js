const express = require("express");
const {
  addtransaction,
  getalltransaction,
  edittransaction,
  deletetransaction,
} = require("../controllers/transactioncntrl");

// router object
const router = express.Router();

// routers
router.post("/add-transaction", addtransaction);

router.post("/edit-transaction", edittransaction);

router.post("/delete-transaction", deletetransaction);

router.post("/get-transaction", getalltransaction);
module.exports = router;
