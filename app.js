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

// KAMUS LENGKAP (Termasuk Dalil Pop-up & Catatan Samping)
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
        law_desc: "Terdapat perbedaan pendapat ulama terkait wajib tidaknya umrah. Namun, kami mengambil pendapat Imam Syafi'i, Imam Ahmad, dan mayoritas Sahabat bahwa hukum umrah adalah <b>Wajib sekali seumur hidup bagi yang mampu</b>.",
        law_evidence_title: "Dalil Kewajiban (Klik untuk detail):",
        law_ev1_btn: "📖 Hadits Aisyah radhiyallahu 'anha", law_ev2_btn: "📖 Hadits Jibril ('Umar bin Khattab)", law_ev3_btn: "📖 Perkataan Ibnu Abbas",
        syarat_title: "Syarat Wajib Umrah",
        syarat_desc: "Yang dimaksud syarat wajib umrah adalah: <b>ketika seseorang sudah terpenuhi padanya lima syarat di bawah ini, maka wajib baginya untuk melaksanakan ibadah umrah.</b>",
        note_title: "📌 Yang perlu diingat",
        note_1: "Umrah dapat dikerjakan kapan saja sepanjang tahun.",
        note_2: "<b>Rukun umrah:</b> ihram, thawaf, sa'i, bercukur, dan tertib. Bila ditinggalkan, umrah tidak sah.",
        note_3: "<b>Wajib umrah:</b> berihram dari miqat dan menjauhi larangan ihram. Bila dilanggar, wajib membayar dam.",
        doa_title: "Kumpulan Doa", kuis_title: "Kuis Pemahaman",
        
        // Data Isi Modal Dalil
        modal_aisyah_title: "Hadits Aisyah",
        modal_aisyah_trans: "Aku bertanya, 'Wahai Rasulullah, apakah ada kewajiban jihad bagi para wanita?' Beliau menjawab: 'Ya, atas mereka ada jihad yang tidak ada peperangan di dalamnya, yaitu Haji dan Umrah.'",
        modal_aisyah_ref: "HR. Ibnu Majah (2901), dishahihkan oleh Al-Albani",
        modal_jibril_title: "Hadits Jibril",
        modal_jibril_trans: "Islam adalah engkau bersaksi bahwa tidak ada tuhan yang berhak disembah selain Allah dan Muhammad adalah utusan Allah, mendirikan salat, menunaikan zakat, berhaji ke Baitullah dan berumrah, mandi junub, menyempurnakan wudhu, dan berpuasa Ramadan.",
        modal_jibril_ref: "HR. Ad-Daraquthni, isnad shahih",
        modal_abbas_title: "Perkataan Ibnu Abbas",
        modal_abbas_trans: "Sesungguhnya umrah adalah qarinah (gandengan) fardhu haji di dalam Kitabullah (Al-Baqarah: 196).",
        modal_abbas_ref: "HR. Bukhari"
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
        law_evidence_title: "Evidence for Obligation (Click for details):",
        law_ev1_btn: "📖 Hadith of Aisha", law_ev2_btn: "📖 Hadith of Jibril", law_ev3_btn: "📖 Statement of Ibn Abbas",
        syarat_title: "Conditions for Obligation",
        syarat_desc: "The meaning of conditions for obligation is: <b>when a person fulfills these five conditions below, it becomes obligatory for them to perform Umrah.</b>",
        note_title: "📌 Things to remember",
        note_1: "Umrah can be performed at any time throughout the year.",
        note_2: "<b>Pillars of Umrah:</b> ihram, tawaf, sa'i, shaving, and sequence. If missed, Umrah is invalid.",
        note_3: "<b>Obligations of Umrah:</b> entering ihram from miqat and avoiding prohibitions. If violated, a penalty (dam) is required.",
        doa_title: "Prayers", kuis_title: "Quiz",
        
        modal_aisyah_title: "Hadith of Aisha",
        modal_aisyah_trans: "I asked, 'O Messenger of Allah, is jihad obligatory upon women?' He said: 'Yes, upon them is a jihad in which there is no fighting: Hajj and Umrah.'",
        modal_aisyah_ref: "Sunan Ibn Majah (2901), authenticated by Al-Albani",
        modal_jibril_title: "Hadith of Jibril",
        modal_jibril_trans: "Islam is to testify that there is no deity worthy of worship except Allah and Muhammad is His messenger, establish prayer, pay zakat, perform Hajj to the House and Umrah...",
        modal_jibril_ref: "Narrated by Ad-Daraquthni, authentic chain",
        modal_abbas_title: "Statement of Ibn Abbas",
        modal_abbas_trans: "Verily, Umrah is the companion of the obligatory Hajj in the Book of Allah (Al-Baqarah: 196).",
        modal_abbas_ref: "Sahih Al-Bukhari"
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
        law_evidence_title: "أدلة الوجوب (انقر للتفاصيل):",
        law_ev1_btn: "📖 حديث عائشة رضي الله عنها", law_ev2_btn: "📖 حديث جبريل (عمر بن الخطاب)", law_ev3_btn: "📖 قول ابن عباس",
        syarat_title: "شروط الوجوب",
        syarat_desc: "المقصود بشروط الوجوب: <b>إذا تحققت في الشخص هذه الشروط الخمسة أدناه، وجب عليه أداء العمرة.</b>",
        note_title: "📌 أمور يجب تذكرها",
        note_1: "يمكن أداء العمرة في أي وقت طوال العام.",
        note_2: "<b>أركان العمرة:</b> الإحرام، الطواف، السعي، الحلق، والترتيب. إذا تُرك أحدها بطلت العمرة.",
        note_3: "<b>واجبات العمرة:</b> الإحرام من الميقات واجتناب المحظورات. إذا خولفت وجب الدم.",
        doa_title: "الأدعية", kuis_title: "الاختبار",

        modal_aisyah_title: "حديث عائشة",
        modal_aisyah_trans: "قُلْتُ يَا رَسُولَ اللَّهِ عَلَى النِّسَاءِ جِهَادٌ ؟ قَالَ: نَعَمْ ، عَلَيْهِنَّ جِهَادٌ لا قِتَالَ فِيهِ الْحَجُّ وَالْعُمْرَةُ.",
        modal_aisyah_ref: "رواه ابن ماجه (2901) وصححه الألباني",
        modal_jibril_title: "حديث جبريل",
        modal_jibril_trans: "الإسلام أن تشهد أن لا إله إلا الله وأن محمدا رسول الله، وتقيم الصلاة، وتؤتي الزكاة، وتحج البيت وتعتمر...",
        modal_jibril_ref: "رواه الدارقطني بإسناد صحيح",
        modal_abbas_title: "قول ابن عباس",
        modal_abbas_trans: "إِنَّهَا لَقَرِينَتُهَا فِي كِتَابِ اللَّهِ (وَأَتِمُّوا الْحَجَّ وَالْعُمْرَةَ لِلَّهِ).",
        modal_abbas_ref: "رواه البخاري"
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

// LOGIKA TAMPIL HALAMAN
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
        setTimeout(() => { btnLogin.innerText = "Mulai Simulasi"; showPage('page-dashboard'); }, 800);
    });
}

// DATA ARABIC DALIL (Konstan)
const arabicTexts = {
    aisyah: "عَنْ عَائِشَةَ قَالَتْ : قُلْتُ يَا رَسُولَ اللَّهِ عَلَى النِّسَاءِ جِهَادٌ ؟ قَالَ: نَعَمْ ، عَلَيْهِنَّ جِهَادٌ لا قِتَالَ فِيهِ الْحَجُّ وَالْعُمْرَةُ",
    jibril: "الإسلام أن تشهد أن لا إله إلا الله وأن محمدا رسول الله، وتقيم الصلاة، وتؤتي الزكاة، وتحج البيت وتعتمر، وتغتسل من الجنابة، وتتم الوضوء، وتصوم رمضان",
    abbas: "إِنَّهَا لَقَرِينَتُهَا فِي كِتَابِ اللَّهِ (وَأَتِمُّوا الْحَجَّ وَالْعُمْرَةَ لِلَّهِ)"
};

// LOGIKA MODAL DALIL
window.openDalilModal = function(id) {
    const lang = localStorage.getItem('userLang') || 'id';
    
    document.getElementById('modalTitle').innerText = translations[lang][`modal_${id}_title`];
    document.getElementById('modalArabic').innerText = arabicTexts[id];
    document.getElementById('modalTranslation').innerText = translations[lang][`modal_${id}_trans`];
    document.getElementById('modalRef').innerText = translations[lang][`modal_${id}_ref`];
    
    document.getElementById('dalilModal').classList.remove('hidden');
}

window.closeDalilModal = function() {
    document.getElementById('dalilModal').classList.add('hidden');
}

// SUARA AI
window.playAudio = function(section) {
    if ('speechSynthesis' in window) {
        speechSynthesis.cancel(); 
        const lang = localStorage.getItem('userLang') || 'id';
        let text = "";
        
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

const btnDarkMode = document.getElementById('btnDarkMode');
if (btnDarkMode) {
    btnDarkMode.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        btnDarkMode.innerText = document.documentElement.classList.contains('dark') ? "☀️" : "🌙";
    });
}

onAuthStateChanged(auth, (user) => {
    const savedLang = localStorage.getItem('userLang') || 'id';
    changeLanguage(savedLang);
    if (user) { showPage('page-dashboard'); } else { showPage('page-login'); }
});