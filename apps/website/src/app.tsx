import { HttpClient, HttpClientRequest } from "@effect/platform";
import { Resolver } from "@effect/rpc";
import { HttpResolverNoStream } from "@effect/rpc-http";
import { Effect } from "effect";
import { useState } from "react";

import type { Router } from "@repleffect/api/router";
import { Test } from "@repleffect/api/schema";

const client = HttpResolverNoStream.make<Router>(
	HttpClient.fetchOk.pipe(HttpClient.mapRequest(HttpClientRequest.prependUrl("/rpc"))),
).pipe(Resolver.toClient);

export const App = () => {
	const [message, setMessage] = useState("");

	const handleClick = async () => {
		const result = await Effect.runPromise(client(new Test()));

		setMessage(result);
	};

	return (
		<>
			<h1>Hello world!</h1>
			<p>{message}</p>
			<button onClick={handleClick} type="button">
				Test
			</button>
		</>
	);
};
