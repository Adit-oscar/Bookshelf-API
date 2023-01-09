# :label: Bookshelf-API

Bookshelf-API adalah sebuah project RESTful API sederhana yang digunakan untuk mengelola sebuah data buku berdasarkan permintaan klien ke sisi server berdasarkan url & method yang dikirimkan klien, project ini dibangun menggunakan Node.js dan framework Hapi.js.   

# :gear: Panduan untuk menggunakan API

### :arrow_forward: **Menghidupkan Server**
- Silahkan buka terminal pada komputer masing-masing
- Silahkan arahkan terminal ke path tempat penyimpanan project
- Silahkan ketikan perintah `npm run start` atau `npm start`

### **Akses API**

Untuk mengakses API, silahkan ketikan `http://localhost:5000/path url` pada url browser yang anda gunakan / bisa menggunakan Postman untuk membantu mengakses API tersebut.

### ***Menambahkan Data***
> Path Url: /books

> Method: POST

> Body Request: 
  ```       
      {
        "name": string,
        "year": number,
        "author": string,
        "summary": string,
        "publisher": string,
        "pageCount": number,
        "readPage": number,
        "reading": boolean
      }
  ```

Body Request dikirimkan dalam format JSON, pada Postman dikirimkan pada Body > raw dengan type data JSON.

### ***Menampilkan Seluruh Data***
> Path Url: /books

> Method : GET

### ***Menampilkan Detail Data Berdasarkan Id***
> Path Url: /books/{bookId}

> Method: POST

### ***Mengubah Data Buku***
> Path Url: /books/{bookId}

> Method: PUT

### ***Menghapus Data Buku***
> Path Url: /books/{bookId}

> Method: DELETE

### ***Mencari data berdasarkan query parameter***
> Query Parameter: name, reading, finished 

> Path Url: /books?nama query parameter

> Method: GET
