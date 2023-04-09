const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const SubjectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    studentId: [
      {
        type: ObjectId,
        required: true,
        ref: "student",
      },
    ],
  },
  { strict: true }
);

const Subject = mongoose.model("subject", SubjectSchema);
module.exports = Subject;
