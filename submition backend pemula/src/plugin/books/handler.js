const MyError = require('../../MyError');
class BooksHandler {

  //construct class
  constructor(service){
    this._service = service;
    this.tambahBookHandler = this.tambahBookHandler.bind(this);
    this.ambilBukuHandler = this.ambilBukuHandler.bind(this);
    this.ambilBukuDetailHandler = this.ambilBukuDetailHandler.bind(this);
    this.updateBukuHandler =  this.updateBukuHandler.bind(this);
    this.deleteBukuHandler = this.deleteBukuHandler.bind(this);
  }

  tambahBookHandler(request, h){
    try {
      const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
      const bookId = this._service.tambahBuku({ name, year, author, summary, publisher, pageCount, readPage, reading });
      return h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: { bookId, },
      }).code(201);

    } catch (error){
      //custom error
      if (error instanceof MyError) {
        return h.response({
          status: 'fail',
          message: error.message,
        }).code(error.statusCode);
      }

      //generic error
      return h.response({
        status: 'error',
        message: 'Buku gagal ditambahkan',
      }).code(500);
    }
  }

  ambilBukuHandler(request){
    const query = request.query;
    const tempBooks = this._service.semuaBuku();
    const books =[];

    if ('name' in query && query.name.length > 0){
      const queryName = query.name.toLowerCase();
      tempBooks.forEach((book) => {
        if (book.name.toLowerCase().includes(queryName) === true){
          books.push({
            id:book.id,
            name:book.name,
            publisher:book.publisher,
          });
        }
      });
    } else if ('reading' in query){
      if (query.reading == 1){
        tempBooks.forEach((book) => {
          if (book.reading === true){
            books.push({
              id:book.id,
              name:book.name,
              publisher:book.publisher,
            });
          }
        });
      } else if (query.reading == 0){
        tempBooks.forEach((book) => {
          if (book.reading === false){
            books.push({
              id:book.id,
              name:book.name,
              publisher:book.publisher,
            });
          }
        });
      }
    } else if ('finished' in query){
      if (query.finished == 1){
        tempBooks.forEach((book) => {
          if (book.finished === true){
            books.push({
              id:book.id,
              name:book.name,
              publisher:book.publisher,
            });
          }
        });
      } else if (query.finished == 0){
        tempBooks.forEach((book) => {
          if (book.finished === false){
            books.push({
              id:book.id,
              name:book.name,
              publisher:book.publisher,
            });
          }
        });
      }
    } else {
      tempBooks.forEach((book) => {
        books.push({
          id:book.id,
          name:book.name,
          publisher:book.publisher,
        });
      });
    }
    return {
      status: 'success',
      data: { books },
    };
  }

  ambilBukuDetailHandler(request, h){
    try {
      const { bookId } = request.params;
      const book = this._service.detailBuku(bookId);
      return {
        status: 'success',
        data: { book },
      };
    } catch (error) {
      //custom error
      if (error instanceof MyError) {
        return h.response({
          status: 'fail',
          message: error.message,
        }).code(error.statusCode);
      }

      //generic error
      return h.response({
        status: 'error',
        message: 'Maaf, ada kesalahan server :)',
      }).code(500);
    }
  }

  updateBukuHandler(request, h){
    try {
      //params id buku
      const { bookId } = request.params;
      //payload body buku
      const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
      this._service.updateBuku(bookId, { name, year, author, summary, publisher, pageCount, readPage, reading });

      //return 200 code
      return {
        status: 'success',
        message: 'Buku berhasil diperbarui',
      };
    } catch (error) {
      //custom error
      if (error instanceof MyError) {
        return h.response({
          status: 'fail',
          message: error.message,
        }).code(error.statusCode);
      }

      //generic error
      return h.response({
        status: 'error',
        message: 'Buku gagal di diperbarui',
      }).code(500);
    }
  }

  deleteBukuHandler(request, h){
    try {
      const { bookId } = request.params;
      this._service.hapusBuku(bookId);
      return {
        status: 'success',
        message: 'Buku berhasil dihapus',
      };
    } catch (error) {
      //custom error
      if (error instanceof MyError) {
        return h.response({
          status: 'fail',
          message: error.message,
        }).code(error.statusCode);
      }

      //generic error
      return h.response({
        status: 'error',
        message: 'Buku gagal dihapus :(',
      }).code(500);
    }
  }
}

module.exports = BooksHandler;