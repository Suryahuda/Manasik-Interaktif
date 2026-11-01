import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// MASUKKAN CONFIG FIREBASE ASLI ANDA DI BAWAH INI (Lihat dari Screenshot sebelumnya)
const firebaseConfig = {
   apiKey: "AIzaSyBJ8U8SCUQaJCNt6NkiolsRN_VP-r0I1Ps",
  authDomain: "manasik-umrah-interaktif.firebaseapp.com",
  projectId: "manasik-umrah-interaktif",
  storageBucket: "manasik-umrah-interaktif.firebasestorage.app",
  messagingSenderId: "698727319813",
  appId: "1:698727319813:web:9ac9dd6c10a4036932cf6c",
  measurementId: "G-9FQQMYHV0N"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Elemen UI Utama
const btnLogin = document.getElementById('btnMulaiSimulasi');
const btnLogout = document.getElementById('btnLogout');

// Fungsi Routing Sederhana (Berpindah Halaman)
window.showPage = function(pageId) {
    // Menambahkan 'page-personalisasi' ke dalam array agar bisa disembunyikan/ditampilkan
    const pages = ['page-login', 'page-personalisasi', 'page-dashboard', 'page-doa', 'page-kuis', 'page-miqat', 'page-tawaf', 'page-sai', 'page-tahalul'];
    
    pages.forEach(id => {
        document.getElementById(id).classList.add('hidden');
    });
    
    document.getElementById(pageId).classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Fitur Baru: Cek Kuis Pemahaman
window.cekKuis = function() {
    const q1 = document.querySelector('input[name="q1"]:checked');
    const q2 = document.querySelector('input[name="q2"]:checked');
    const hasilDiv = document.getElementById('hasilKuis');
    
    if (!q1 || !q2) {
        hasilDiv.className = "mt-4 p-4 rounded-xl font-bold text-center bg-yellow-100 text-yellow-800 border border-yellow-300 block";
        hasilDiv.innerHTML = "Harap jawab semua pertanyaan terlebih dahulu!";
        return;
    }
    
    let skor = 0;
    if (q1.value === 'benar') skor += 50;
    if (q2.value === 'benar') skor += 50;
    
    if (skor === 100) {
        hasilDiv.className = "mt-4 p-4 rounded-xl font-bold text-center bg-emerald-100 text-emerald-800 border border-emerald-300 block";
        hasilDiv.innerHTML = "Luar Biasa! Skor Anda 100. Anda sudah siap secara keilmuan!";
    } else {
        hasilDiv.className = "mt-4 p-4 rounded-xl font-bold text-center bg-red-100 text-red-800 border border-red-300 block";
        hasilDiv.innerHTML = `Skor Anda ${skor}. Mari pelajari lagi panduan manasik di dasbor utama.`;
    }
}

// Pantau Sesi Login
onAuthStateChanged(auth, (user) => {
  if (user) {
    btnLogin.classList.add('hidden');
    btnLogout.classList.remove('hidden');
    showPage('page-dashboard');
  } else {
    btnLogin.classList.remove('hidden');
    btnLogout.classList.add('hidden');
    showPage('page-login');
  }
});

// Aksi Tombol Mulai Simulasi (Mengecek Kode Akses Sementara)
btnLogin.addEventListener('click', () => {
    const kode = document.getElementById('kodeAkses').value;
    
    // Nanti logika validasi kode kita buat lebih canggih pakai Firebase
    if(kode.trim() === "") {
        alert("Silakan masukkan Kode Akses terlebih dahulu!");
        return;
    }

    btnLogin.innerText = "Memeriksa...";
    // Simulasi loading 1 detik, lalu pindah ke halaman personalisasi
    setTimeout(() => {
        btnLogin.innerText = "Mulai Simulasi";
        showPage('page-personalisasi');
    }, 1000);
});

// Aksi Tombol Simpan Profil (Menuju Dasbor Utama)
document.getElementById('btnSimpanProfil').addEventListener('click', () => {
    // Mengambil data pilihan jamaah (Laki/Perempuan dan Rute)
    const userGender = document.querySelector('input[name="gender"]:checked').value;
    const userRute = document.querySelector('input[name="rute"]:checked').value;
    
    // Menyimpan data secara lokal di browser jamaah
    localStorage.setItem('userGender', userGender);
    localStorage.setItem('userRute', userRute);
    
    // Lanjut ke dasbor
    showPage('page-dashboard');
});

btnLogout.addEventListener('click', () => {
  signOut(auth);
});