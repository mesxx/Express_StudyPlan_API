const mongoose = require("mongoose");
const { Schema } = mongoose;

const StudentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { strict: true }
);

const Student = mongoose.model("student", StudentSchema);
module.exports = Student;
