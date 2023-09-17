const Subject = require("../Model/Subject");

module.exports = {
  addSubject: async (req, res) => {
    try {
      const { name, minMark } = req.body;
      const repeated = await Subject.findOne({ name });
      if (repeated) {
        return res.json({ error: "this subject is already exists" });
      }
      console.log("ssssssss");
      const newSubject = new Subject({
        name,
        minMark,
      });
      await newSubject.save();
      res.json({ message: "Success adding new Subject" });
    } catch (error) {
      console.error("error adding new Subject");
    }
  },
  gitAllSubject: async (req, res) => {
    try {
      const subject = await Subject.find();
      res.json(subject);
    } catch (error) {
      console.error("Failed to get subject", error);
      res.status(500).json({ message: "Failed to get subject" });
    }
  },
};
