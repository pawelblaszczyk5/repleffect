import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { assert } from "@repleffect/assert";

import { App } from "#src/app.tsx";

const rootElement = document.querySelector("#root");

assert(rootElement);

const root = createRoot(rootElement);

root.render(
	<StrictMode>
		<App />
	</StrictMode>,
);
