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

const btnLogin = document.getElementById('btnMulaiSimulasi');

// FUNGSI ROUTING UTAMA (Berpindah Halaman)
window.showPage = function(pageId) {
    const pages = [
        'page-login', 'page-personalisasi', 'page-dashboard', 
        'page-modul-umrah', 'page-doa', 'page-kuis', 
        'page-miqat', 'page-tawaf', 'page-sai', 'page-tahalul'
    ];
    
    // Sembunyikan semua section
    pages.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden');
    });
    
    // Tampilkan section target
    const target = document.getElementById(pageId);
    if (target) target.classList.remove('hidden');

    // Atur visibilitas Sidebar dan Header
    const sidebar = document.querySelector('aside');
    const header = document.querySelector('header');
    
    if (pageId === 'page-login' || pageId === 'page-personalisasi') {
        if (sidebar) sidebar.classList.replace('md:flex', 'md:hidden');
        if (header) header.classList.add('hidden');
    } else {
        if (sidebar) sidebar.classList.replace('md:hidden', 'md:flex');
        if (header) header.classList.remove('hidden');
    }

    // Scroll ke atas dengan halus
    const mainContent = document.getElementById('main-content');
    if(mainContent) {
        mainContent.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// FITUR DARK MODE TAHAP LANJUT
const btnDarkMode = document.getElementById('btnDarkMode');
if (btnDarkMode) {
    // Setel Ikon saat halaman pertama dimuat
    if(document.documentElement.classList.contains('dark')) {
        btnDarkMode.innerText = "☀️";
    }

    btnDarkMode.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        btnDarkMode.innerText = document.documentElement.classList.contains('dark') ? "☀️" : "🌙";
    });
}

// FUNGSI UPDATE UI BERDASARKAN PROFIL
function perbaruiDashboardUI() {
    const gender = localStorage.getItem('userGender') || 'laki-laki';
    const rute = localStorage.getItem('userRute') || 'madinah';
    
    // Kapitalisasi huruf pertama (Laki-laki / Perempuan)
    const genderTeks = gender.charAt(0).toUpperCase() + gender.slice(1);
    
    // Rute teks (Dari Madinah / Langsung Jeddah)
    const ruteTeks = rute === 'madinah' ? 'Dari Madinah (Bir Ali)' : 'Langsung ke Makkah';
    
    // Perbarui teks di Peta Modul Umrah
    const teksProfilModul = document.getElementById('teksProfilModul');
    if (teksProfilModul) {
        teksProfilModul.innerText = `${genderTeks}, ${ruteTeks}`;
    }
}

// AKSI TOMBOL LOGIN (CEK KODE)
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
        const selectedGender = document.querySelector('input[name="gender"]:checked');
        const selectedRute = document.querySelector('input[name="rute"]:checked');
        
        if(selectedGender && selectedRute) {
            localStorage.setItem('userGender', selectedGender.value);
            localStorage.setItem('userRute', selectedRute.value);
            
            perbaruiDashboardUI();
            showPage('page-dashboard');
        }
    });
}

// FITUR KUIS
window.cekKuis = function() {
    const q1 = document.querySelector('input[name="q1"]:checked');
    const hasilDiv = document.getElementById('hasilKuis');
    
    if (!q1) {
        hasilDiv.className = "mt-4 p-4 rounded-xl font-bold text-center bg-yellow-100 text-yellow-800 border border-yellow-300 block";
        hasilDiv.innerHTML = "Harap jawab pertanyaan terlebih dahulu!";
        return;
    }
    
    if (q1.value === 'benar') {
        hasilDiv.className = "mt-4 p-4 rounded-xl font-bold text-center bg-emerald-100 text-emerald-800 border border-emerald-300 block";
        hasilDiv.innerHTML = "Luar Biasa! Jawaban Anda Benar.";
    } else {
        hasilDiv.className = "mt-4 p-4 rounded-xl font-bold text-center bg-red-100 text-red-800 border border-red-300 block";
        hasilDiv.innerHTML = "Jawaban kurang tepat. Mari pelajari lagi!";
    }
}

// JALANKAN SAAT HALAMAN DIMUAT (CEK SESI)
onAuthStateChanged(auth, (user) => {
    if (user) {
        if (btnLogin) btnLogin.innerText = "Mulai Simulasi";
        perbaruiDashboardUI(); 
        showPage('page-dashboard');
    } else {
        // Jika belum ada user Firebase, mulai dari awal
        showPage('page-login');
    }
});