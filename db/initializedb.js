const { Client } = require("pg");

require("dotenv").config();

// testificate - villager
// sudoman - administrator
const InitializeUsersQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR (255),
    password VARCHAR (255),
    membership BOOL,
    isAdmin BOOL
  );

  INSERT INTO users(username, password, membership, isAdmin)
  VALUES
    ('testificate', '$2a$08$fQVSiOTCujkTgsiixfeotObvMaktagWuCucWZ07eRsAummMIMGPvK',
    False,
    False),
    ('sudo man', '$2a$08$wWhM1KjiWxKP78boCqMywOiCT4HW1w7i13Fo8OJfX/MJWcxpCF4EW',
    True,
    True),
    ('Phillips Herman',
    '$2a$08$yZoDfO8WZk4ow9ZLCwQQ6.ozYkmWA4svwcGpom3ZglkTw.EMuZQkS',
    True,
    False),
    ('Maria Dharmein',
    '$2a$08$ZnQjyqsvEb52Oo5xLVe3aOnfk4UJArnJI4cCUmc3.s5b0pkeWfb2y',
    False,
    False),
    ('Connor Valkyrie',
    '$2a$08$.LYRuQ0JjpZS7nIoXKpm2.K8x6j7yZ/sz.DmBN.9.AN44qjRRhP9q',
    False,
    True);
  `;

const InitializeMessagesQuery = `
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id INTEGER REFERENCES users(id),
    message VARCHAR(255),
    timestamp TIMESTAMP
  );

  INSERT INTO messages (user_id, message, timestamp)
  VALUES
    (3, 'It''s really amazing what you can do with some basic resourcefulness!', '20251115 01:59:34 PM'),
    (5, 'Pretty clear weather today, but I don''t know how to take advantage of it...', '20251112 03:03:33 PM'),
    (5, 'A little test post, no need to mind me!',
    '20251112 12:00:01 PM'),
    (3, 'Eh, the tickets already sold out!? Aw man.',
    '20251112 09:41:44 AM'),
    (4, 'I really love the smell of flowers in the twilight.',
    '20251112 06:30:28 AM'),
    (5, 'Where would you go if you want some ice cream? Curious.', '20251112 05:25:15 AM'),
    (4, 'Programming is such a pain, but it can still be really fun sometimes!', '20251111 08:13:28 PM'),
    (4, 'Hello World-o!', '20251111 12:48:55 PM'),
    (3, 'Hi hi everyone! Hope to enjoy my membership here! Wooo!', '20251111 12:40:01 PM'),
    (5, 'Welcome to the club, and be sure to be on your best behaviour everyone!', '20251111 12:30:15 PM');
  `;

async function main() {
  console.log("Initializing Database...");

  const connectionString = process.env.DATABASE_URL
    ? process.env.DATABASE_URL
    : `postgresql://${process.env.USER}:${process.env.PASSWORD}@localhost:${process.env.SQL_PORT}/${process.env.DATABASE}`;

  const client = new Client({
    connectionString: connectionString,
  });
  await client.connect();
  await client.query(InitializeUsersQuery);
  await client.query(InitializeMessagesQuery);
  await client.end();

  console.log("Done.");
}

main();
