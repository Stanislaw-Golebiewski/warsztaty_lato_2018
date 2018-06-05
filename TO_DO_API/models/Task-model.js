const mongoose = require("mongoose");

const TaskSchema = (mongoose.Schema = {
	date: { type: Date, default: Date.now },
	title: { type: String, required: true },
	description: { type: String, required: false, default: "-" },
	urgency: { type: Number, required: false, default: 0 },
	done: { type: Boolean, default: false },
	user: { type: String, required: true },
});

module.exports = mongoose.model("Task", TaskSchema);
