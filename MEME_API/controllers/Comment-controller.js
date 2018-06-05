const Comment = require("../models/Comment-model");
const Meme = require("../models/Meme-model");
const mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;

exports.addNewComment = async (meme_id, body) => {
	return new Promise(async (resolve, reject) => {
		try {
			const result_comment = await Comment.create(body);
			console.log(result_comment);
			if (!meme_id) reject("You have to provide an id");
			if (!ObjectId.isValid(meme_id)) reject("provided id is not valid");
			const result = await Meme.findByIdAndUpdate(
				meme_id,
				{
					$push: { comments: { comment: result_comment._id } },
				},
				{
					new: true,
				}
			);
			console.log(result);
			resolve(result);
		} catch (err) {
			reject(err);
		}
	});
};

exports.deleteComment = async id => {
	return new Promise(async (resolve, reject) => {
		if (!id) {
			reject("You have to provide an id");
		}
		if (!ObjectId.isValid(id)) reject("provided id is not valid");
		const result = await Comment.findByIdAndRemove(ObjectId(id));
		if (!result) {
			reject("There is no comment with such id");
		}
		resolve(result);
	});
};

exports.getComments = async => {
	return new Promise(async (resolve, reject) => {
		const result = await Comment.find({});
		if (!result) {
			reject("Error");
		}
		resolve(result);
	});
};
