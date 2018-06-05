const Koa = require("koa");
const Router = require("koa-router");
const logger = require("koa-logger");
const cors = require("koa-cors");
const parse = require("co-body");

const app = new Koa();
const router = new Router();

const mongoose = require("mongoose");
const task = require("./controllers/Task-controller");

// //----- database setup
const mongoUrl = "mongodb://db/to_do";
mongoose
	.connect(mongoUrl)
	.then(response => {
		console.log("[database] #log mongo connection created");
	})
	.catch(err => {
		console.log("[database] #error connecting to Mongo");
		console.log(err);
	});

//----- Koa routes
router.prefix("/api/v1/to_do");

router.get("/tasks", async (ctx, next) => {
	// var query = ctx.request.query;
	await task
		.getAllTasks()
		.then(resp => (ctx.body = resp))
		.catch(err => console.log(err));
});

router.get("/users", async (ctx, next) => {
	await task
		.getAllUsers()
		.then(res => (ctx.body = res))
		.catch(err => {
			console.log(err);
			ctx.status = 400;
			ctx.body = { error: err };
		});
	next();
});

router.post("/tasks", async (ctx, next) => {
	let body = await parse(ctx);
	await task
		.createTask(body)
		.then(res => (ctx.body = res))
		.catch(err => {
			console.log(err);
			ctx.body = { error: err };
			ctx.status = 400;
		});
});

router.get("/tasks/:id", async (ctx, next) => {
	// let body = await parse(ctx);
	await task
		.getTaskById(ctx.params.id)
		.then(res => (ctx.body = res))
		.catch(err => {
			console.log(err);
			ctx.body = { error: err };
			ctx.status = 400;
		});
});

router.put("/tasks/:id", async (ctx, next) => {
	let body = await parse(ctx);
	await task
		.updateTaskById(ctx.params.id, body)
		.then(res => (ctx.body = res))
		.catch(err => {
			console.log(err);
			ctx.body = { error: err };
			ctx.status = 400;
		});
});

router.delete("/tasks/:id", async (ctx, next) => {
	// let body = await parse(ctx);
	await task
		.deleteTaskById(ctx.params.id)
		.then(res => (ctx.body = res))
		.catch(err => {
			console.log(err);
			ctx.body = { error: err };
			ctx.status = 400;
		});
});

router.get("/:username/tasks", async (ctx, next) => {
	// let body = await parse(ctx);
	ctx.body = ctx.params.username;
	await task
		.getAllTasksForUser(ctx.params.username)
		.then(res => (ctx.body = res))
		.catch(err => {
			console.log(err);
			ctx.body = { error: err };
			ctx.status = 400;
		});
});

app.use(async (ctx, next) => {
	await next();
	console.log(ctx.request.header["user-agent"]);
});

app.use(logger());
app.use(cors());
app.use(router.routes());
app.listen(3000);
