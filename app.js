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

const translations = {
    id: {
        menu_dashboard: "Dashboard", menu_modul: "Modul Umrah", menu_doa: "Kumpulan Doa", menu_kuis: "Kuis Pemahaman",
        portal_title: "Portal Manasik", login_subtitle: "Platform Manasik Interaktif",
        login_quote: '"Berilmu sebelum berucap dan beramal."', login_desc: "Masukkan Kode Akses dari agen travel Anda.",
        btn_start: "Mulai Simulasi", dash_hero_title: "Manasik Virtual", dash_hero_desc: "Berlatih umrah langkah demi langkah.",
        btn_play_quran: "Dengarkan Syaikh", quran_trans_22_27: '"Dan berserulah kepada manusia untuk mengerjakan haji..."',
        dash_choose_title: "Pilih ibadah yang dipelajari", umrah_title: "Umrah", umrah_card_desc: "Panduan interaktif lengkap.",
        btn_start_umrah: "Mulai umrah", btn_back_dash: "Kembali", umrah_map_title: "Perjalanan Umrah",
        card1_title: "1. Mengenal Umrah", card1_desc: "Pondasi, hukum, dan rukun.", btn_back_map: "Kembali ke Peta Modul",
        materi1_subtitle: "Memahami pondasi awal, hukum, dan rukun sebelum melaksanakan ibadah umrah.",
        
        // CARD 2: PERSIAPAN IHRAM
        c2_title: "2. Persiapan Ihram",
        c2_desc: "Sunnah dan pakaian sebelum miqat.",
        c2_subtitle: "Mari bersiap memasuki ihram. Ihram adalah niat memulai ibadah, dan persiapannya dikerjakan sebelum tiba di miqat.",
        c2_sunnah_title: "Sunnah Sebelum Berihram",
        c2_sunnah_1: "Memotong kuku, merapikan kumis, mencabut bulu.",
        c2_sunnah_2: "Mandi besar (Ghusl) dengan niat mandi sunnah ihram.",
        c2_sunnah_3: "Memakai wewangian di badan (bukan di pakaian ihram).",
        c2_pakaian_title: "Ketentuan Pakaian Ihram",
        c2_pak_m: "Dua lembar kain putih tanpa jahitan. Kain bawah disebut <b>Izar</b> dan kain atas disebut <b>Rida'</b>. Kepala dibiarkan terbuka.",
        c2_pak_f: "Pakaian syar'i yang menutup seluruh aurat, kecuali wajah dan telapak tangan.",
        c2_game_title: "Simulasi Pakaian Ihram Laki-Laki",
        c2_game_desc: "Sekarang kenakan pakaian ihram. Sentuh perlengkapan yang benar untuk memakainya. Perlengkapan yang keliru akan dijelaskan alasannya.",
        c2_game_success: "Pakaian ihram lengkap. Anda siap berniat di miqat.",
        c2_note_1: "Mandi sunnah ihram, rapikan kuku dan rambut, pakai wewangian di badan sebelum niat.",
        c2_note_2: "Dua helai kain tanpa jahitan (izar dan rida'), kepala terbuka, sandal yang tidak menutupi mata kaki.",
        c2_note_3: "Jemaah yang terbang langsung ke Mekkah dianjurkan sudah berpakaian ihram sejak di pesawat.",
        qz2_title: "Kuis Persiapan Ihram",
    },
    en: {
        menu_dashboard: "Dashboard", menu_modul: "Umrah Modules", menu_doa: "Prayers", menu_kuis: "Quiz",
        portal_title: "Manasik Portal", login_subtitle: "Interactive Manasik Platform",
        login_quote: '"Knowledge precedes words and deeds."', login_desc: "Enter your Access Code to begin.",
        btn_start: "Start Simulation", dash_hero_title: "Virtual Manasik", dash_hero_desc: "Practice Umrah step-by-step.",
        btn_play_quran: "Listen to Sheikh", quran_trans_22_27: '"And proclaim to the people the Hajj..."',
        dash_choose_title: "Select ritual to study", umrah_title: "Umrah", umrah_card_desc: "Complete interactive guide.",
        btn_start_umrah: "Start Umrah", btn_back_dash: "Go Back", umrah_map_title: "Umrah Journey",
        card1_title: "1. Introduction", card1_desc: "Foundations, rulings, and pillars.", btn_back_map: "Back to Map",
        materi1_subtitle: "Understanding the basic foundations, rulings, and pillars.",
        
        c2_title: "2. Ihram Preparation",
        c2_desc: "Sunnahs and clothing before miqat.",
        c2_subtitle: "Let's prepare for Ihram. Ihram is the intention to start the ritual, prepared before arriving at the miqat.",
        c2_sunnah_title: "Sunnahs Before Ihram",
        c2_sunnah_1: "Clip nails, trim mustache, remove unwanted hair.",
        c2_sunnah_2: "Perform a ritual bath (Ghusl) for Ihram.",
        c2_sunnah_3: "Apply perfume on the body (not on Ihram garments).",
        c2_pakaian_title: "Ihram Clothing Rules",
        c2_pak_m: "Two seamless white cloths. The bottom is <b>Izar</b> and the top is <b>Rida'</b>. The head must remain uncovered.",
        c2_pak_f: "Syar'i clothing covering the entire aura, except face and hands.",
        c2_game_title: "Men's Ihram Simulation",
        c2_game_desc: "Now wear the Ihram. Select the correct items. Wrong items will explain why they are forbidden.",
        c2_game_success: "Ihram attire complete. You are ready for intention at miqat.",
        c2_note_1: "Perform ghusl, trim hair/nails, apply perfume on body before intention.",
        c2_note_2: "Two seamless cloths, uncovered head, sandals not covering ankles.",
        c2_note_3: "Pilgrims flying directly to Mecca are advised to wear Ihram on the plane.",
        qz2_title: "Ihram Prep Quiz",
    },
    ar: {
        menu_dashboard: "لوحة التحكم", menu_modul: "وحدات العمرة", menu_doa: "مجموعة الأدعية", menu_kuis: "الاختبار",
        portal_title: "بوابة المناسك", login_subtitle: "منصة المناسك التفاعلية",
        login_quote: '"العلم قبل القول والعمل"', login_desc: "أدخل رمز الوصول الخاص بك للبدء.",
        btn_start: "بدء المحاكاة", dash_hero_title: "المناسك الافتراضية", dash_hero_desc: "تدرب على العمرة خطوة بخطوة.",
        btn_play_quran: "استمع للشيخ", quran_trans_22_27: "",
        dash_choose_title: "اختر العبادة للتعلم", umrah_title: "العمرة", umrah_card_desc: "دليل تفاعلي شامل.",
        btn_start_umrah: "بدء العمرة", btn_back_dash: "رجوع", umrah_map_title: "رحلة العمرة",
        card1_title: "١. التعرف على العمرة", card1_desc: "الأسس، الأحكام، والأركان.", btn_back_map: "العودة للخريطة",
        materi1_subtitle: "فهم الأسس والأحكام والأركان قبل أداء مناسك العمرة.",
        
        c2_title: "٢. الاستعداد للإحرام",
        c2_desc: "السنن واللباس قبل الميقات.",
        c2_subtitle: "لنتأهب للإحرام. الإحرام هو نية الدخول في النسك.",
        c2_sunnah_title: "سنن قبل الإحرام",
        c2_sunnah_1: "تقليم الأظافر، قص الشارب، نتف الإبط وحلق العانة.",
        c2_sunnah_2: "الاغتسال (غسل الإحرام).",
        c2_sunnah_3: "التطيب في البدن (وليس في ثياب الإحرام).",
        c2_pakaian_title: "لباس الإحرام",
        c2_pak_m: "إزار ورداء أبيضان غير مخيطين. ويبقى الرأس مكشوفاً.",
        c2_pak_f: "لباس شرعي يغطي جميع البدن إلا الوجه والكفين.",
        c2_game_title: "محاكاة لباس الإحرام للرجال",
        c2_game_desc: "الآن ارتدِ الإحرام. اختر الأدوات الصحيحة.",
        c2_game_success: "اكتمل لباس الإحرام. أنت جاهز للنية في الميقات.",
        c2_note_1: "الاغتسال، تقليم الأظافر، التطيب في البدن قبل النية.",
        c2_note_2: "إزار ورداء، كشف الرأس، نعلان لا يغطيان الكعبين.",
        c2_note_3: "يُنصح من يسافر جواً مباشرة لمكة بلبس الإحرام في الطائرة.",
        qz2_title: "اختبار الاستعداد للإحرام",
    }
};

window.changeLanguage = function(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key] !== undefined) {
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
    renderMiniQuiz();
    renderMiniQuiz2();
}

window.showPage = function(pageId) {
    const pages = ['page-login', 'page-dashboard', 'page-modul-umrah', 'page-mengenal', 'page-persiapan-ihram', 'page-miqat', 'page-larangan-ihram', 'page-masjidilharam', 'page-tawaf', 'page-maqam-zamzam', 'page-sai', 'page-tahalul', 'page-tawaf-wada', 'page-selesai', 'page-doa', 'page-kuis'];
    pages.forEach(id => { const el = document.getElementById(id); if (el) el.classList.add('hidden'); });
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

if (btnLogin) {
    btnLogin.addEventListener('click', () => {
        const kode = document.getElementById('kodeAkses').value;
        if (kode.trim() === "") { alert("Silakan masukkan Kode Akses terlebih dahulu!"); return; }
        btnLogin.innerText = "Memeriksa...";
        setTimeout(() => { btnLogin.innerText = "Mulai Simulasi"; showPage('page-dashboard'); }, 800);
    });
}

// QURAN AUDIO (SYAIKH)
let quranAudio = new Audio('https://everyayah.com/data/Alafasy_128kbps/022027.mp3');
window.playQuranAudio = function() {
    if(quranAudio.paused) { quranAudio.play(); } else { quranAudio.pause(); quranAudio.currentTime = 0; quranAudio.play(); }
}

const arabicTexts = {
    aisyah: "عَنْ عَائِشَةَ قَالَتْ : قُلْتُ يَا رَسُولَ اللَّهِ عَلَى النِّسَاءِ جِهَادٌ...",
    jibril: "الإسلام أن تشهد أن لا إله إلا الله وأن محمدا رسول الله...",
    k1: "الْعُمْرَةُ إِلَى الْعُمْرَةِ كَفَّارَةٌ لِمَا بَيْنَهُمَا...",
    k2: "الْغَازِى فِى سَبِيلِ اللَّهِ وَالْحَاجُّ وَالْمُعْتَمِرُ وَفْدُ اللَّهِ..."
};

window.openDalilModal = function(id) {
    const lang = localStorage.getItem('userLang') || 'id';
    document.getElementById('modalTitle').innerText = translations[lang][`modal_${id}_title`] || "Dalil";
    document.getElementById('modalArabic').innerText = arabicTexts[id] || "";
    document.getElementById('modalTranslation').innerText = translations[lang][`modal_${id}_trans`] || "";
    document.getElementById('dalilModal').classList.remove('hidden');
}
window.closeDalilModal = function() { document.getElementById('dalilModal').classList.add('hidden'); }

// ============================================
// GAME INTERAKTIF (PERSIAPAN IHRAM)
// ============================================
let ihramItems = { izar: false, rida: false, sandal: false, sabuk: false };

window.toggleIhramItem = function(item) {
    ihramItems[item] = !ihramItems[item];
    const btn = document.getElementById(`btn-${item}`);
    const svg = document.getElementById(`svg-${item}`);
    const err = document.getElementById('game-error');
    
    err.classList.add('hidden'); // Hilangkan error jika klik yg benar

    if (ihramItems[item]) {
        btn.classList.replace('border-slate-200', 'border-emerald-500');
        btn.classList.replace('dark:border-luxury-700', 'dark:border-emerald-500');
        btn.classList.add('bg-emerald-50', 'dark:bg-emerald-900/30');
        svg.classList.remove('hidden');
        if (item === 'sandal') document.getElementById('svg-sandal2').classList.remove('hidden');
    } else {
        btn.classList.replace('border-emerald-500', 'border-slate-200');
        btn.classList.replace('dark:border-emerald-500', 'dark:border-luxury-700');
        btn.classList.remove('bg-emerald-50', 'dark:bg-emerald-900/30');
        svg.classList.add('hidden');
        if (item === 'sandal') document.getElementById('svg-sandal2').classList.add('hidden');
    }

    // Cek kelengkapan
    if (ihramItems.izar && ihramItems.rida && ihramItems.sandal) {
        document.getElementById('game-success').classList.remove('hidden');
    } else {
        document.getElementById('game-success').classList.add('hidden');
    }
}

window.checkWrongIhram = function(item, msg) {
    const btn = document.getElementById(`btn-${item}`);
    const err = document.getElementById('game-error');
    
    err.innerText = "❌ " + msg;
    err.classList.remove('hidden');

    // Visual feedback merah sekejap
    btn.classList.add('bg-rose-100', 'border-rose-500', 'text-rose-800');
    setTimeout(() => {
        btn.classList.remove('bg-rose-100', 'border-rose-500', 'text-rose-800');
    }, 1000);
}

window.resetIhramGame = function() {
    ['izar', 'rida', 'sandal', 'sabuk'].forEach(i => {
        ihramItems[i] = true; 
        toggleIhramItem(i); 
    });
    document.getElementById('game-error').classList.add('hidden');
}


// ============================================
// KUIS MINI 1 (MENGENAL UMRAH)
// ============================================
const masterQuizBank = [
    { type: "tf", term: "Umrah boleh dilakukan kapan saja.", ans: "true", expl: "Umrah dapat dikerjakan sepanjang tahun." },
    { type: "rw", term: "Sa'i", ans: "rukun", expl: "Berjalan antara Shafa dan Marwah." },
    { type: "rw", term: "Bercukur (Tahallul)", ans: "rukun", expl: "Tanda berakhirnya ihram." }
];
let activeQuiz = [];
let mqIdx = 0;

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

window.ulangiKuisMini = function() {
    activeQuiz = shuffle([...masterQuizBank]).slice(0, 3);
    mqIdx = 0;
    renderMiniQuiz();
}

window.renderMiniQuiz = function() {
    if(activeQuiz.length === 0) activeQuiz = shuffle([...masterQuizBank]).slice(0, 3);
    if(mqIdx >= activeQuiz.length) {
        document.getElementById('qz-card').innerHTML = `<h4 class="text-2xl font-bold text-slate-900">Kuis Selesai! 🎉</h4>`;
        document.getElementById('qz-feedback-container').classList.add('hidden');
        document.getElementById('qz-btn-container').classList.add('hidden');
        document.getElementById('qz-next-container').classList.add('hidden');
        return;
    }
    const q = activeQuiz[mqIdx];
    document.getElementById('qz-curr').innerText = mqIdx + 1;
    document.getElementById('qz-card').className = "bg-white rounded-2xl p-10 text-center shadow-lg border-4 border-transparent flex flex-col items-center justify-center min-h-[150px]";
    document.getElementById('qz-card').innerHTML = `<h4 class="text-2xl font-bold text-slate-900 mb-2">${q.term}</h4>`;
    document.getElementById('qz-feedback-container').classList.add('hidden');
    
    let btnHtml = "";
    if(q.type === 'rw') {
        btnHtml = `<button onclick="answerMiniQuiz('rukun')" class="bg-slate-200 hover:bg-white text-slate-900 font-bold py-3 px-10 rounded-xl transition shadow-md">Rukun</button>
                   <button onclick="answerMiniQuiz('wajib')" class="bg-slate-200 hover:bg-white text-slate-900 font-bold py-3 px-10 rounded-xl transition shadow-md">Wajib</button>`;
    } else {
        btnHtml = `<button onclick="answerMiniQuiz('true')" class="bg-slate-200 hover:bg-white text-slate-900 font-bold py-3 px-10 rounded-xl transition shadow-md">Benar</button>
                   <button onclick="answerMiniQuiz('false')" class="bg-slate-200 hover:bg-white text-slate-900 font-bold py-3 px-10 rounded-xl transition shadow-md">Salah</button>`;
    }
    document.getElementById('qz-btn-container').innerHTML = btnHtml;
    document.getElementById('qz-btn-container').classList.remove('hidden');
    document.getElementById('qz-next-container').classList.add('hidden');
}

window.answerMiniQuiz = function(ans) {
    const q = activeQuiz[mqIdx];
    const isCorrect = (ans === q.ans);
    const fbContainer = document.getElementById('qz-feedback-container');
    const fbText = document.getElementById('qz-feedback-text');
    const card = document.getElementById('qz-card');

    fbContainer.classList.remove('hidden');
    document.getElementById('qz-btn-container').classList.add('hidden');
    document.getElementById('qz-next-container').classList.remove('hidden');

    if(isCorrect) {
        card.classList.replace('border-transparent', 'border-emerald-500');
        fbText.innerHTML = `<b>Tepat.</b> ${q.expl}`;
    } else {
        card.classList.replace('border-transparent', 'border-rose-500');
        fbText.innerHTML = `<b>Belum Tepat.</b> ${q.expl}`;
    }
}
window.nextMiniQuiz = function() { mqIdx++; renderMiniQuiz(); }

// ============================================
// KUIS MINI 2 (PERSIAPAN IHRAM)
// ============================================
const masterQuizBank2 = [
    { term: "Wewangian boleh disemprotkan pada kain ihram laki-laki.", ans: "false", expl: "Wewangian hanya disunnahkan di badan sebelum niat, bukan di pakaian." },
    { term: "Memotong kuku dan mencabut bulu ketiak adalah wajib sebelum ihram.", ans: "false", expl: "Itu adalah sunnah sebelum ihram, bukan syarat wajib." },
    { term: "Kain ihram atas untuk laki-laki disebut Rida'.", ans: "true", expl: "Tepat. Rida' menutupi bagian atas tubuh." },
    { term: "Jemaah boleh memakai sabuk atau tas pinggang untuk menyimpan uang.", ans: "true", expl: "Memakai sabuk tidak dilarang selama bukan pakaian yang membentuk/menjahit anggota tubuh secara keseluruhan." },
    { term: "Laki-laki boleh memakai peci hitam saat umrah untuk menghindari panas.", ans: "false", expl: "Laki-laki dilarang menutupi kepalanya dengan sesuatu yang melekat." },
    { term: "Jemaah pesawat langsung Makkah boleh niat setelah mendarat di bandara Jeddah.", ans: "false", expl: "Pesawat akan melewati miqat di udara, sehingga harus niat di pesawat." }
];
let activeQuiz2 = [];
let mqIdx2 = 0;

window.ulangiKuisMini2 = function() {
    activeQuiz2 = shuffle([...masterQuizBank2]).slice(0, 4);
    mqIdx2 = 0;
    renderMiniQuiz2();
}

window.renderMiniQuiz2 = function() {
    if(activeQuiz2.length === 0) activeQuiz2 = shuffle([...masterQuizBank2]).slice(0, 4);
    if(mqIdx2 >= activeQuiz2.length) {
        document.getElementById('qz2-card').innerHTML = `<h4 class="text-2xl font-bold text-slate-900">Kuis Selesai! 🎉</h4>`;
        document.getElementById('qz2-feedback-container').classList.add('hidden');
        document.getElementById('qz2-btn-container').classList.add('hidden');
        document.getElementById('qz2-next-container').classList.add('hidden');
        return;
    }
    const q = activeQuiz2[mqIdx2];
    document.getElementById('qz2-curr').innerText = mqIdx2 + 1;
    document.getElementById('qz2-card').className = "bg-white rounded-2xl p-10 text-center shadow-lg border-4 border-transparent flex flex-col items-center justify-center min-h-[150px]";
    document.getElementById('qz2-term').innerText = q.term;
    document.getElementById('qz2-feedback-container').classList.add('hidden');
    
    document.getElementById('qz2-btn-container').innerHTML = `
        <button onclick="answerMiniQuiz2('true')" class="bg-slate-200 hover:bg-white text-slate-900 font-bold py-3 px-10 rounded-xl transition shadow-md">Benar</button>
        <button onclick="answerMiniQuiz2('false')" class="bg-slate-200 hover:bg-white text-slate-900 font-bold py-3 px-10 rounded-xl transition shadow-md">Salah</button>
    `;
    document.getElementById('qz2-btn-container').classList.remove('hidden');
    document.getElementById('qz2-next-container').classList.add('hidden');
}

window.answerMiniQuiz2 = function(ans) {
    const q = activeQuiz2[mqIdx2];
    const isCorrect = (ans === q.ans);
    const fbContainer = document.getElementById('qz2-feedback-container');
    const fbText = document.getElementById('qz2-feedback-text');
    const card = document.getElementById('qz2-card');

    fbContainer.classList.remove('hidden');
    document.getElementById('qz2-btn-container').classList.add('hidden');
    document.getElementById('qz2-next-container').classList.remove('hidden');

    if(isCorrect) {
        card.classList.replace('border-transparent', 'border-emerald-500');
        fbText.innerHTML = `<b>Tepat.</b> ${q.expl}`;
    } else {
        card.classList.replace('border-transparent', 'border-rose-500');
        fbText.innerHTML = `<b>Belum Tepat.</b> ${q.expl}`;
    }
}
window.nextMiniQuiz2 = function() { mqIdx2++; renderMiniQuiz2(); }

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