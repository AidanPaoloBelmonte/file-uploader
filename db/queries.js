import bcrypt from "bcryptjs";

import pool from "./pool.js";

async function handleAccountStrategy(username, password, done) {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM users WHERE username=\'${username}\';`,
    );
    const user = rows[0];

    if (!user) {
      return done(null, false, { message: "Incorrect Username" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return done(null, false, { message: "Incorrect Password" });
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
}

async function deserializeUser(id, done) {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    const user = rows[0];

    done(null, user);
  } catch (err) {
    done(err);
  }
}

async function addUser(username, hashedPassword) {
  await pool.query(
    `INSERT INTO users (username, password, membership, isAdmin)
    VALUES ($1, $2, False, False)`,
    [username, hashedPassword],
  );
}

async function upgradeUser(id) {
  await pool.query(
    `UPDATE users
    SET membership=True
    WHERE id=${id}
    `,
  );
}

async function checkMembership(username) {
  const { rows } = await pool.query(
    `SELECT * FROM users WHERE username=\'${username}\';`,
  );
  const user = rows[0];

  return user && user.membership;
}

async function checkAdmin(username) {
  const { rows } = await pool.query(
    `SELECT * FROM users WHERE username=\'${username}\'`,
  );

  const user = rows[0];

  return user && user?.isadmin;
}

async function fetchPosts(limit = 10, isMember = false) {
  let query = isMember
    ? `
      SELECT messages.id, username, message, timestamp
      FROM messages JOIN users ON users.id=messages.user_id
      ORDER BY timestamp DESC
      `
    : `
      SELECT id, message
      FROM messages
      ORDER BY timestamp DESC
      `;

  if (limit > 0) {
    query += `LIMIT ` + limit;
  }

  const { rows } = await pool.query(query);

  return rows;
}

async function addPost(user, post) {
  await pool.query(
    `INSERT INTO messages(user_id, message, timestamp)
    VALUES ($1, $2, $3);`,
    [user.id, post, new Date().toISOString()],
  );
}

async function deletePost(id) {
  await pool.query(
    `
    DELETE FROM messages
    WHERE id=$1
    `,
    [id],
  );
}

export {
  handleAccountStrategy,
  deserializeUser,
  addUser,
  upgradeUser,
  checkMembership,
  checkAdmin,
  fetchPosts,
  addPost,
  deletePost,
};
