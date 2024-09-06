const transactionModel = require("../models/transactionModel");
const moment = require("moment");

const getalltransaction = async (req, res) => {
  try {
    const { filter, selectdate, type } = req.body;
    const transactions = await transactionModel.find({
      ...(filter !== "custom"
        ? {
            date: {
              $gt: moment().subtract(Number(filter), "d").toDate(),
            },
          }
        : {
            date: {
              $gte: selectdate[0],
              $lte: selectdate[1],
            },
          }),
      userid: req.body.userid,
      ...(type !== "all" && { type }),
    });

    res.status(200).json(transactions);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
const deletetransaction = async (req, res) => {
  try {
    await transactionModel.findOneAndDelete({ _id: req.body.transactionId });
    res.status(200).send("transaction deleted");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
const edittransaction = async (req, res) => {
  try {
    await transactionModel.findOneAndUpdate(
      { _id: req.body.transactionId },
      req.body.payload
    );
    res.status(200).send("edit success");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
const addtransaction = async (req, res) => {
  try {
    const newtransaction = new transactionModel(req.body);
    await newtransaction.save();
    res.status(201).send("transaction created");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
module.exports = {
  getalltransaction,
  addtransaction,
  edittransaction,
  deletetransaction,
};
