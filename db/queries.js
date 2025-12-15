import bcrypt from "bcryptjs";

import { prisma } from "../lib/prisma.js";

async function handleAccountStrategy(username, password, done) {
  try {
    const user = await prisma.users.findFirst({
      where: {
        username: username,
      },
    });

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
    const user = await prisma.users.findFirst({
      where: {
        id: id,
      },
    });

    done(null, user);
  } catch (err) {
    done(err);
  }
}

async function addUser(username, hashedPassword) {
  await prisma.users.create({
    data: {
      username: username,
      password: hashedPassword,
    },
  });
}

export { handleAccountStrategy, deserializeUser, addUser };
