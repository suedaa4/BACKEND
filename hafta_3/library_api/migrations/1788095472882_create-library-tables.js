/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = async (pgm) => {
  pgm.createTable(
    "categories",
    {
      id: { type: "serial", primaryKey: true },
      name: { type: "varchar(100)", notNull: true },
    },
    { ifNotExists: true },
  );

  pgm.createTable(
    "authors",
    {
      id: { type: "serial", primaryKey: true },
      first_name: { type: "varchar(50)", notNull: true },
      last_name: { type: "varchar(50)", notNull: true },
      birth_year: { type: "integer" },
    },
    { ifNotExists: true },
  );

  pgm.createTable(
    "books",
    {
      id: { type: "serial", primaryKey: true },
      title: { type: "varchar(150)", notNull: true },
      publication_year: { type: "integer" },
      author_id: {
        type: "integer",
        references: '"authors"',
        onDelete: "CASCADE",
      },
      category_id: {
        type: "integer",
        references: '"categories"',
        onDelete: "SET NULL",
      },
    },
    { ifNotExists: true },
  );

  pgm.createTable(
    "members",
    {
      id: { type: "serial", primaryKey: true },
      first_name: { type: "varchar(50)", notNull: true },
      last_name: { type: "varchar(50)", notNull: true },
      email: { type: "varchar(100)", notNull: true, unique: true },
      membership_date: {
        type: "timestamp",
        default: pgm.func("current_timestamp"),
      },
    },
    { ifNotExists: true },
  );

  pgm.createTable(
    "borrowings",
    {
      id: { type: "serial", primaryKey: true },
      book_id: {
        type: "integer",
        references: '"books"',
        onDelete: "CASCADE",
        notNull: true,
      },
      member_id: {
        type: "integer",
        references: '"members"',
        onDelete: "CASCADE",
        notNull: true,
      },
      borrow_date: {
        type: "timestamp",
        default: pgm.func("current_timestamp"),
      },
      return_date: { type: "timestamp" },
    },
    { ifNotExists: true },
  );
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = async (pgm) => {
  pgm.dropTable("borrowings");
  pgm.dropTable("members");
  pgm.dropTable("books");
  pgm.dropTable("authors");
  pgm.dropTable("categories");
};
