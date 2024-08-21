import { type Knex } from "knex";

const TABLE_NAME = "categories";

const ColumnName = {
	NAME: "name",
} as const;

const CATEGORIES = [
	"Physical",
	"Work",
	"Friends",
	"Love",
	"Money",
	"Free time",
	"Spiritual",
	"Mental",
];

async function up(knex: Knex): Promise<void> {
	await knex(TABLE_NAME).insert(
		CATEGORIES.map((name) => ({
			[ColumnName.NAME]: name,
		})),
	);
}

async function down(knex: Knex): Promise<void> {
	await knex(TABLE_NAME).whereIn(ColumnName.NAME, CATEGORIES).del();
}

export { down, up };
