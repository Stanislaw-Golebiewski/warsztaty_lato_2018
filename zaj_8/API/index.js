const Koa = require("koa");
const mongoose = require("mongoose");
const Router = require("koa-router");
// const bodyParser = require('koa-bodyparser');
const parse = require("co-body");

const app = new Koa();
const router = new Router();

//----- database setup
const mongoUrl = "mongodb://db/workshop";
var ObjectId = mongoose.Types.ObjectId;

mongoose.connect(mongoUrl, function(err) {
	if (err) throw err;
});

const AcidSchema = new mongoose.Schema({
	user: { type: String, required: true },
	title: { type: String, required: true },
	source: { type: String, required: true },
	source_type: { type: String, default: "none" },
	tag: { type: String, default: "none" },
	date: { type: Date, default: Date.now },
});

var temp_names = Object.keys(AcidSchema.paths);
const allowed_field_names = temp_names.filter(function(s) {
	return s !== "__v" && s !== "_id";
});

var Acid = mongoose.model("Acid", AcidSchema);

// test task save

// var test_acid = new Acid({
//   user: "Kociamber",
//   title: "test",
//   source: "http://glossynews.com/wp-content/uploads/2014/01/spanish-inquisition2.jpg",
//   source_type: "image",
//   tag:        "monty python",
// })
//
// test_acid.save(function(err) {
//   if (err) {
//     console.log('error adding new acid');
//     console.log(err);
//   } else {
//     console.log('new acid successfully saved');
//   }
// });

//----- Koa routes
router.prefix("/api/v1/kwasy");

//general get with query
router.get("/", async (ctx, next) => {
	var query = ctx.request.query;
	await Acid.find(query, function(err, docs) {
		ctx.body = {
			status: "success",
			data: docs,
		};
	});
});

//general post
router.post("/", async (ctx, next) => {
	let body = await parse(ctx);
	var new_acid = new Acid(body);
	try {
		await new_acid.save().then(function(product) {
			ctx.body = {
				status: "success",
				data: product,
			};
		});
	} catch (err) {
		console.log(err.message);
		ctx.body = {
			status: "failed",
			error: err.message,
		};
		ctx.status = 400;
	}
});

//specified id
router.get("/:id", async (ctx, next) => {
	try {
		if (!ObjectId.isValid(ctx.params.id))
			throw Error("provided id is not valid");
		var id = ObjectId(ctx.params.id);
		await Acid.findById(id).then(function(doc) {
			if (!doc) throw Error("resource with such id does not exist");
			ctx.body = {
				status: "success",
				data: doc,
			};
		});
	} catch (err) {
		ctx.body = {
			status: "failed",
			message: err.message,
		};
		ctx.status = 400;
	}
});

router.put("/:id", async (ctx, next) => {
	let body = await parse(ctx);
	var new_acid = new Acid(body);
	try {
		if (!ObjectId.isValid(ctx.params.id))
			throw Error("provided id is not valid");
		var id = ObjectId(ctx.params.id);
		ctx.body = body;
		await Acid.findByIdAndUpdate(id, body, { new: true }).then(function(
			doc
		) {
			ctx.body = {
				status: "success",
				data: doc,
			};
		});
	} catch (err) {
		console.log(err.message);
		ctx.body = {
			status: "failed",
			error: err.message,
		};
		ctx.status = 400;
	}
});

router.delete("/:id", async (ctx, next) => {
	try {
		if (!ObjectId.isValid(ctx.params.id))
			throw Error("provided id is not valid");
		var id = ObjectId(ctx.params.id);
		await Acid.findByIdAndRemove(id).then(function(doc) {
			if (!doc) throw Error("resource with such id does not exist");
			ctx.body = {
				status: "success",
				data: doc,
			};
		});
	} catch (err) {
		ctx.body = {
			status: "failed",
			message: err.message,
		};
		ctx.status = 400;
	}
});

app.use(router.routes());
app.listen(3000);
