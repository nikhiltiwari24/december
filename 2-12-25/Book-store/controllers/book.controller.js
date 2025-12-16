const bookTable = require("../models/book.model");
const db = require("../db");
const { eq, sql } = require("drizzle-orm");
const booksTable = require("../models/book.model");

exports.getAllBooks = async function (req, res) {
  const search = req.query.search;

  if (search) {
    const book = await db
      .select()
      .from(bookTable)
      .where(
        sql`to_tsvector('english', ${posts.title}) @@ to_tsquery('english', ${title})`
      );
    return res.json(book);
  }

  const books = await db.select().from(bookTable);
  return res.json(books);
};

exports.getBookById = async function (req, res) {
  const id = req.params.id;

  const [book] = await db
    .select()
    .from(bookTable)
    .where((table) => eq(table.id, id))
    .limit(1);

  if (!book) {
    return res
      .status(404)
      .json({ error: `Book with ID ${id} does not exists!` });
  }
  return res.json(book);
};

exports.createBook = async function (req, res) {
  const { title, description, authorId } = req.body;
  if (!title || title === "") {
    return res.status(400).json({ error: `Title is required` });
  }

  const [result] = await db
    .insert(bookTable)
    .values({
      title,
      authorId,
      description,
    })
    .returning({
      id: bookTable.id,
    });

  return res
    .status(201)
    .json({ message: `Book created success`, id: result.id });
};

exports.deleteBookById = async function (req, res) {
  const id = req.params.id;

  await db.delete(bookTable).where(eq(bookTable.id, id));
  return res.status(200).json({ message: `Book with ID ${id} deleted` });
};
