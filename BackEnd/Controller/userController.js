const User = require("../Model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { default: mongoose } = require("mongoose");
const Subject = require("../Model/Subject");
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
      // if (users.name) {
      //   return res.json({ error: "this name is already exists" });
      // }
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
      // console.error("Failed to get user1", error);
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
  gitAdmin: async (req, res) => {
    try {
      const Admin = await User.find({ role: "Admin" });
      res.json(Admin);
    } catch (error) {
      // console.error("Failed to get Admin2", error);
      res.status(500).json({ message: "Failed to get Admin" });
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
      const subject = await Subject.findById(SubID);
      user.Subjects.push(SubID);
      subject.students.push({
        student: StdId,
      });
      user.save();
      subject.save();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to assign subject" });
    }
  },

  gitAllUsersBySub: async (req, res) => {
    try {
      const users = await User.find({
        role: "User",
        Subjects: { $exists: true, $ne: [] }, // Check if Subjects array exists and is not empty
      });
      if (users) {
        res.json(users);
      } else {
        res.json("there are no users having Subject");
      }
    } catch (error) {
      console.error("Failed to get users with at least one subject", error);
      res
        .status(500)
        .json({ message: "Failed to get users with at least one subject" });
    }
  },

  getUserSubjects: async (req, res) => {
    const { id } = req.params; // Assuming you pass the user's ID as a parameter

    try {
      const user = await User.findById(id)
        .populate({
          path: "Subjects", // Replace with the actual field name in your User schema that references subjects
        })
        .exec();

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(user.Subjects);
    } catch (error) {
      console.error("Failed to get subjects for the user", error);
      res.status(500).json({ message: "Failed to get subjects for the user" });
    }
  },
  gitAllUsersInSameSub: async (req, res) => {
    const { id } = req.params;
    try {
      // Find all users that are NOT associated with the given subject ID
      const users = await User.findById(id).populate();

      res.json(users);
    } catch (error) {
      console.error("Failed to get users3", error);
      res.status(500).json({ message: "Failed to get users" });
    }
  },
  commonUsers: async (req, res) => {
    const { id } = req.params;

    try {
      // Find the specified user by ID
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Find all projects where the user is involved
      const userProjects = await Subject.find({
        "students.student": { $in: id },
      }); // Replace 'students' with the actual field in your Project model that references users

      // Get an array of project IDs that the user is involved in
      const projectIds = userProjects.map((project) => project._id);

      // Find all users who are involved in the same projects as the specified user
      const commonUsers = await User.find({
        _id: { $ne: id }, // Exclude the specified user
        Subjects: { $in: projectIds }, // Replace 'Subjects' with the actual field in your User model that references subjects
      }).populate({
        path: "Subjects",
        select: "name",
      });

      res.json(commonUsers);
    } catch (error) {
      console.error("Failed to get common project users", error);
      res.status(500).json({ message: "Failed to get common project users" });
    }
  },
};
