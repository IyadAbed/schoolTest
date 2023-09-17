const User = require("../Model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { default: mongoose } = require("mongoose");
function generateToken({ name, email, role }) {
  const user = { name, email, role };
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  return token;
}

module.exports = {
  addUser: async (req, res) => {
    try {
      const { name, password, email } = req.body;
      const users = await User.findOne({ email });
      if (users) {
        return res.json({ error: "this email is already exists" });
      }
      const hashPassword = await bcrypt.hash(password, 10);
      const newAccount = new User({
        name,
        email: email,
        password: hashPassword,
        role: "User",
      });
      const newUser = await newAccount.save();
      const token = generateToken({
        name: name,
        email: email,
        role: newUser.role,
      });
      res.json({ message: "Success adding new user", Tok: token });
      console.log(token);
    } catch (error) {
      console.error("error adding new user", error);
    }
  },

  Login: async (req, res) => {
    try {
      const { email, password } = req.body;
      // console.log(token);
      const userInfo = await User.findOne({ email, isDeleted: false });
      if (!userInfo) {
        return res.json({ error: "email not found" });
      }

      const checkPass = await bcrypt.compare(password, userInfo.password);
      if (!checkPass) {
        return res.json({ error: "Invallid password" });
      }
      if (!userInfo.Active) {
        return res.json({ error: "InActive" });
      }
      const role = userInfo.role;
      const token = generateToken({
        name: userInfo.name,
        email,
        role,
      });
      res.json({ message: "Success Login user", Tok: token, pass: checkPass });
    } catch (error) {
      console.error("failed in login", error);
    }
  },

  getUser: async (req, res) => {
    try {
      if (!req?.user)
        return res.status(401).json({ message: "User is UnAuthorized" });
      const user = await User.findOne({ email: req.user.email });
      if (!user) {
        return res
          .status(204)
          .json({ message: `User Email ${req.user.email} not found` });
      }

      res.json(user);
    } catch (error) {
      console.error("Failed to get user1", error);
      res.status(500).json({ message: "Failed to get user" });
    }
  },
  gitAllUsers: async (req, res) => {
    try {
      const users = await User.find({ role: "User" });
      res.json(users);
    } catch (error) {
      console.error("Failed to get users2", error);
      res.status(500).json({ message: "Failed to get users" });
    }
  },
  gitAllUsersBySubject: async (req, res) => {
    const { id } = req.params;
    try {
      // Find all users that are NOT associated with the given subject ID
      const users = await User.find({
        Subjects: { $ne: id },
        role: { $ne: "Admin" },
      });

      res.json(users);
    } catch (error) {
      console.error("Failed to get users3", error);
      res.status(500).json({ message: "Failed to get users" });
    }
  },

  deleteUser: async (req, res) => {
    const { id } = req.params;
    try {
      await User.findByIdAndUpdate(id, { isDeleted: true });
      res.json(" user deleted successfully ");
    } catch (error) {
      res.status(500).json({ error: "cannot delete user" });
    }
  },

  returnUser: async (req, res) => {
    const { id } = req.params;
    try {
      await User.findByIdAndUpdate(id, { isDeleted: false });
      res.json(" user returned successfully ");
    } catch (error) {
      res.status(500).json({ error: "cannot return user" });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { name, email, Active } = req.body;
      const _id = req.params.id;

      await User.findOneAndUpdate(
        { _id },
        {
          name: name,
          email: email,
          Active,
        }
      );

      res.status(201).json("quote updated successfully ");
    } catch (error) {
      res.status(500).json({ error: "Failed to update quote" });
    }
  },

  newSubToST: async (req, res) => {
    const { StdId, SubID } = req.params;
    try {
      const user = await User.findById(StdId);
      user.Subjects.push(SubID);
      user.save();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to assign subject" });
    }
  },
};
