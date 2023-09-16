const User = require("../Model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
function generateToken({ name, email, role }) {
  const user = { name, email, role };
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  return token;
}

module.exports = {
  addUser: async (req, res) => {
    try {
      const { name, password, email, role } = req.body;
      const users = await User.findOne({ email });
      if (users) {
        return res.json({ error: "this email is already exists" });
      }
      const hashPassword = await bcrypt.hash(password, 10);
      const newAccount = new User({
        name,
        email: email,
        password: hashPassword,
        role,
      });
      const newUser = await newAccount.save();
      const token = generateToken({
        name: name,
        email: email,
        role: role,
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
      const userInfo = await User.findOne({ email });
      if (!userInfo) {
        return res.json({ error: "email not found" });
      }

      const checkPass = await bcrypt.compare(password, userInfo.password);
      if (!checkPass) {
        return res.json({ error: "Invallid password" });
      }
      if (userInfo.Active === false) {
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
      console.error("Failed to get user", error);
      res.status(500).json({ message: "Failed to get user" });
    }
  },
  gitAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      console.log(users);
      res.json(users);
    } catch (error) {
      console.error("Failed to get users", error);
      res.status(500).json({ message: "Failed to get users" });
    }
  },
};
