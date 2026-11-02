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

// KAMUS MULTI-BAHASA (ID, EN, AR)
const translations = {
    id: {
        menu_dashboard: "Dashboard", menu_modul: "Modul Umrah", menu_doa: "Kumpulan Doa", menu_kuis: "Kuis Pemahaman",
        portal_title: "Portal Manasik", app_title: "MUYASSAR Pro", login_subtitle: "Platform Manasik Interaktif",
        login_quote: '"Berilmu sebelum berucap dan beramal."', login_desc: "Silakan masukkan Kode Akses dari agen travel Anda untuk memulai simulasi.",
        btn_start: "Mulai Simulasi", pers_title: "Sesuaikan Panduan Anda", pers_desc: "Pilih profil agar sistem dapat menyesuaikan instruksi rukun dan sunnah khusus untuk Anda.",
        pers_gender: "Jenis Kelamin", gender_male: "Laki-laki", gender_female: "Perempuan", pers_route: "Rute Keberangkatan",
        route_madinah: "Dari Madinah (Bir Ali)", route_jeddah: "Langsung ke Makkah", btn_save: "Simpan & Lanjutkan",
        dash_hero_title: "Manasik Virtual", dash_hero_desc: "Berlatih umrah dan haji langkah demi langkah: berihram di miqat, thawaf, sa'i, sampai tahalul.",
        btn_audio: "▶ Dengarkan QS al-Hajj ayat 27", dash_choose_title: "Pilih ibadah yang ingin dipelajari",
        umrah_card_desc: "Ihram, thawaf, sa'i, dan tahallul. Dapat dikerjakan sepanjang tahun.", btn_start_umrah: "Mulai umrah",
        btn_coming_soon: "Segera Hadir", btn_back_dash: "Kembali ke Dashboard", umrah_map_title: "Perjalanan Umrah",
        doa_title: "Kumpulan Doa", kuis_title: "Kuis Pemahaman"
    },
    en: {
        menu_dashboard: "Dashboard", menu_modul: "Umrah Modules", menu_doa: "Prayers Collection", menu_kuis: "Quiz",
        portal_title: "Manasik Portal", app_title: "MUYASSAR Pro", login_subtitle: "Interactive Manasik Platform",
        login_quote: '"Knowledge precedes words and deeds."', login_desc: "Please enter the Access Code from your travel agency to begin simulation.",
        btn_start: "Start Simulation", pers_title: "Customize Your Guide", pers_desc: "Select your profile to customize rituals and sunnah guidance specifically for you.",
        pers_gender: "Gender", gender_male: "Male", gender_female: "Female", pers_route: "Departure Route",
        route_madinah: "From Madinah (Bir Ali)", route_jeddah: "Direct to Makkah", btn_save: "Save & Continue",
        dash_hero_title: "Virtual Manasik", dash_hero_desc: "Practice Umrah step-by-step: ihram at miqat, tawaf, sa'i, to tahallul.",
        btn_audio: "▶ Listen to Surah Al-Hajj: 27", dash_choose_title: "Select ritual to study",
        umrah_card_desc: "Ihram, tawaf, sa'i, and tahallul. Available year-round.", btn_start_umrah: "Start Umrah",
        btn_coming_soon: "Coming Soon", btn_back_dash: "Back to Dashboard", umrah_map_title: "Umrah Journey",
        doa_title: "Prayers Collection", kuis_title: "Understanding Quiz"
    },
    ar: {
        menu_dashboard: "لوحة التحكم", menu_modul: "وحدات العمرة", menu_doa: "مجموعة الأدعية", menu_kuis: "الاختبار",
        portal_title: "بوابة المناسك", app_title: "مُيَسَّر بروفيشينال", login_subtitle: "منصة المناسك التفاعلية",
        login_quote: '"العلم قبل القول والعمل"', login_desc: "يرجى إدخال رمز الوصول المزود من وكالة السفر لبدء المحاكاة.",
        btn_start: "بدء المحاكاة", pers_title: "تخصيص الدليل الخاص بك", pers_desc: "اختر ملفك الشخصي لتكييف التعليمات الخاصة بك.",
        pers_gender: "الجنس", gender_male: "ذكر", gender_female: "أنثى", pers_route: "مسار المغادرة",
        route_madinah: "من المدينة المنورة (آبار علي)", route_jeddah: "مباشرة إلى مكة المكرمة", btn_save: "حفظ ومتابعة",
        dash_hero_title: "المناسك الافتراضية", dash_hero_desc: "تدرب على العمرة خطوة بخطوة: الإحرام من الميقات، الطواف، السعي، حتى التحلل.",
        btn_audio: "▶ الاستماع لسورة الحج: ٢٧", dash_choose_title: "اختر العبادة للتعلم",
        umrah_card_desc: "الإحرام، الطواف، السعي، والتحلل. متاحة طوال العام.", btn_start_umrah: "بدء العمرة",
        btn_coming_soon: "قريباً", btn_back_dash: "العودة إلى لوحة التحكم", umrah_map_title: "رحلة العمرة",
        doa_title: "مجموعة الأدعية", kuis_title: "اختبار الفهم"
    }
};

// FUNGSI GANTI BAHASA
window.changeLanguage = function(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.innerText = translations[lang][key];
        }
    });

    // Sesuaikan Arah Teks (RTL jika Bahasa Arab)
    if (lang === 'ar') {
        document.documentElement.setAttribute('dir', 'rtl');
    } else {
        document.documentElement.removeAttribute('dir');
    }

    // Highlight tombol bahasa aktif
    ['id', 'en', 'ar'].forEach(l => {
        const btn = document.getElementById(`lang-${l}`);
        if (btn) {
            if (l === lang) {
                btn.className = "px-2.5 py-1 rounded-lg bg-white dark:bg-luxury-800 text-slate-900 dark:text-white shadow-sm transition font-bold";
            } else {
                btn.className = "px-2.5 py-1 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white transition font-normal";
            }
        }
    });

    localStorage.setItem('userLang', lang);
}

// FUNGSI ROUTING 11 TAHAP LENGKAP
window.showPage = function(pageId) {
    const pages = [
        'page-login', 'page-personalisasi', 'page-dashboard', 'page-modul-umrah',
        'page-mengenal', 'page-persiapan-ihram', 'page-miqat', 'page-larangan-ihram',
        'page-masjidilharam', 'page-tawaf', 'page-maqam-zamzam', 'page-sai',
        'page-tahalul', 'page-tawaf-wada', 'page-selesai', 'page-doa', 'page-kuis'
    ];
    
    pages.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden');
    });
    
    const target = document.getElementById(pageId);
    if (target) target.classList.remove('hidden');

    const sidebar = document.querySelector('aside');
    const header = document.querySelector('header');
    
    if (pageId === 'page-login' || pageId === 'page-personalisasi') {
        if (sidebar) sidebar.classList.replace('md:flex', 'md:hidden');
        if (header) header.classList.add('hidden');
    } else {
        if (sidebar) sidebar.classList.replace('md:hidden', 'md:flex');
        if (header) header.classList.remove('hidden');
    }

    const mainContent = document.getElementById('main-content');
    if(mainContent) mainContent.scrollTo({ top: 0, behavior: 'smooth' });
}

// FITUR DARK MODE
const btnDarkMode = document.getElementById('btnDarkMode');
if (btnDarkMode) {
    if(document.documentElement.classList.contains('dark')) {
        btnDarkMode.innerText = "☀️";
    }

    btnDarkMode.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        btnDarkMode.innerText = document.documentElement.classList.contains('dark') ? "☀️" : "🌙";
    });
}

// UPDATE PROFIL
function perbaruiDashboardUI() {
    const gender = localStorage.getItem('userGender') || 'laki-laki';
    const rute = localStorage.getItem('userRute') || 'madinah';
    
    const genderTeks = gender.charAt(0).toUpperCase() + gender.slice(1);
    const ruteTeks = rute === 'madinah' ? 'Dari Madinah (Bir Ali)' : 'Langsung ke Makkah';
    
    const teksProfilModul = document.getElementById('teksProfilModul');
    if (teksProfilModul) {
        teksProfilModul.innerText = `${genderTeks}, ${ruteTeks}`;
    }
}

// LOGIKA LOGIN
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
        }, 800);
    });
}

// SIMPAN PROFIL
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
        hasilDiv.className = "mt-4 p-4 rounded-xl font-bold text-center bg-yellow-100 text-yellow-800 block";
        hasilDiv.innerText = "Harap jawab pertanyaan terlebih dahulu!";
        return;
    }
    
    if (q1.value === 'benar') {
        hasilDiv.className = "mt-4 p-4 rounded-xl font-bold text-center bg-emerald-100 text-emerald-800 block";
        hasilDiv.innerText = "Jawaban Anda Benar (100)!";
    }
}

// INISIALISASI
onAuthStateChanged(auth, (user) => {
    const savedLang = localStorage.getItem('userLang') || 'id';
    changeLanguage(savedLang);

    if (user) {
        perbaruiDashboardUI(); 
        showPage('page-dashboard');
    } else {
        showPage('page-login');
    }
});