# Library Microservice

This is a microservice that provides a library of books. It has the following endpoints:

- GET /books: returns a list of all books in the library
- GET /books/:id: returns a single book by id
- POST /books: creates a new book in the library
- PUT /books/:id: updates a book in the library
- DELETE /books/:id: deletes a book from the library

The microservice uses a PostgreSQL database to store the books.

The microservice is written in Node.js and uses the Express.js framework.

The microservice can be run with the following command:
