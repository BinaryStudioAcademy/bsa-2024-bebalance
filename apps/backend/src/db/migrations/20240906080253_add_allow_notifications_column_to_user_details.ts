import { type Knex } from "knex";

const TABLE_NAME = "user_details";

const COLUMN_NAME = "notification_frequency";

const NotificationFrequency = {
	ALL: "all",
	NONE: "none",
} as const;

function up(knex: Knex): Promise<void> {
	return knex.schema.alterTable(TABLE_NAME, (table) => {
		table
			.enu(COLUMN_NAME, Object.values(NotificationFrequency), {
				enumName: `${COLUMN_NAME}_enum`,
				useNative: true,
			})
			.notNullable()
			.defaultTo(NotificationFrequency.NONE);
	});
}

async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable(TABLE_NAME, (table) => {
		table.dropColumn(COLUMN_NAME);
	});

	await knex.raw(`DROP TYPE IF EXISTS ${COLUMN_NAME}_enum;`);
}

export { down, up };
