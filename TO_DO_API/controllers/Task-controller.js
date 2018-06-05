const Task = require("../models/Task-model");
// const User = require("./controllers/User-controller");
const mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;

// exports.getAllTasksForUserId = async id => {
// 	return new Promise(async (resolve, rejcet) => {
// 		const result = await Task.find({ user });
// 		if (result == "") {
// 			reject("Error!");
// 		} else {
// 			resolve(result);
// 		}
// 	});
// };
//

exports.createTask = async body => {
	return new Promise(async (resolve, reject) => {
		try {
			var result = await Task.create(body);
			if (result === []) {
				reject("Could not add new task!");
			} else {
				console.log("[db] #log add new task");
				resolve(result);
			}
		} catch (err) {
			reject(err.message);
		}
	});
};

exports.getAllTasks = async () => {
	return new Promise(async (resolve, reject) => {
		var result = await Task.find({});
		resolve(result);
	});
};

exports.getAllTasksForUser = async user => {
	return new Promise(async (resolve, reject) => {
		if (!user) {
			reject("You have to specify username!");
		}
		var result = await Task.find({ user: user });
		// console.log(result);
		resolve(result);
	});
};

exports.getTaskById = async id => {
	return new Promise(async (resolve, reject) => {
		if (!id) {
			reject("[error] You have to provide an id");
		}
		const result = await Task.findById(ObjectId(id));
		if (!result) {
			reject("There is no task with such id");
		}
		resolve(result);
	});
};

exports.updateTaskById = async (id, body) => {
	return new Promise(async (resolve, reject) => {
		if (!id) {
			reject("You have to provide an id");
		}
		if (!ObjectId.isValid(id)) reject("provided id is not valid");
		const result = await Task.findByIdAndUpdate(ObjectId(id), body, {
			new: true,
		});
		if (!result) {
			reject("There is no task with such id");
		}
		resolve(result);
	});
};

exports.deleteTaskById = async id => {
	return new Promise(async (resolve, reject) => {
		const result = await Task.findByIdAndRemove(ObjectId(id));
		if (!result) {
			reject("There is no task with such id");
		}
		resolve(result);
	});
};

exports.getAllUsers = async => {
	return new Promise(async (resolve, reject) => {
		const result = await Task.find().distinct("user");
		resolve(result);
	});
};
