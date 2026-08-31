const pool = require("../db");

const runMigration = async () => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    await client.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

    await client.query(`
            CREATE TABLE IF NOT EXISTS projects (
                id SERIAL PRIMARY KEY,
                title VARCHAR(100) NOT NULL,
                description TEXT NOT NULL,
                image_url VARCHAR(255),
                github_url VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

    await client.query(`
            CREATE TABLE IF NOT EXISTS tags (
                id SERIAL PRIMARY KEY,
                name VARCHAR(50) UNIQUE NOT NULL
            );
        `);

    await client.query(`
            CREATE TABLE IF NOT EXISTS project_tags (
                project_id INT REFERENCES projects(id) ON DELETE CASCADE,
                tag_id INT REFERENCES tags(id) ON DELETE CASCADE,
                PRIMARY KEY (project_id, tag_id)
            );
        `);

    await client.query("COMMIT");
    console.log("Portfolyo CMS tabloları başarıyla oluşturuldu!");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Migration hatası:", err);
  } finally {
    client.release();
  }
};

runMigration();
