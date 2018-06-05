const mongoose = require("mongoose");

const CommentSchema = (mongoose.Schema = {
	date: { type: Date, default: Date.now },
	text: { type: String, required: true },
	user: { type: String, required: true },
});

module.exports = mongoose.model("Comment", CommentSchema);
