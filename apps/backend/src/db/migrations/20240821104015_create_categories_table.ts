import { type Knex } from "knex";

const TABLE_NAME = "categories";

const ColumnName = {
	CREATED_AT: "created_at",
	ID: "id",
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
	await knex.schema.createTable(TABLE_NAME, (table) => {
		table.increments(ColumnName.ID).primary();
		table.string(ColumnName.NAME).notNullable().unique();
		table
			.dateTime(ColumnName.CREATED_AT)
			.notNullable()
			.defaultTo(knex.fn.now());
		table
			.dateTime(ColumnName.UPDATED_AT)
			.notNullable()
			.defaultTo(knex.fn.now());
	});

	await knex(TABLE_NAME).insert(
		CATEGORIES.map((name) => ({
			[ColumnName.CREATED_AT]: new Date(),
			[ColumnName.NAME]: name,
			[ColumnName.UPDATED_AT]: new Date(),
		})),
	);
}

async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists(TABLE_NAME);
}

export { down, up };
