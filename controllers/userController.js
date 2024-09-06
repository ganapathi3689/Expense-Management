const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
// const loginController = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await userModel.findOne({ email, password });
//     if (!user) {
//       return res.status(404).send("User Not Found");
//     }
//     res.status(200).json({
//       success: true,
//       user,
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       error,
//     });
//   }
// };
const loginController = async (req, res) => {
  let { email, password } = req.body;
  let user = await userModel.findOne({ email: email });
  if (!user) {
    return res.status(404).send("User Doesn't Exist");
  }
  bcrypt.compare(password, user.password, function (err, result) {
    if (result) {
      res.status(200).json({
        success: true,
        user,
      });
    } else {
      res.status(400).json({
        success: false,
        error,
      });
    }
  });
};
// const registerController = async (req, res) => {
//   try {
//     const newUser = new userModel(req.body);

//     const saveduser = await newUser.save();

//     res.status(201).json({
//       success: true,
//       newUser,
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       error,
//     });
//   }
// };
const registerController = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    let user = await userModel.findOne({ email: email });
    if (user) {
      return res.status(404).send("User Already Exist");
    }
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) {
          res.status(404).send("error");
        } else {
          await userModel.create({
            name,
            email,
            password: hash,
          });
          res.status(201).json({
            success: true,
          });
        }
      });
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};
module.exports = { loginController, registerController };
