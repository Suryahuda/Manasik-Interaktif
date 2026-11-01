import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// KONFIGURASI FIREBASE
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

// ELEMEN UI UTAMA
const btnLogin = document.getElementById('btnMulaiSimulasi');
const btnLogout = document.getElementById('btnLogout'); // Jika nanti tombol logout ditambahkan kembali

// FUNGSI ROUTING (BERPINDAH HALAMAN & ATUR SIDEBAR)
window.showPage = function(pageId) {
    const pages = ['page-login', 'page-personalisasi', 'page-dashboard', 'page-doa', 'page-kuis', 'page-miqat', 'page-tawaf', 'page-sai', 'page-tahalul'];
    
    // Sembunyikan semua halaman
    pages.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden');
    });
    
    // Tampilkan halaman yang dituju
    const target = document.getElementById(pageId);
    if (target) target.classList.remove('hidden');

    // Atur visibilitas Sidebar dan Header (Sembunyikan di halaman Login & Personalisasi)
    const sidebar = document.querySelector('aside');
    const header = document.querySelector('header');
    if (pageId === 'page-login' || pageId === 'page-personalisasi') {
        if (sidebar) sidebar.classList.replace('md:flex', 'md:hidden');
        if (header) header.classList.add('hidden');
    } else {
        if (sidebar) sidebar.classList.replace('md:hidden', 'md:flex');
        if (header) header.classList.remove('hidden');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// FITUR DARK MODE (MODE GELAP)
const btnDarkMode = document.getElementById('btnDarkMode');
if (btnDarkMode) {
    btnDarkMode.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        btnDarkMode.innerText = document.documentElement.classList.contains('dark') ? "☀️" : "🌙";
    });
}

// FUNGSI UPDATE UI DASBOR (PERSONALISASI)
function perbaruiDashboardUI() {
    const gender = localStorage.getItem('userGender') || 'laki-laki';
    const rute = localStorage.getItem('userRute') || 'madinah';
    
    // Nanti kita akan hubungkan ini dengan ID elemen di Dasbor yang baru
    // Untuk saat ini, fungsi ini menyimpan data ke memori lokal
}

// AKSI TOMBOL MULAI SIMULASI (CEK KODE)
if (btnLogin) {
    btnLogin.addEventListener('click', () => {
        const kode = document.getElementById('kodeAkses').value;
        
        if (kode.trim() === "") {
            alert("Silakan masukkan Kode Akses terlebih dahulu!");
            return;
        }

        btnLogin.innerText = "Memeriksa...";
        setTimeout(() => {
            btnLogin.innerText = "Mulai Simulasi";
            showPage('page-personalisasi');
        }, 1000);
    });
}

// AKSI TOMBOL SIMPAN PROFIL
const btnSimpanProfil = document.getElementById('btnSimpanProfil');
if (btnSimpanProfil) {
    btnSimpanProfil.addEventListener('click', () => {
        const userGender = document.querySelector('input[name="gender"]:checked').value;
        const userRute = document.querySelector('input[name="rute"]:checked').value;
        
        localStorage.setItem('userGender', userGender);
        localStorage.setItem('userRute', userRute);
        
        perbaruiDashboardUI();
        showPage('page-dashboard');
    });
}

// FITUR KUIS
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
        hasilDiv.className = "mt-4 p-4 rounded-xl font-bold text-center bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 border border-emerald-300 block";
        hasilDiv.innerHTML = "Luar Biasa! Skor Anda 100. Anda sudah siap secara keilmuan!";
    } else {
        hasilDiv.className = "mt-4 p-4 rounded-xl font-bold text-center bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 border border-red-300 block";
        hasilDiv.innerHTML = `Skor Anda ${skor}. Mari pelajari lagi panduan manasik di dasbor utama.`;
    }
}

// PANTAU SESI LOGIN FIREBASE
onAuthStateChanged(auth, (user) => {
    if (user) {
        if (btnLogin) btnLogin.innerText = "Mulai Simulasi";
        perbaruiDashboardUI(); 
        showPage('page-dashboard');
    } else {
        showPage('page-login');
    }
});

// LOGOUT
if (btnLogout) {
    btnLogout.addEventListener('click', () => {
        signOut(auth);
    });
}