import { type Knex } from "knex";

const TABLE_NAME = "categories";

const ColumnName = {
	CREATED_AT: "created_at",
	NAME: "name",
	UPDATED_AT: "updated_at",
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
			[ColumnName.CREATED_AT]: new Date(),
			[ColumnName.NAME]: name,
			[ColumnName.UPDATED_AT]: new Date(),
		})),
	);
}

async function down(knex: Knex): Promise<void> {
	await knex(TABLE_NAME).whereIn(ColumnName.NAME, CATEGORIES).del();
}

export { down, up };
