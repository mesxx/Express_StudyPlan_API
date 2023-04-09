const { StudyPlan, Subject, Student } = require("../models");

class StudyPlanController {
  static create = async (req, res, next) => {
    const { studentId, subject } = req.body;
    try {
      if (subject.length > 3) throw { message: "Only 3 subjects!" };

      for (let i = 0; i < subject.length; i++) {
        const el = subject[i];
        let arr = [];

        const pastsubject = await Subject.findById(el);

        if (pastsubject.studentId.length > 4) {
          throw { message: "Subject full!" };
        }

        arr.push(...pastsubject.studentId, studentId);
        await Subject.findByIdAndUpdate(el, { studentId: arr });
      }

      const created = await StudyPlan.create({ studentId, subject });

      res.status(201).json({
        code: 201,
        message: "Success",
        data: created,
      });
    } catch (error) {
      next(error);
    }
  };

  static read = async (req, res, next) => {
    try {
      const data = await StudyPlan.find()
        .populate("studentId")
        .populate("subject");
      res.status(200).json({
        code: 200,
        message: "Success",
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  static readOne = async (req, res, next) => {
    const { id } = req.params;
    try {
      const data = await StudyPlan.findById(id)
        .populate("studentId")
        .populate("subject");
      res.status(200).json({
        code: 200,
        message: "Success",
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  static update = async (req, res, next) => {
    const { id } = req.params;
    const { subject } = req.body;
    try {
      if (subject.length === 3) throw { message: "StudyPlan full!" };
      const data = await StudyPlan.findById(id);

      const updated = await StudyPlan.findByIdAndUpdate(
        id,
        { subject },
        { new: true }
      );

      for (let i = 0; i < data.subject.length; i++) {
        const el = data.subject[i];

        const subject = await Subject.findById(el);
        const filtered = subject.studentId.filter(
          (rel) => rel.toString() !== data.studentId.toString()
        );
        await Subject.findByIdAndUpdate(el, { studentId: filtered });
      }

      for (let i = 0; i < subject.length; i++) {
        const el = subject[i];
        let arr = [];

        const pastsubject = await Subject.findById(el);
        if (pastsubject.studentId.length > 4) {
          throw { message: "Subject full!" };
        }

        arr.push(...pastsubject.studentId, data.studentId);
        await Subject.findByIdAndUpdate(el, { studentId: arr });
      }

      res.status(200).json({
        code: 200,
        message: "Success",
        data: updated,
      });
    } catch (error) {
      next(error);
    }
  };

  static destroy = async (req, res, next) => {
    const { id } = req.params;
    try {
      const data = await StudyPlan.findByIdAndDelete(id);

      for (let i = 0; i < data.subject.length; i++) {
        const el = data.subject[i];

        const subject = await Subject.findById(el);
        const filtered = subject.studentId.filter(
          (rel) => rel.toString() !== data.studentId.toString()
        );
        await Subject.findByIdAndUpdate(el, { studentId: filtered });
      }

      res.status(200).json({
        code: 200,
        message: "Success",
        data,
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = StudyPlanController;
