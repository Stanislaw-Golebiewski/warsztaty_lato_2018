const mongoose = require("mongoose");

const MemeSchema = (mongoose.Schema = {
	date: { type: Date, default: Date.now },
	user: { type: String, required: true },
	title: { type: String, required: true },
	source: { type: String, required: true },
	rating: { type: Number, default: 0 },
	comments: [
		{
			date: { type: Date, default: Date.now },
			user: { type: String, required: true },
			text: { type: String, required: true },
		},
	],
});

// const MemeSchema = (mongoose.Schema = {
// 	date: { type: Date, default: Date.now },
// 	user: { type: String, required: true },
// 	title: { type: String, required: true },
// 	source: { type: String, required: true },
// 	rating: { type: Number, default: 0 },
// 	comments: [
// 		{
// 			_id: false,
// 			comment: {
// 				type: mongoose.Schema.Types.ObjectId,
// 				ref: "Comment",
// 			},
// 		},
// 	],
// });

module.exports = mongoose.model("Meme", MemeSchema);
