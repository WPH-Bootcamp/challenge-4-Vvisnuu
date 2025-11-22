'use strict';

const prompt = require("prompt-sync")({ sigint: true });

let todos = [];


function generateUniqueId() {
  // TODO: Implementasi fungsi untuk menghasilkan ID unik
  // Ini akan digunakan secara internal untuk setiap objek to-do
  // Contoh: Gabungan waktu saat ini dan angka acak
  return Date.now().toString() + Math.floor(Math.random() * 1000).toString();
}

function addTodo() {
  // TODO: Implementasi logika untuk menambah to-do baru
  // 1. Minta input teks to-do dari user menggunakan `prompt()`
  // 2. Validasi input: Pastikan teks tidak kosong atau hanya spasi
  // 3. Buat objek to-do baru dengan properti: id (dari generateUniqueId), text, dan isCompleted (boolean, default false)
  // 4. Tambahkan objek to-do ini ke array `todos`
  // 5. Beri feedback ke user bahwa to-do berhasil ditambahkan
  let text = prompt("Enter your to-do:");
  if (text.trim() === "" || text === null) {
    console.log("To-do text cannot be empty. or only spaces.");
    return;
  }
  let newTodo = {
    id: generateUniqueId(),
    text: text,
    iscompletede: false,
  }
  todos.push(newTodo);
  console.log('To-do "$(text)" has been added succesfully.');
}

function markTodoCompleted() {
  // TODO: Implementasi logika untuk menandai to-do sebagai selesai
  // 1. Panggil `listTodos()` untuk menampilkan daftar to-do
  // 2. Minta user memasukkan NOMOR to-do yang ingin ditandai sebagai selesai
  // 3. Validasi input: Pastikan nomor adalah angka, dalam rentang yang valid (1 sampai jumlah to-do)
  // 4. Ubah properti `isCompleted` dari to-do yang dipilih menjadi `true`
  // 5. Beri feedback ke user bahwa to-do berhasil ditandai selesai
  // 6. Tangani kasus jika to-do sudah selesai
  listTodos();

  let number = prompt("to-do number to complete : ");
  number = parseInt(number);
  if (typeof number === "number") {
    let index = number - 1;

    if (todos[index]) {
      let todo = todos[index];

      todo.isCompleted = true;

      console.log(`to-do ${todo.text} has been completed`);
    } else {
      console.log("Invalid number. Please enter a valid number from the list.");
    }
  }

}

function deleteTodo() {
  // TODO: Implementasi logika untuk menghapus to-do
  // 1. Panggil `listTodos()` untuk menampilkan daftar to-do
  // 2. Minta user memasukkan NOMOR to-do yang ingin dihapus
  // 3. Validasi input: Pastikan nomor adalah angka, dalam rentang yang valid
  // 4. Hapus to-do yang dipilih dari array `todos`
  // 5. Beri feedback ke user bahwa to-do berhasil dihapus
  let input = prompt("Please input your number to do for delete to do: ");  

  if(isNaN(input) || !input || input < 1 || input > todos.length){
    console.log("Invalid number. Please enter a valid number from the list.")
    return;
  }

  todos.splice(input-1, 1);

  console.log(`your number ${input} success delete`);
  return ;
}

function listTodos() {
  // TODO: Implementasi logika untuk menampilkan semua to-do
  // 1. Tampilkan judul daftar (misal: "--- YOUR TO-DO LIST ---")
  // 2. Cek apakah array `todos` kosong. Jika ya, tampilkan pesan "No to-dos to display."
  // 3. Jika tidak kosong, iterasi (loop) melalui array `todos`
  // 4. Untuk setiap to-do, tampilkan nomor urut, status ([DONE] atau [ACTIVE]), dan teks to-do
  //    Contoh format: "1. [ACTIVE] | Belajar JavaScript"
  // 5. Tampilkan garis penutup daftar
  console.log("---YOUR TO-DO LIST---");

  if (todos.length > 0) {
    todos.forEach((todo, index) => {
      let status = "[ACTIVE]";

      if (todo.isCompleted) {
        status = "[DONE]"; 
      }

      let i = 1 + index;
      console.log(`${i}. ${status} | ${todo.text}`);
    });
  } else {
    console.log("No to-dos to display.");
  }
}

function runTodoApp() {
  // TODO: Implementasi logika utama aplikasi (menu interaktif)
  // Ini adalah "otak" aplikasi yang terus berjalan sampai user memilih untuk keluar
  let running = true;
  while (running) {
    // 1. Tampilkan menu perintah yang tersedia (add, complete, delete, list, exit)
    // 2. Minta user memasukkan perintah menggunakan `prompt()`
    // 3. Gunakan `switch` statement atau `if/else if` untuk memanggil fungsi yang sesuai
    //    berdasarkan perintah yang dimasukkan user
    // 4. Tangani perintah 'exit' untuk menghentikan loop aplikasi
    // 5. Tangani input perintah yang tidak valid
    const command = prompt("please input your command (add/complete/delete/list/exit): ");

    switch (command) {
      case "add":
        addTodo();
        break;

      case "list":
        listTodos();
        break;

      case "complete":
        markTodoCompleted();
        break;

      case "delete":
        deleteTodo();
        break;

      case "exit":
        running = false;
        console.log("Thank you..");
        break;

      default:
        console.log("please input command");
        break;
    
    }
  }
}

// Jangan ubah bagian di bawah ini. Ini adalah cara Node.js menjalankan fungsi utama
// dan mengekspor fungsi-fungsi untuk pengujian (jika nanti ada).

if (require.main === module) {
  runTodoApp();
}

module.exports = {
  todos,
  generateUniqueId,
  addTodo,
  markTodoCompleted,
  deleteTodo,
  listTodos,
  runTodoApp,
};
