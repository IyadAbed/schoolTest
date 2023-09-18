const Subject = require("../Model/Subject");

module.exports = {
  addSubject: async (req, res) => {
    try {
      const { name, minMark } = req.body;
      const repeated = await Subject.findOne({ name });
      if (repeated) {
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
  gitAllSubject: async (req, res) => {
    try {
      const subject = await Subject.find();
      res.json(subject);
    } catch (error) {
      console.error("Failed to get subject", error);
      res.status(500).json({ message: "Failed to get subject" });
    }
  },
  assignMarkToStudent: async (req, res) => {
    const { studentId, subjectId, mark } = req.body;

    try {
      const subject = await Subject.findById(subjectId);

      if (!subject) {
        return res.status(404).json({ message: "Subject not found" });
      }
      // Find the student's record in the subject's students array
      const studentRecord = subject.students.find(
        (record) => record.student.toString() === studentId
      );

      if (!studentRecord) {
        return res
          .status(404)
          .json({ message: "Student not enrolled in the subject" });
      }

      // Update the mark
      studentRecord.Mark = mark;
      await subject.save();

      res.json({ message: "Mark assigned successfully" });
    } catch (error) {
      console.error("Failed to assign mark to student", error);
      res.status(500).json({ message: "Failed to assign mark to student" });
    }
  },
};
