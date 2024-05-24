const mongoose = require(`mongoose`);
const noprefix = new mongoose.Schema({
  noprefix: Boolean,
  userId: String
});
module.exports = mongoose.model("Noprefix",noprefix);