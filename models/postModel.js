const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Libreria para codificación de la información del usuario en la base de datos

const PostSchema = new Schema(
  {
    creator: {required:true, type: Schema.Types.ObjectId, ref:'Users'},
    title: { type: String, unique: false, lowercase: true, required: true },
    content: { type: String, unique: false, lowercase: true, required: true },
    img: { type: String, required: false }
  },
  {
    timestamps: { createdAt: "created_at", updatedAt:"updated_at"}
  }
);

module.exports = mongoose.model("Posts", PostSchema);
