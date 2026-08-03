export async function up(knex) {
  await knex.raw(`
      ALTER TABLE USER ADD COLUMN address varchar(400) default null,
      add column created_at timestamp default current_timestamp,
      add column updated_at timestamp default current_timestamp on update current_timestamp
    `);
}

export async function down(knex) {
  await knex.raw(`
        ALTER TABLE USER drop column address,
        drop column created_at, drop column updated_at
        `);
}
