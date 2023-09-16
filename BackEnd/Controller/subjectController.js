const Subject = require("../Model/Subject");

module.exports = {
  addSubject: async (req, res) => {
    try {
      const { name, minMark } = req.body;
      await Subject.findOne({ name });
      if (name) {
        console.log("ssssssss");
        return res.json({ error: "this subject is already exists" });
      }
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
};
