export async function up(knex) {
  await knex.raw(`
    CREATE TABLE USER(
    id int unsigned primary key auto_increment,
    fullname varchar(120) NOT NULL,
    email varchar(50) NOT NULL UNIQUE,
    password varchar(100) NOT NULL
    )
    `);
}

export async function down(knex) {
  await knex.raw(`DROP TABLE USER`);
}
