const { Student } = require("../models");

class StudentController {
  static create = async (req, res, next) => {
    const { name } = req.body;
    try {
      const data = await Student.create({ name });
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
      const data = await Student.find();
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
      const data = await Student.findById(id);
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
    const { name } = req.body;
    try {
      const data = await Student.findByIdAndUpdate(id, { name }, { new: true });
      res.status(200).json({
        code: 200,
        message: "Success",
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  static destroy = async (req, res, next) => {
    const { id } = req.params;
    try {
      const data = await Student.findByIdAndDelete(id);
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

module.exports = StudentController;
