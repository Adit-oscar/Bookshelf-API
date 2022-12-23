const { nanoid } = require('nanoid');
const books = require('./books.js');

const addBooks = (request, h) => {

  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

  const bookId = nanoid(16);

  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  let finished = false;

  if (pageCount === readPage) {

    finished = true;

  };

  const newBooks = {
    bookId, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt
  };

  if (name === undefined) {

    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku'
    });

    response.code(400);
    return response;

  };

  if (readPage > pageCount) {

    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    });
    
    response.code(400);
    return response;
    
  };

  if (name === '' && year === '' && author === '' && summary === '' && publisher === '' && pageCount === '' && pageCount === '' && readPage === '' && reading === '') {

    const response = h.response({
      status: 'error',
      message: 'Buku gagal ditambahkan'
    });

    response.code(500);
    return response;
    
  } else if (name === '' || year === '' || author === '' || summary === '' || publisher === '' || pageCount === '' || pageCount === '' || readPage === '' || reading === '') {

    const response = h.response({
      status: 'error',
      message: 'Buku gagal ditambahkan'
    });

    response.code(500);
    return response;
    
  } else {

    books.push(newBooks);

    const isSuccess = books.filter((b) => b.bookId === bookId).length > 0;

    if (isSuccess) {

      const response = h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId: bookId
        }
      });
      
      response.code(201);
      return response;

    };

  };

};

const getAllBooks = (request, h) => {

  const { name, reading, finished } = request.query;

  if (finished !== undefined) {

    
    if (finished == 1) {

      const findBookByFinishedIsTrue = books.filter((b) => b.finished === true)[0];
      
      if (findBookByFinishedIsTrue !== undefined) {
        
        const findBookByFinishedIsTrue = books.filter((b) => b.finished === true);

        const response = h.response({
          status: 'success',
          data: {
            books: Array.from(findBookByFinishedIsTrue).map((b) => ({
              id: b.bookId,
              name: b.name,
              publisher: b.publisher
            }))
          }
        });

        response.code(200);
        return response;

      };

    } else if (finished == 0) {

      const findBookByFinishedIsFalse = books.filter((b) => b.finished === false)[0];
      
      if (findBookByFinishedIsFalse !== undefined) {
        
        const findBookByFinishedIsFalse = books.filter((b) => b.finished === false);

        const response = h.response({
          status: 'success',
          data: {
            books: Array.from(findBookByFinishedIsFalse).map((b) => ({
              id: b.bookId,
              name: b.name,
              publisher: b.publisher
            }))
          }
        });

        response.code(200);
        return response;

      };

    } else {

      const response = h.response({
        status: 'success',
        data: {
          books: books.map((b) => ({
            id: b.bookId,
            name: b.name,
            publisher: b.publisher
          }))
        }
      });

      response.code(200);
      return response;

    };

  };

  if (reading !== undefined) {
    
    if (reading == 1) {

      const findBookByReadingIsTrue = books.filter((b) => b.reading === true)[0];
      
      if (findBookByReadingIsTrue !== undefined) {
        
        const findBookByReadingIsTrue = books.filter((b) => b.reading === true);

        const response = h.response({
          status: 'success',
          data: {
            books: Array.from(findBookByReadingIsTrue).map((b) => ({
              id: b.bookId,
              name: b.name,
              publisher: b.publisher
            }))
          }
        });

        response.code(200);
        return response;

      };

    } else if (reading == 0) {

      const findBookByReadingIsFalse = books.filter((b) => b.reading === false)[0];
      
      if (findBookByReadingIsFalse !== undefined) {
        
        const findBookByReadingIsFalse = books.filter((b) => b.reading === false);

        const response = h.response({
          status: 'success',
          data: {
            books: Array.from(findBookByReadingIsFalse).map((b) => ({
              id: b.bookId,
              name: b.name,
              publisher: b.publisher
            }))
          }
        });

        response.code(200);
        return response;

      };

    } else {

      const response = h.response({
        status: 'success',
        data: {
          books: books.map((b) => ({
            id: b.bookId,
            name: b.name,
            publisher: b.publisher
          }))
        }
      });

      response.code(200);
      return response;

    };

  };

  if (name !== undefined) {

    const findBookByName = books.filter((b) => b.name.toLowerCase() === name.toLowerCase())[0];
    
    if (findBookByName !== undefined) {

      const bookSearch = books.filter((b) => b.name.toLowerCase() === name.toLowerCase());

      const response = h.response({
        status: 'success',
        data: {
          books: Array.from(bookSearch).map((b) => ({
              id: b.bookId,
              name: b.name,
              publisher: b.publisher
          }))
        }
      });
    
      response.code(200);
      return response;

    };
    
  };

  const response = h.response({
    status: 'success',
    data: {
      books: books.map((b) => ({
        id: b.bookId,
        name: b.name,
        publisher: b.publisher
      }))
    }
  });

  response.code(200);
  return response;

};

const getBooksById = (request, h) => {
  const { bookId } = request.params;

  const book = books.filter((b) => b.bookId === bookId)[0];

  if (book !== undefined) {
    const response = h.response({
      status: 'success',
      data: {
        book: {
          id: book.bookId,
          name: book.name,
          year: book.year,
          author: book.author,
          summary: book.summary,
          publisher: book.publisher,
          pageCount: book.pageCount,
          readPage: book.readPage,
          finished: book.finished,
          reading: book.reading,
          insertedAt: book.insertedAt,
          updatedAt: book.updatedAt
        }
      }
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan'
  });

  response.code(404);
  return response;

};

const updateBooks = (request, h) => {

  const {bookId} = request.params;

  const {name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;

  const updatedAt = new Date().toISOString();
  let finished = false;

  if (pageCount === readPage) {
    finished = true;
  };

  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku'
    });

    response.code(400);
    return response;
  };

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
    });

    response.code(400);
    return response;
  };

  const findId = books.filter((b) => b.bookId === bookId)[0];

  if (findId === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan'
    });

    response.code(404);
    return response;
  };

  const indexId = books.findIndex((b) => b.bookId === bookId);

  if (indexId !== -1) {
    books[indexId] = {
      ...books[indexId],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      updatedAt
    };

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui'
    });

    response.code(200);
    return response;

  };
};

const deleteBooks = (request, h) => {

  const {bookId} = request.params;

  const indexId = books.findIndex((b) => b.bookId === bookId);

  if (indexId !== -1) {
    books.splice(indexId, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus'
    });

    response.code(200);
    return response;
  };

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan'
  });

  response.code(404);
  return response;

}

module.exports = { addBooks, getAllBooks, getBooksById, updateBooks, deleteBooks };