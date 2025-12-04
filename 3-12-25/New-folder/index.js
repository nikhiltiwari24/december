require("dotenv/config")
const db = require("./db");
const { userTable } = require("./drizzle/schema");

async function getAllUser() {
  const user = await db.select().from(userTable);
  console.log("User in DB", user);
  return user;
}

async function createUser({ id, name, email }) {
  await db.insert(userTable).values({
    id,
    name,
    email,
  });
}


getAllUser()