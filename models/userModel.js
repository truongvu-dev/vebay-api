// models/userModel.js
import db from "../project-root/config/db.js";

export async function findUserById(id) {
  return db.users.findOne({ _id: id });
}

export async function updateUserById(id, updateData) {
  return db.users.updateOne({ _id: id }, { $set: updateData });
}
