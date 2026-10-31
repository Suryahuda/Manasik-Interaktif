import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// MASUKKAN CONFIG FIREBASE ANDA DI SINI
const firebaseConfig = {
  apiKey: "AIzaSyBJ8U8SCUQaJCNt6NkiolsRN_VP-r0I1Ps",
  authDomain: "manasik-umrah-interaktif.firebaseapp.com",
  projectId: "manasik-umrah-interaktif",
  storageBucket: "manasik-umrah-interaktif.firebasestorage.app",
  messagingSenderId: "698727319813",
  appId: "1:698727319813:web:9ac9dd6c10a4036932cf6c",
  measurementId: "G-9FQQMYHV0N"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Elemen UI
const btnLogin = document.getElementById('btnLogin');
const btnLogout = document.getElementById('btnLogout');
const pageLogin = document.getElementById('page-login');
const pageDashboard = document.getElementById('page-dashboard');

// Logika Ganti Halaman (SPA Routing)
window.showPage = function(pageId) {
    // Sembunyikan semua section
    const pages = ['page-login', 'page-dashboard', 'page-miqat', 'page-tawaf', 'page-sai', 'page-tahalul'];
    pages.forEach(id => document.getElementById(id).classList.add('hidden'));
    
    // Tampilkan halaman yang dituju
    document.getElementById(pageId).classList.remove('hidden');
    window.scrollTo(0, 0);
}

// Pantau Status Login Jemaah
onAuthStateChanged(auth, (user) => {
  if (user) {
    // Jika jemaah sudah login
    btnLogin.classList.add('hidden');
    btnLogout.classList.remove('hidden');
    showPage('page-dashboard');
  } else {
    // Jika jemaah belum login
    btnLogin.classList.remove('hidden');
    btnLogout.classList.add('hidden');
    showPage('page-login');
  }
});

// Fungsi Tombol Login (Menggunakan Anonymous untuk kemudahan akses jemaah)
btnLogin.addEventListener('click', () => {
  signInAnonymously(auth).catch((error) => {
    console.error("Gagal Login:", error);
    alert("Gagal masuk sistem. Periksa koneksi Anda.");
  });
});

// Fungsi Tombol Logout
btnLogout.addEventListener('click', () => {
  signOut(auth);
});