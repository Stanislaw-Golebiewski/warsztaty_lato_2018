const Koa = require("koa");
const Router = require("koa-router");
const logger = require("koa-logger");
const cors = require("koa-cors");
const parse = require("co-body");

const app = new Koa();
const router = new Router();

const mongoose = require("mongoose");
const meme = require("./controllers/Meme-controller");
// const comment = require("./controllers/Comment-controller");

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

router.prefix("/api/v1");

router.post("/memes", async (ctx, next) => {
	let body = await parse(ctx);
	await meme
		.createMeme(body)
		.then(resp => (ctx.body = resp))
		.catch(err => {
			console.log(err);
			ctx.body = { error: err };
		});
});

router.get("/memes", async (ctx, next) => {
	await meme
		.getAllMemes()
		.then(resp => (ctx.body = resp))
		.catch(err => {
			console.log(err);
			ctx.body = { error: err };
			ctx.status = 400;
		});
});

router.get("/memes/:id", async (ctx, next) => {
	await meme
		.getMemeById(ctx.params.id)
		.then(res => (ctx.body = res))
		.catch(err => {
			console.log(err);
			ctx.body = { error: err };
			ctx.status = 400;
		});
});

router.patch("/memes/:id", async (ctx, next) => {
	let body = await parse(ctx);
	await meme
		.updateMemeById(ctx.params.id, body)
		.then(res => (ctx.body = res))
		.catch(err => {
			console.log(err);
			ctx.body = { error: err };
			ctx.status = 400;
		});
});

router.delete("/memes/:id", async (ctx, next) => {
	// let body = await parse(ctx);
	await meme
		.deleteMemeById(ctx.params.id)
		.then(res => (ctx.body = res))
		.catch(err => {
			console.log(err);
			ctx.body = { error: err };
			ctx.status = 400;
		});
});

router.post("/memes/:id/comments", async (ctx, next) => {
	let body = await parse(ctx);
	await meme
		.addNewComment(ctx.params.id, body)
		.then(res => (ctx.body = res))
		.catch(err => {
			console.log(err);
			ctx.body = { error: err };
			ctx.status = 400;
		});
});

router.delete("/memes/comments/:id", async (ctx, next) => {
	await meme
		.removeComment(ctx.params.id)
		.then(res => (ctx.body = res))
		.catch(err => {
			console.log(err);
			ctx.body = { error: err };
			ctx.status = 400;
		});
});

app.use(logger());
app.use(cors());
app.use(router.routes());
app.listen(3000);
