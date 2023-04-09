const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const StudyPlanSchema = new Schema(
  {
    studentId: {
      type: ObjectId,
      required: true,
      ref: "student",
    },
    subject: [
      {
        type: ObjectId,
        required: true,
        ref: "subject",
      },
    ],
  },
  { strict: true }
);

const StudyPlan = mongoose.model("studyplan", StudyPlanSchema);
module.exports = StudyPlan;
