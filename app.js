import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBJ8U8SCUQaJCNt6NkiolsRN_VP-r0I1Ps",
    authDomain: "manasik-umrah-interaktif.firebaseapp.com",
    projectId: "manasik-umrah-interaktif",
    storageBucket: "manasik-umrah-interaktif.firebasestorage.app",
    messagingSenderId: "698727319813",
    appId: "1:698727319813:web:9ac9dd6c10a4036932cf6c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const btnLogin = document.getElementById('btnMulaiSimulasi');

// KAMUS MULTI-BAHASA LENGKAP TERMASUK FITUR KUIS & DOA
const translations = {
    id: {
        menu_dashboard: "Dashboard", menu_modul: "Modul Umrah", menu_doa: "Kumpulan Doa", menu_kuis: "Kuis Pemahaman",
        portal_title: "Portal Manasik", login_subtitle: "Platform Manasik Interaktif",
        login_quote: '"Berilmu sebelum berucap dan beramal."', login_desc: "Masukkan Kode Akses dari agen travel Anda.",
        btn_start: "Mulai Simulasi", dash_hero_title: "Manasik Virtual", dash_hero_desc: "Berlatih umrah langkah demi langkah.",
        dash_choose_title: "Pilih ibadah yang dipelajari", umrah_title: "Umrah", umrah_card_desc: "Panduan interaktif lengkap.",
        btn_start_umrah: "Mulai umrah", btn_back_dash: "Kembali", umrah_map_title: "Perjalanan Umrah",
        card1_title: "1. Mengenal Umrah", card1_desc: "Pondasi, hukum, dan rukun.", btn_back_map: "Kembali ke Peta Modul",
        materi1_subtitle: "Memahami pondasi awal, hukum, dan rukun sebelum melaksanakan ibadah umrah.",
        def_title: "Memahami Makna Umrah", def_lang_title: "Secara Bahasa", def_lang_desc: "Umrah berarti Az-Ziarah, yaitu berkunjung atau berziarah.",
        def_term_title: "Secara Istilah", def_term_desc: "Mengunjungi Masjidil Haram untuk melaksanakan amalan khusus dalam rangka mendekatkan diri kepada Allah.",
        law_title: "Hukum Umrah", btn_listen: "Dengarkan AI",
        law_desc: "Terdapat perbedaan pendapat ulama terkait wajib tidaknya umrah (Imam Abu Hanifah dan Malik berpendapat sunnah). Namun, kami mengambil pendapat Imam Syafi'i, Imam Ahmad, dan mayoritas Sahabat bahwa hukum umrah adalah <b>Wajib sekali seumur hidup bagi yang mampu</b>.",
        law_evidence_title: "Dalil Kewajiban:",
        law_ev1: "<b>Hadits Aisyah:</b> 'Ya, atas mereka ada jihad tanpa peperangan: Haji dan Umrah.'",
        law_ev2: "<b>Hadits Jibril:</b> '...berhaji ke Baitullah dan berumrah...'",
        law_ev3: "<b>Perkataan Ibnu Abbas:</b> 'Umrah adalah qarinah fardhu haji di Kitabullah.'",
        syarat_title: "Syarat Wajib Umrah", pillars_title: "Rukun Umrah",
        pillar_1: "Ihram", pillar_2: "Tawaf", pillar_3: "Sa'i", pillar_4: "Tahallul", pillar_5: "Tertib",
        doa_title: "Kumpulan Doa", kuis_title: "Kuis Pemahaman"
    },
    en: {
        menu_dashboard: "Dashboard", menu_modul: "Umrah Modules", menu_doa: "Prayers", menu_kuis: "Quiz",
        portal_title: "Manasik Portal", login_subtitle: "Interactive Manasik Platform",
        login_quote: '"Knowledge precedes words and deeds."', login_desc: "Enter your Access Code to begin.",
        btn_start: "Start Simulation", dash_hero_title: "Virtual Manasik", dash_hero_desc: "Practice Umrah step-by-step.",
        dash_choose_title: "Select ritual to study", umrah_title: "Umrah", umrah_card_desc: "Complete interactive guide.",
        btn_start_umrah: "Start Umrah", btn_back_dash: "Go Back", umrah_map_title: "Umrah Journey",
        card1_title: "1. Introduction to Umrah", card1_desc: "Foundations, rulings, and pillars.", btn_back_map: "Back to Map",
        materi1_subtitle: "Understanding the basic foundations, rulings, and pillars before performing Umrah.",
        def_title: "Understanding Umrah", def_lang_title: "Linguistically", def_lang_desc: "Umrah means Az-Ziarah, which is to visit.",
        def_term_title: "Terminologically", def_term_desc: "Visiting Masjid al-Haram to perform specific rituals to draw closer to Allah.",
        law_title: "Ruling on Umrah", btn_listen: "Listen to AI",
        law_desc: "Scholars differ on whether Umrah is obligatory. However, we adopt the view of Shafi'i, Ahmad, and the majority of Companions that Umrah is <b>Obligatory once in a lifetime for those able</b>.",
        law_evidence_title: "Evidence for Obligation:",
        law_ev1: "<b>Hadith of Aisha:</b> 'Yes, upon them is a jihad with no fighting: Hajj and Umrah.'",
        law_ev2: "<b>Hadith of Jibril:</b> '...perform Hajj to the House and Umrah...'",
        law_ev3: "<b>Ibn Abbas:</b> 'Umrah is the companion of Hajj in the Book of Allah.'",
        syarat_title: "Conditions for Umrah", pillars_title: "Pillars of Umrah",
        pillar_1: "Ihram", pillar_2: "Tawaf", pillar_3: "Sa'i", pillar_4: "Tahallul", pillar_5: "Order",
        doa_title: "Prayers", kuis_title: "Quiz"
    },
    ar: {
        menu_dashboard: "لوحة التحكم", menu_modul: "وحدات العمرة", menu_doa: "مجموعة الأدعية", menu_kuis: "الاختبار",
        portal_title: "بوابة المناسك", login_subtitle: "منصة المناسك التفاعلية",
        login_quote: '"العلم قبل القول والعمل"', login_desc: "أدخل رمز الوصول الخاص بك للبدء.",
        btn_start: "بدء المحاكاة", dash_hero_title: "المناسك الافتراضية", dash_hero_desc: "تدرب على العمرة خطوة بخطوة.",
        dash_choose_title: "اختر العبادة للتعلم", umrah_title: "العمرة", umrah_card_desc: "دليل تفاعلي شامل.",
        btn_start_umrah: "بدء العمرة", btn_back_dash: "رجوع", umrah_map_title: "رحلة العمرة",
        card1_title: "١. التعرف على العمرة", card1_desc: "الأسس، الأحكام، والأركان.", btn_back_map: "العودة للخريطة",
        materi1_subtitle: "فهم الأسس والأحكام والأركان قبل أداء مناسك العمرة.",
        def_title: "معنى العمرة", def_lang_title: "لغة", def_lang_desc: "العمرة تعني الزيارة.",
        def_term_title: "اصطلاحاً", def_term_desc: "زيارة المسجد الحرام لأداء مناسك مخصوصة تقرباً إلى الله.",
        law_title: "حكم العمرة", btn_listen: "استمع",
        law_desc: "اختلف العلماء في وجوبها. لكننا نأخذ بقول الشافعي وأحمد وجمهور الصحابة أن العمرة <b>واجبة مرة في العمر على المستطيع</b>.",
        law_evidence_title: "أدلة الوجوب:",
        law_ev1: "<b>حديث عائشة:</b> (نَعَمْ ، عَلَيْهِنَّ جِهَادٌ لا قِتَالَ فِيهِ الْحَجُّ وَالْعُمْرَةُ).",
        law_ev2: "<b>حديث جبريل:</b> (...وتحج البيت وتعتمر).",
        law_ev3: "<b>قول ابن عباس:</b> (إنها لقرينتها في كتاب الله).",
        syarat_title: "شروط العمرة", pillars_title: "أركان العمرة",
        pillar_1: "الإحرام", pillar_2: "الطواف", pillar_3: "السعي", pillar_4: "التحلل", pillar_5: "الترتيب",
        doa_title: "الأدعية", kuis_title: "الاختبار"
    }
};

window.changeLanguage = function(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.innerHTML = translations[lang][key]; 
        }
    });
    if (lang === 'ar') document.documentElement.setAttribute('dir', 'rtl');
    else document.documentElement.removeAttribute('dir');

    ['id', 'en', 'ar'].forEach(l => {
        const btn = document.getElementById(`lang-${l}`);
        if (btn) btn.className = l === lang 
            ? "px-2.5 py-1 rounded-lg bg-white dark:bg-luxury-800 text-slate-900 dark:text-white shadow-sm transition font-bold" 
            : "px-2.5 py-1 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white transition font-normal";
    });
    localStorage.setItem('userLang', lang);
}

// ROUTING LENGKAP SEMUA 11 HALAMAN BESERTA FITURNYA
window.showPage = function(pageId) {
    const pages = [
        'page-login', 'page-dashboard', 'page-modul-umrah', 
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
    if (pageId === 'page-login') {
        if (sidebar) sidebar.classList.replace('md:flex', 'md:hidden');
        if (header) header.classList.add('hidden');
    } else {
        if (sidebar) sidebar.classList.replace('md:hidden', 'md:flex');
        if (header) header.classList.remove('hidden');
    }
    
    const mainContent = document.getElementById('main-content');
    if(mainContent) mainContent.scrollTo({ top: 0, behavior: 'smooth' });
}

// LOGIKA LOGIN
if (btnLogin) {
    btnLogin.addEventListener('click', () => {
        const kode = document.getElementById('kodeAkses').value;
        if (kode.trim() === "") { alert("Silakan masukkan Kode Akses terlebih dahulu!"); return; }
        btnLogin.innerText = "Memeriksa...";
        setTimeout(() => {
            btnLogin.innerText = "Mulai Simulasi";
            showPage('page-dashboard');
        }, 800);
    });
}

// LOGIKA KUIS
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
        hasilDiv.innerText = "Jawaban Anda Benar!";
    }
}

// FITUR AI TEXT-TO-SPEECH (SUARA)
window.playAudio = function(section) {
    if ('speechSynthesis' in window) {
        speechSynthesis.cancel(); 
        const lang = localStorage.getItem('userLang') || 'id';
        let text = "";
        
        // Membersihkan tag HTML (seperti <b>) sebelum dibaca oleh AI
        if(section === 'hukum') {
            const rawText = translations[lang].law_desc;
            text = rawText.replace(/<[^>]*>?/gm, ''); 
        }
        
        const utterance = new SpeechSynthesisUtterance(text);
        if(lang === 'id') utterance.lang = 'id-ID';
        if(lang === 'en') utterance.lang = 'en-US';
        if(lang === 'ar') utterance.lang = 'ar-SA';
        
        utterance.rate = 0.95; 
        speechSynthesis.speak(utterance);
    } else {
        alert("Mohon maaf, browser Anda tidak mendukung fitur suara AI.");
    }
}

// FITUR DARK MODE
const btnDarkMode = document.getElementById('btnDarkMode');
if (btnDarkMode) {
    btnDarkMode.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        btnDarkMode.innerText = document.documentElement.classList.contains('dark') ? "☀️" : "🌙";
    });
}

// INISIALISASI
onAuthStateChanged(auth, (user) => {
    const savedLang = localStorage.getItem('userLang') || 'id';
    changeLanguage(savedLang);
    if (user) { showPage('page-dashboard'); } 
    else { showPage('page-login'); }
});