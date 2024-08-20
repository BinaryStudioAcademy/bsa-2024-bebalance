const ProjectPrefix = {
	APP: "bb",
	CHANGE_TYPES: [
		"build",
		"chore",
		"ci",
		"docs",
		"feat",
		"fix",
		"perf",
		"refactor",
		"revert",
		"style",
		"test",
	],
	ENVIRONMENT: "main",
	ISSUE_PREFIXES: ["bb", "release"],
	SCOPES: {
		APPS: ["frontend", "backend", "mobile"],
		PACKAGES: ["main", "shared"],
	},
} as const;

export { ProjectPrefix };
