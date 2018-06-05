const Meme = require("../models/Meme-model");
const mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;

exports.createMeme = async body => {
	return new Promise(async (resolve, reject) => {
		try {
			var result = await Meme.create(body);
			if (result === []) {
				reject("Could not add new meme!");
			} else {
				console.log("[db] #log add new meme");
				resolve(result);
			}
		} catch (err) {
			reject(err.message);
		}
	});
};

exports.getAllMemes = async () => {
	return new Promise(async (resolve, reject) => {
		try {
			var result = await Meme.find({});
			resolve(result);
		} catch (err) {
			reject(err);
		}
	});
};

exports.getMemeById = async id => {
	return new Promise(async (resolve, reject) => {
		if (!id) {
			reject("[error] You have to provide an id");
		}
		if (!ObjectId.isValid(id)) reject("provided id is not valid");
		const result = await Meme.findById(ObjectId(id)).populate(
			"comments.comment"
		);
		if (!result) {
			reject("There is no meme with such id");
		}
		resolve(result);
	});
};

exports.updateMemeById = async (id, body) => {
	return new Promise(async (resolve, reject) => {
		if (!id) {
			reject("You have to provide an id");
		}
		if (!ObjectId.isValid(id)) reject("provided id is not valid");
		const result = await Meme.findByIdAndUpdate(ObjectId(id), body, {
			new: true,
		});
		if (!result) {
			reject("There is no meme with such id");
		}
		resolve(result);
	});
};

exports.deleteMemeById = async id => {
	return new Promise(async (resolve, reject) => {
		if (!id) {
			reject("You have to provide an id");
		}
		if (!ObjectId.isValid(id)) reject("provided id is not valid");
		const result = await Meme.findByIdAndRemove(ObjectId(id));
		if (!result) {
			reject("There is no meme with such id");
		}
		resolve(result);
	});
};

exports.addNewComment = async (meme_id, body) => {
	return new Promise(async (resolve, reject) => {
		try {
			if (!meme_id) reject("You have to provide an id");
			if (!ObjectId.isValid(meme_id)) reject("provided id is not valid");
			console.log("aaaaa");
			console.log(body);
			const result = await Meme.findByIdAndUpdate(
				meme_id,
				{
					$push: { comments: body },
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

exports.removeComment = async comment_id => {
	return new Promise(async (resolve, reject) => {
		try {
			if (!ObjectId.isValid(comment_id))
				reject("provided id is not valid");
			const result = await Meme.findOneAndUpdate(
				{ "comments._id": comment_id },
				{ $pull: { comments: { _id: comment_id } } },
				{ new: true }
			);
			console.log(result);
			resolve(result);
		} catch (err) {
			reject(err);
		}
	});
};
