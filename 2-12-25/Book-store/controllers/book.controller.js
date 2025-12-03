const { BOOKS } = require("../models/book");

exports.getAllBooks = function (req, res) {
     res.json(BOOKS);
};

exports.getBookById = function(req, res){
    const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: `The ID must be of type Number` });
  }
  const book = BOOKS.find((e) => e.id === id);

  if (!book) {
    return res
      .status(404)
      .json({ error: `Book with ID ${id} does not exists!` });
  }
  return res.json(book);
}

exports.createBook = function(req, res){
    const { title, author } = req.body;
  if (!title || title === "") {
    return res.status(400).json({ error: `Title is required` });
  }
  if (!author || author === "") {
    return res.status(400).json({ error: `Author is required` });
  }

  const id = BOOKS.length + 1;

  const book = { id, title, author };
  BOOKS.push(book);

  return res.status(201).json({ message: `Book created success`, id });
}

exports.deleteBookById = function(req, res){
     const id = parseInt(req.params.id);

  if (isNaN(id))
    return res.status(400).json({ error: "ID mest br type od number" });

  const indexToDelete = BOOKS.findIndex((e) => e.id === id);

  if (indexToDelete < 0)
    return res
      .status(404)
      .json({ error: `Book with is id ${id} does not exists` });

  BOOKS.splice(indexToDelete, 1);
  return res.status(200).json({ message: `Book with ID ${id} deleted` });
}