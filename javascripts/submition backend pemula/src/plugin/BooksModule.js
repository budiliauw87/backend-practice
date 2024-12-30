const { nanoid } = require('nanoid');
const MyError = require('../MyError');

class BookModule {

  //construct class Bookmodule
  constructor(){
    this._books = []; //set empty array
  }

  tambahBuku({ name, year, author, summary, publisher, pageCount, readPage, reading }){
    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    //set error jika pageCount lebih kecil dari readPage
    if (pageCount < readPage){
      throw new MyError('Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount', 400);
    }

    const finished = (pageCount === readPage);

    const newBook = {
      id,
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      insertedAt,
      updatedAt
    };
    //menambahkan ke array books
    this._books.push(newBook);

    //validate jika ada data di dalam array books
    const isSuccess = this._books.filter((book) => book.id === id).length > 0;

    //gagal menambahkan
    if (!isSuccess){
      throw new Error('Gagal menambahkan buku');
    }
    return id;
  }

  semuaBuku(){
    return this._books;
  }

  detailBuku(id){
    //filter books array
    const buku = this._books.filter((b) => b.id === id)[0];
    if (!buku){
      throw new MyError('Buku tidak ditemukan', 404);
    }
    return buku;
  }

  updateBuku(id, { name, year, author, summary, publisher, pageCount, readPage, reading }){
    //mencari index data buku
    const index = this._books.findIndex((book) => book.id === id);
    if (index === -1){
      throw new MyError('Gagal memperbarui buku. Id tidak ditemukan', 404);
    }

    //set error jika pageCount lebih kecil dari readPage
    if (pageCount < readPage){
      throw new MyError('Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount', 400);
    }

    //cek jika sudah finish
    const finished = (pageCount === readPage);
    const updatedAt = new Date().toISOString();
    //update value
    this._books[index] = {
      ...this._books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      updatedAt,
    };
  }

  hapusBuku(id){
    //mencari index data buku
    const index = this._books.findIndex((book) => book.id === id);
    if (index === -1){
      throw new MyError('Buku gagal dihapus. Id tidak ditemukan', 404);
    }

    //hapus data dari array books
    this._books.splice(index, 1);
  }

}

//export module class
module.exports = BookModule;
