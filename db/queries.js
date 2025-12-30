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

async function registerFile(owner, fileData, base = null) {
  await prisma.files.create({
    data: {
      owner: {
        connect: {
          id: owner,
        },
      },
      filename: fileData.filename,
      type: fileData.mimetype,
      size: fileData.size,
      folder:
        base === null
          ? { is: null }
          : {
              connect: {
                id: base,
              },
            },
    },
  });
}

async function createFolder(owner, foldername, base = null) {
  const query = {
    data: {
      owner: {
        connect: {
          id: owner,
        },
      },
      foldername: foldername,
    },
  };

  // Add ID of Parent if Subfolder
  if (base && base?.id) {
    query.data.parent = {
      parent: {
        connect: {
          id: base.id,
        },
      },
    };
  }

  await prisma.folders.create(query);
}

async function getFolderContents(owner, folder = null) {
  if (folder?.id === -1) {
    return {
      files: [],
      folders: [],
    };
  }

  const whereFileQuery = {
    ownerID: owner,
  };
  const whereFolderQuery = {
    ownerID: owner,
  };

  if (folder == null) {
    whereFileQuery.folder = { is: null };
    whereFolderQuery.parent = { is: null };
  } else {
    whereFileQuery.folderID = folder;
    whereFolderQuery.parentID = folder;
  }

  const files = await prisma.files.findMany({
    where: whereFileQuery,
  });

  const folders = await prisma.folders.findMany({
    where: whereFolderQuery,
  });

  return { files, folders };
}

async function getBaseFolder(owner, paths, depth = 0) {
  if (paths == null || paths == undefined || paths?.length < 1) {
    return null;
  }

  const base = depth < 1 ? null : paths[depth - 1];
  const current = paths[depth];
  const next = paths.length === depth + 1 ? null : paths[depth + 1];

  const f = await prisma.folders.findFirst({
    where: {
      ownerID: owner,
      foldername: current,
      parent: base == null ? { is: null } : base,
    },
  });

  if (f == null || f == undefined) {
    return { id: -1 };
  }

  if (next == null) {
    return f;
  }

  getBaseFolder(owner, paths.shift, depth + 1);
}

async function uniqueInFolder(owner, item, folder = null, type = null) {
  let isUnique = True;

  isUnique =
    (await prisma.files.findFirst({
      where: {
        filename: item,
        ownerID: owner,
        folder: folder === null ? { is: null } : folder,
      },
    })) === null;

  isUnique =
    (await prisma.folders.findFirst({
      where: {
        foldername: item,
        ownerID: owner,
        folder: folder === null ? { is: null } : folder,
      },
    })) === null;
}

export {
  handleAccountStrategy,
  deserializeUser,
  addUser,
  registerFile,
  createFolder,
  getFolderContents,
  getBaseFolder,
  uniqueInFolder,
};
