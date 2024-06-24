import { HttpMiddleware, HttpRouter, HttpServer } from "@effect/platform";
import { NodeHttpServer, NodeRuntime } from "@effect/platform-node";
import { Router, Rpc } from "@effect/rpc";
import { HttpRouterNoStream } from "@effect/rpc-http";
import { Effect, Layer } from "effect";
import { createServer } from "node:http";

import { Test } from "#src/schema.ts";

const router = Router.make(
	Rpc.effect(Test, () =>
		Effect.gen(function* () {
			yield* Effect.log("Hello world");

			return "bla";
		}),
	),
);

export type Router = typeof router;

const HttpLive = HttpRouter.empty.pipe(
	HttpRouter.post("/rpc", HttpRouterNoStream.toHttpApp(router)),
	HttpServer.serve(HttpMiddleware.logger),
	HttpServer.withLogAddress,
	Layer.provide(NodeHttpServer.layer(createServer, { port: 3_000 })),
);

Layer.launch(HttpLive).pipe(NodeRuntime.runMain);
