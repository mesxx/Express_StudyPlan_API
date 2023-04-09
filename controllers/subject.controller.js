const { Subject } = require("../models");
const { update } = require("./student.controller");

class SubjectController {
  static create = async (req, res, next) => {
    const { name, studentId } = req.body;
    try {
      const data = await Subject.create({ name, studentId });
      res.status(201).json({
        code: 201,
        message: "Success",
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  static read = async (req, res, next) => {
    try {
      const data = await Subject.find().populate("studentId");
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
      const data = await Subject.findById(id).populate("studentId");
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
    const { name, studentId } = req.body;
    try {
      const data = await Subject.findById(id);
      if (data.studentId.length === 4) throw { message: "Subject full!" };

      let arr = [];

      arr.push(...data.studentId, ...studentId);
      const updated = await Subject.findByIdAndUpdate(
        id,
        { name, studentId: arr },
        { new: true }
      );
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
      const data = await Subject.findByIdAndDelete(id);
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

module.exports = SubjectController;
