import core from "@repleffect/eslint-config/core";
import react from "@repleffect/eslint-config/react";

export default [
	{
		languageOptions: {
			parserOptions: {
				project: ["./tsconfig.json", "./tsconfig.tooling.json", "./tsconfig.app.json"],
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},
	...core,
	...react,
	{
		files: ["vite.config.ts"],
		rules: {
			"import-x/no-default-export": "off",
		},
	},
];
