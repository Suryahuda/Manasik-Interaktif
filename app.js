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
        btn_play_quran: "Dengarkan Syaikh", quran_trans_22_27: '"Dan berserulah kepada manusia untuk mengerjakan haji, niscaya mereka akan datang kepadamu dengan berjalan kaki, dan mengendarai unta yang kurus yang datang dari segenap penjuru yang jauh."',
        dash_choose_title: "Pilih ibadah yang dipelajari", umrah_title: "Umrah", umrah_card_desc: "Panduan interaktif lengkap.",
        btn_start_umrah: "Mulai umrah", btn_back_dash: "Kembali", umrah_map_title: "Perjalanan Umrah",
        card1_title: "1. Mengenal Umrah", card1_desc: "Pondasi, hukum, dan rukun.", btn_back_map: "Kembali ke Peta Modul",
        materi1_subtitle: "Memahami pondasi awal, hukum, dan rukun sebelum melaksanakan ibadah umrah.",
        def_title: "Memahami Makna Umrah", def_lang_title: "Secara Bahasa", def_lang_desc: "Umrah berarti Az-Ziarah, yaitu berkunjung atau berziarah.",
        def_term_title: "Secara Istilah", def_term_desc: "Mengunjungi Masjidil Haram untuk melaksanakan amalan khusus dalam rangka mendekatkan diri kepada Allah.",
        law_title: "Hukum Umrah", btn_listen: "Dengarkan AI",
        law_desc: "Terdapat perbedaan pendapat ulama terkait wajib tidaknya umrah. Namun, kami mengambil pendapat Imam Syafi'i, Imam Ahmad, dan mayoritas Sahabat bahwa hukum umrah adalah <b>Wajib sekali seumur hidup bagi yang mampu</b>.",
        law_evidence_title: "Dalil Kewajiban (Klik untuk detail):",
        law_ev1_btn: "📖 Hadits Aisyah", law_ev2_btn: "📖 Hadits Jibril", law_ev3_btn: "📖 Perkataan Ibnu Abbas",
        keutamaan_title: "Keutamaan Umrah",
        syarat_title: "Syarat Wajib & Rukun",
        note_title: "📌 Yang perlu diingat",
        note_1: "Umrah dapat dikerjakan kapan saja sepanjang tahun.",
        note_2: "<b>Rukun umrah:</b> ihram, thawaf, sa'i, bercukur, dan tertib. Bila ditinggalkan, umrah tidak sah.",
        note_3: "<b>Wajib umrah:</b> berihram dari miqat dan menjauhi larangan ihram. Bila dilanggar, wajib membayar dam.",
        doa_title: "Kumpulan Doa", kuis_title: "Kuis Pemahaman",
        qz_card_text: "Kartu", qz_btn_next: "Kartu berikutnya",
        
        modal_aisyah_title: "Hadits Aisyah", modal_aisyah_trans: "Aku bertanya, 'Wahai Rasulullah, apakah ada kewajiban jihad bagi para wanita?' Beliau menjawab: 'Ya, atas mereka ada jihad yang tidak ada peperangan di dalamnya, yaitu Haji dan Umrah.'", modal_aisyah_ref: "HR. Ibnu Majah (2901)",
        modal_jibril_title: "Hadits Jibril", modal_jibril_trans: "Islam adalah engkau bersaksi bahwa tidak ada tuhan selain Allah dan Muhammad utusan Allah... berhaji ke Baitullah dan berumrah...", modal_jibril_ref: "HR. Ad-Daraquthni",
        modal_abbas_title: "Perkataan Ibnu Abbas", modal_abbas_trans: "Sesungguhnya umrah adalah qarinah (gandengan) fardhu haji di dalam Kitabullah (Al-Baqarah: 196).", modal_abbas_ref: "HR. Bukhari",
        
        // 8 Keutamaan 
        modal_k1_title: "1. Menghapuskan Dosa", modal_k1_trans: "Antara umrah yang satu dan umrah lainnya, itu akan menghapuskan dosa di antara keduanya. Dan haji mabrur tidak ada balasannya melainkan surga.", modal_k1_ref: "HR. Bukhari (1773) dan Muslim (1349)",
        modal_k2_title: "2. Menjadi Tamu Allah", modal_k2_trans: "Orang yang berperang di jalan Allah, orang yang berhaji serta berumroh adalah tamu-tamu Allah. Allah memanggil mereka, mereka pun memenuhi panggilan. Oleh karena itu, jika mereka meminta kepada Allah pasti akan Allah beri.", modal_k2_ref: "HR. Ibnu Majah (2893)",
        modal_k3_title: "3. Menghapuskan dosa besar & kecil", modal_k3_trans: "Ikutkanlah umrah dengan haji, karena keduanya dapat menghapus kemiskinan dan dosa, seperti api yang membersihkan karat dari besi, emas, dan perak.", modal_k3_ref: "HR. An Nasai (2631)",
        modal_k4_title: "4. Menghilangkan Kefakiran", modal_k4_trans: "Umrah itu menjadikan seseorang menjadi kaya atau rezekinya tambah berkah karena umrah dapat menghilangkan kefakiran.", modal_k4_ref: "HR. Tirmidzi (810)",
        modal_k5_title: "5. Setara dengan Jihad bagi Wanita", modal_k5_trans: "Wahai Rasulullah, kami memandang bahwa jihad adalah amalan yang paling afdhol. Apakah berarti kami harus berjihad? Nabi bersabda: Tidak. Jihad yang paling utama adalah haji mabrur.", modal_k5_ref: "HR. Bukhari (1520)",
        modal_k6_title: "6. Shalat Berlipat Ganda", modal_k6_trans: "Shalat di masjidku (Masjid Nabawi) lebih utama daripada 1000 shalat di masjid lainnya selain Masjidil Harom. Shalat di Masjidil Harom lebih utama daripada 100.000 shalat di masjid lainnya.", modal_k6_ref: "HR. Ahmad 3/343",
        modal_k7_title: "7. Thawaf Menghapus Dosa", modal_k7_trans: "Barang siapa yang thawaf di sekitar Kabah 7 putaran... Setiap kali ia mengangkat dan meletakkan kakinya, Allah mencatat 1 kebaikan, menghapus 1 kesalahan, dan mengangkat 1 derajat.", modal_k7_ref: "HR. Tirmidzi (959)",
        modal_k8_title: "8. Pahala Disesuaikan Usaha", modal_k8_trans: "Namun sesungguhnya (pahala) itu sesuai dengan nafkah yang kamu keluarkan atau kesulitan yang kamu alami.", modal_k8_ref: "HR. Bukhari (1787)",
        
        c2_title: "2. Persiapan Ihram",
        c2_subtitle: "Mari bersiap memasuki ihram. Ihram adalah niat memulai ibadah, dan persiapannya dikerjakan sebelum tiba di miqat.",
        c2_sunnah_title: "Sunnah Sebelum Berihram",
        c2_sunnah_1: "Memotong kuku, merapikan kumis, mencabut bulu.",
        c2_sunnah_2: "Mandi besar (Ghusl) dengan niat mandi sunnah ihram.",
        c2_sunnah_3: "Memakai wewangian di badan (bukan di pakaian ihram).",
        c2_game_title: "Simulasi Pakaian Ihram",
        c2_game_desc: "Sentuh perlengkapan yang benar untuk memakaikannya.",
        c2_game_success: "Pakaian ihram lengkap. Anda siap berniat di miqat.",
        c2_note_1: "Mandi sunnah, potong kuku, pakai wewangian di badan sebelum niat.",
        c2_note_2: "2 helai kain tanpa jahitan, kepala terbuka, sandal terbuka.",
        c2_note_3: "Jika terbang langsung ke Mekkah, niat diucapkan di pesawat.",
c3_title: "3. Miqat dan Niat",
        c3_subtitle: "Pesawat melintasi miqat Yalamlam atau Qarnul Manazil. Sentuh tombol Niat saat berada di batas miqat.",
        c3_map_title: "Peta Miqat Makani",
        c3_map_desc: "Lima batas tempat untuk mulai berihram, mengelilingi Tanah Haram Makkah.",
        c3_game_title: "Simulasi Niat di Pesawat",
        c3_game_desc: "Perhatikan pergerakan pesawat. Klik 'Niat Sekarang' saat pesawat memasuki Zona Hijau (Batas Miqat).",
        btn_niat: "Niat Sekarang",
        btn_start_plane: "Mulai Simulasi Pesawat",
        c3_doa_title: "Lafaz Niat & Talbiyah",
        c3_doa_niat_title: "1. Niat Ihram Umrah",
        c3_doa_niat_desc: "Diucapkan di miqat ketika memulai ihram umrah.",
        c3_doa_niat_arab: "لَبَّيْكَ اللَّهُمَّ عُمْرَةً",
        c3_doa_niat_latin: "Labbaika Allahumma ‘umratan.",
        c3_doa_niat_arti: "Aku penuhi panggilan-Mu, ya Allah, untuk berumrah.",
        c3_doa_syarat_title: "2. Niat Bersyarat (Dianjurkan)",
        c3_doa_syarat_desc: "Bila khawatir terhalang (sakit/lansia), boleh bertahallul tanpa dam.",
        c3_doa_syarat_arab: "اللَّهُمَّ مَحِلِّي حَيْثُ حَبَسْتَنِي",
        c3_doa_syarat_latin: "Allahumma mahilli haitsu habastani.",
        c3_doa_syarat_arti: "Ya Allah, tempat aku bertahallul adalah di mana Engkau menahanku.",
        c3_doa_talbiyah_title: "3. Talbiyah (Diperbanyak)",
        c3_doa_talbiyah_desc: "Laki-laki mengeraskan suara, perempuan cukup pelan. Berhenti saat mulai thawaf.",
        c3_doa_talbiyah_arab: "لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ...",
        c3_doa_talbiyah_latin: "Labbaika Allahumma labbaik, labbaika la syarika laka labbaik...",
        c3_doa_talbiyah_arti: "Aku penuhi panggilan-Mu, ya Allah. Tiada sekutu bagi-Mu...",
    },
    en: {
        menu_dashboard: "Dashboard", menu_modul: "Umrah Modules", menu_doa: "Prayers", menu_kuis: "Quiz",
        portal_title: "Manasik Portal", login_subtitle: "Interactive Manasik Platform",
        login_quote: '"Knowledge precedes words and deeds."', login_desc: "Enter your Access Code to begin.",
        btn_start: "Start Simulation", dash_hero_title: "Virtual Manasik", dash_hero_desc: "Practice Umrah step-by-step.",
        btn_play_quran: "Listen to Sheikh", quran_trans_22_27: '"And proclaim to the people the Hajj; they will come to you on foot and on every lean camel; they will come from every distant pass."',
        dash_choose_title: "Select ritual to study", umrah_title: "Umrah", umrah_card_desc: "Complete interactive guide.",
        btn_start_umrah: "Start Umrah", btn_back_dash: "Go Back", umrah_map_title: "Umrah Journey",
        card1_title: "1. Introduction", card1_desc: "Foundations, rulings, and pillars.", btn_back_map: "Back to Map",
        materi1_subtitle: "Understanding the basic foundations, rulings, and pillars before performing Umrah.",
        def_title: "Understanding Umrah", def_lang_title: "Linguistically", def_lang_desc: "Umrah means Az-Ziarah, which is to visit.",
        def_term_title: "Terminologically", def_term_desc: "Visiting Masjid al-Haram to perform specific rituals to draw closer to Allah.",
        law_title: "Ruling on Umrah", btn_listen: "Listen to AI",
        law_desc: "Scholars differ on whether Umrah is obligatory. However, we adopt the view of Shafi'i, Ahmad, and the majority of Companions that Umrah is <b>Obligatory once in a lifetime for those able</b>.",
        law_evidence_title: "Evidence (Click for details):",
        law_ev1_btn: "📖 Hadith of Aisha", law_ev2_btn: "📖 Hadith of Jibril", law_ev3_btn: "📖 Statement of Ibn Abbas",
        keutamaan_title: "Virtues of Umrah",
        syarat_title: "Conditions & Pillars",
        note_title: "📌 Things to remember",
        note_1: "Umrah can be performed at any time throughout the year.",
        note_2: "<b>Pillars of Umrah:</b> ihram, tawaf, sa'i, shaving, and sequence. If missed, Umrah is invalid.",
        note_3: "<b>Obligations of Umrah:</b> entering ihram from miqat and avoiding prohibitions.",
        doa_title: "Prayers", kuis_title: "Quiz",
        qz_card_text: "Card", qz_btn_next: "Next Card",

        modal_aisyah_title: "Hadith of Aisha", modal_aisyah_trans: "I asked, 'O Messenger of Allah, is jihad obligatory upon women?' He said: 'Yes, upon them is a jihad in which there is no fighting: Hajj and Umrah.'", modal_aisyah_ref: "Sunan Ibn Majah",
        modal_jibril_title: "Hadith of Jibril", modal_jibril_trans: "Islam is to testify that there is no deity worthy of worship except Allah... perform Hajj to the House and Umrah...", modal_jibril_ref: "Ad-Daraquthni",
        modal_abbas_title: "Statement of Ibn Abbas", modal_abbas_trans: "Verily, Umrah is the companion of the obligatory Hajj in the Book of Allah.", modal_abbas_ref: "Sahih Al-Bukhari",
        
        modal_k1_title: "1. Expiation of Sins", modal_k1_trans: "From one Umrah to another is an expiation for what comes between them.", modal_k1_ref: "Bukhari",
        modal_k2_title: "2. Guests of Allah", modal_k2_trans: "The pilgrims performing Hajj and Umrah are the guests of Allah.", modal_k2_ref: "Ibn Majah",
        modal_k3_title: "3. Removes Poverty & Sins", modal_k3_trans: "Perform Hajj and Umrah consecutively; they remove poverty and sin.", modal_k3_ref: "An Nasai",
        modal_k4_title: "4. Removes Poverty", modal_k4_trans: "Umrah makes one rich or increases the blessing of their sustenance.", modal_k4_ref: "Tirmidhi",
        modal_k5_title: "5. Equal to Jihad for Women", modal_k5_trans: "The best Jihad for women is an accepted Hajj.", modal_k5_ref: "Bukhari",
        modal_k6_title: "6. Multiplied Prayer Rewards", modal_k6_trans: "One prayer in Al-Masjid Al-Haram is better than 100,000 prayers elsewhere.", modal_k6_ref: "Ahmad",
        modal_k7_title: "7. Tawaf Elevates Status", modal_k7_trans: "Whoever circles the Kaaba 7 times... Allah writes a good deed for every step.", modal_k7_ref: "Tirmidhi",
        modal_k8_title: "8. Reward matches effort", modal_k8_trans: "The reward is according to your expenses and your hardship.", modal_k8_ref: "Bukhari"
    },
    ar: {
        menu_dashboard: "لوحة التحكم", menu_modul: "وحدات العمرة", menu_doa: "مجموعة الأدعية", menu_kuis: "الاختبار",
        portal_title: "بوابة المناسك", login_subtitle: "منصة المناسك التفاعلية",
        login_quote: '"العلم قبل القول والعمل"', login_desc: "أدخل رمز الوصول الخاص بك للبدء.",
        btn_start: "بدء المحاكاة", dash_hero_title: "المناسك الافتراضية", dash_hero_desc: "تدرب على العمرة خطوة بخطوة.",
        btn_play_quran: "استمع للشيخ", quran_trans_22_27: "", // Kosong agar terjemahan hilang
        dash_choose_title: "اختر العبادة للتعلم", umrah_title: "العمرة", umrah_card_desc: "دليل تفاعلي شامل.",
        btn_start_umrah: "بدء العمرة", btn_back_dash: "رجوع", umrah_map_title: "رحلة العمرة",
        card1_title: "١. التعرف على العمرة", card1_desc: "الأسس، الأحكام، والأركان.", btn_back_map: "العودة للخريطة",
        materi1_subtitle: "فهم الأسس والأحكام والأركان قبل أداء مناسك العمرة.",
        def_title: "معنى العمرة", def_lang_title: "لغة", def_lang_desc: "العمرة تعني الزيارة.",
        def_term_title: "اصطلاحاً", def_term_desc: "زيارة المسجد الحرام لأداء مناسك مخصوصة تقرباً إلى الله.",
        law_title: "حكم العمرة", btn_listen: "استمع",
        law_desc: "اختلف العلماء في وجوبها. لكننا نأخذ بقول الشافعي وأحمد وجمهور الصحابة أن العمرة <b>واجبة مرة في العمر على المستطيع</b>.",
        law_evidence_title: "أدلة الوجوب:",
        law_ev1_btn: "📖 حديث عائشة", law_ev2_btn: "📖 حديث جبريل", law_ev3_btn: "📖 قول ابن عباس",
        keutamaan_title: "فضائل العمرة",
        syarat_title: "الشروط والأركان",
        note_title: "📌 أمور يجب تذكرها",
        note_1: "يمكن أداء العمرة في أي وقت طوال العام.",
        note_2: "<b>أركان العمرة:</b> الإحرام، الطواف، السعي، الحلق، والترتيب.",
        note_3: "<b>واجبات العمرة:</b> الإحرام من الميقات واجتناب المحظورات.",
        doa_title: "الأدعية", kuis_title: "الاختبار",
        qz_card_text: "بطاقة", qz_btn_next: "البطاقة التالية",

        modal_aisyah_title: "حديث عائشة", modal_aisyah_trans: "قُلْتُ يَا رَسُولَ اللَّهِ عَلَى النِّسَاءِ جِهَادٌ ؟ قَالَ: نَعَمْ ، عَلَيْهِنَّ جِهَادٌ لا قِتَالَ فِيهِ الْحَجُّ وَالْعُمْرَةُ.", modal_aisyah_ref: "ابن ماجه",
        modal_jibril_title: "حديث جبريل", modal_jibril_trans: "الإسلام أن تشهد أن لا إله إلا الله... وتحج البيت وتعتمر...", modal_jibril_ref: "الدارقطني",
        modal_abbas_title: "قول ابن عباس", modal_abbas_trans: "إِنَّهَا لَقَرِينَتُهَا فِي كِتَابِ اللَّهِ.", modal_abbas_ref: "البخاري",
        
        modal_k1_title: "١. كفارة للذنوب", modal_k1_trans: "العمرة إلى العمرة كفارة لما بينهما.", modal_k1_ref: "البخاري ومسلم",
        modal_k2_title: "٢. وفد الله", modal_k2_trans: "الغازي في سبيل الله والحاج والمعتمر وفد الله.", modal_k2_ref: "ابن ماجه",
        modal_k3_title: "٣. تنفي الفقر والذنوب", modal_k3_trans: "تابعوا بين الحج والعمرة فإنهما ينفيان الفقر والذنوب.", modal_k3_ref: "النسائي",
        modal_k4_title: "٤. إزالة الفقر", modal_k4_trans: "العمرة تزيل الفقر.", modal_k4_ref: "الترمذي",
        modal_k5_title: "٥. جهاد النساء", modal_k5_trans: "أفضل الجهاد حج مبرور.", modal_k5_ref: "البخاري",
        modal_k6_title: "٦. مضاعفة الصلاة", modal_k6_trans: "صلاة في المسجد الحرام أفضل من مائة ألف صلاة.", modal_k6_ref: "أحمد",
        modal_k7_title: "٧. الطواف يرفع الدرجات", modal_k7_trans: "من طاف بهذا البيت أسبوعا...", modal_k7_ref: "الترمذي",
        modal_k8_title: "٨. الأجر على قدر المشقة", modal_k8_trans: "ولكنها على قدر نفقتك أو نصبك.", modal_k8_ref: "البخاري"
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
renderMiniQuiz3();
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
    aisyah: "عَنْ عَائِشَةَ قَالَتْ : قُلْتُ يَا رَسُولَ اللَّهِ عَلَى النِّسَاءِ جِهَادٌ ؟ قَالَ: نَعَمْ ، عَلَيْهِنَّ جِهَادٌ لا قِتَالَ فِيهِ الْحَجُّ وَالْعُمْرَةُ",
    jibril: "الإسلام أن تشهد أن لا إله إلا الله وأن محمدا رسول الله، وتقيم الصلاة، وتؤتي الزكاة، وتحج البيت وتعتمر، وتغتسل من الجنابة، وتتم الوضوء، وتصوم رمضان",
    abbas: "إِنَّهَا لَقَرِينَتُهَا فِي كِتَابِ اللَّهِ (وَأَتِمُّوا الْحَجَّ وَالْعُمْرَةَ لِلَّهِ)",
    k1: "الْعُمْرَةُ إِلَى الْعُمْرَةِ كَفَّارَةٌ لِمَا بَيْنَهُمَا ، وَالْحَجُّ الْمَبْرُورُ لَيْسَ لَهُ جَزَاءٌ إِلاَّ الْجَنَّةُ",
    k2: "الْغَازِى فِى سَبِيلِ اللَّهِ وَالْحَاجُّ وَالْمُعْتَمِرُ وَفْدُ اللَّهِ دَعَاهُمْ فَأَجَابُوهُ وَسَأَلُوهُ فَأَعْطَاهُمْ",
    k3: "تَابِعُوا بَيْنَ الْحَجِّ وَالْعُمْرَةِ فَإِنَّهُمَا يَنْفِيَانِ الْفَقْرَ وَالذُّنُوبَ...",
    k4: "تَابِعُوا بَيْنَ الْحَجِّ وَالْعُمْرَةِ فَإِنَّهُمَا يَنْفِيَانِ الْفَقْرَ...",
    k5: "يَا رَسُولَ اللَّهِ ، نَرَى الْجِهَادَ أَفْضَلَ الْعَمَلِ ، أَفَلاَ نُجَاهِدُ قَالَ « لاَ ، لَكِنَّ أَفْضَلَ الْجِهَادِ حَجٌّ مَبْرُورٌ »",
    k6: "صَلاَةٌ فِى مَسْجِدِى أَفْضَلُ مِنْ أَلْفِ صَلاَةٍ فِيمَا سِوَاهُ إِلاَّ الْمَسْجِدَ الْحَرَامَ...",
    k7: "مَن طاف بِهَذا البيتِ أسبوعًا يُحصيهِ، فيُصلِّي رَكْعتينِ كانَ كعِتقِ رقَبةٍ...",
    k8: "قالَتْ عَائِشَةُ... فقِيلَ لَهَا: ...ولَكِنَّهَا علَى قَدْرِ نَفَقَتِكِ أوْ نَصَبِكِ."
};

window.openDalilModal = function(id) {
    const lang = localStorage.getItem('userLang') || 'id';
    document.getElementById('modalTitle').innerText = translations[lang][`modal_${id}_title`];
    document.getElementById('modalArabic').innerText = arabicTexts[id];
    document.getElementById('modalTranslation').innerText = translations[lang][`modal_${id}_trans`];
    document.getElementById('modalRef').innerText = translations[lang][`modal_${id}_ref`];
    document.getElementById('dalilModal').classList.remove('hidden');
}
window.closeDalilModal = function() { document.getElementById('dalilModal').classList.add('hidden'); }

// ============================================
// KUIS MINI (ACAK - BANK SOAL)
// ============================================
const masterQuizBank = [
    { type: "rw", term: "Ihram (niat)", ans: "rukun", expl: "Tanpa niat ihram, umrah tidak dimulai." },
    { type: "rw", term: "Thawaf umrah", ans: "rukun", expl: "Tujuh putaran mengelilingi Ka'bah." },
    { type: "rw", term: "Sa'i", ans: "rukun", expl: "Berjalan antara bukit Shafa dan Marwah." },
    { type: "rw", term: "Bercukur (Tahallul)", ans: "rukun", expl: "Tanda berakhirnya ibadah umrah." },
    { type: "rw", term: "Ihram dari Miqat", ans: "wajib", expl: "Harus dilakukan di batas tempat miqat, jika dilanggar wajib bayar dam." },
    { type: "rw", term: "Menjauhi larangan ihram", ans: "wajib", expl: "Pelanggaran terhadap larangan ihram mengharuskan pembayaran dam." },
    { type: "tf", term: "Umrah hanya boleh dilakukan di bulan Dzulhijjah.", ans: "false", expl: "Umrah dapat dikerjakan kapan saja sepanjang tahun." },
    { type: "tf", term: "Rukun umrah jika ditinggalkan maka umrahnya tidak sah.", ans: "true", expl: "Rukun umrah harus dikerjakan secara tertib dan tidak bisa diganti dam." },
    { type: "tf", term: "Hukum umrah menurut Imam Syafi'i adalah wajib.", ans: "true", expl: "Hukumnya wajib sekali seumur hidup bagi yang mampu." },
    { type: "tf", term: "Syarat wajib umrah hanya diperuntukkan bagi laki-laki.", ans: "false", expl: "Syarat wajib berlaku umum: Islam, Baligh, Aqil, Merdeka, dan Mampu." }
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
    activeQuiz = shuffle([...masterQuizBank]).slice(0, 6);
    mqIdx = 0;
    renderMiniQuiz();
}

window.renderMiniQuiz = function() {
    if(activeQuiz.length === 0) activeQuiz = shuffle([...masterQuizBank]).slice(0, 6);
    
    if(mqIdx >= activeQuiz.length) {
        document.getElementById('qz-card').innerHTML = `<h4 class="text-2xl font-bold text-slate-900">Kuis Selesai! 🎉</h4>`;
        document.getElementById('qz-feedback-container').classList.add('hidden');
        document.getElementById('qz-btn-container').classList.add('hidden');
        document.getElementById('qz-next-container').classList.add('hidden');
        return;
    }
    
    const q = activeQuiz[mqIdx];
    document.getElementById('qz-curr').innerText = mqIdx + 1;
    document.getElementById('qz-card').className = "bg-white rounded-2xl p-10 md:p-14 text-center shadow-lg border-4 border-transparent transition-all duration-300 flex flex-col items-center justify-center min-h-[150px]";
    
    document.getElementById('qz-card').innerHTML = `
        <h4 class="text-2xl md:text-3xl font-bold text-slate-900 mb-2">${q.term}</h4>
        <p class="text-slate-500 text-sm font-medium ${q.type === 'tf' ? '' : 'hidden'}">Pernyataan ini Benar atau Salah?</p>
    `;

    document.getElementById('qz-feedback-container').classList.add('hidden');
    
    let btnHtml = "";
    const lang = localStorage.getItem('userLang') || 'id';
    
    if(q.type === 'rw') {
        const textRukun = lang === 'en' ? 'Pillar (Rukun)' : (lang === 'ar' ? 'ركن' : 'Rukun');
        const textWajib = lang === 'en' ? 'Oblig. (Wajib)' : (lang === 'ar' ? 'واجب' : 'Wajib');
        btnHtml = `
            <button onclick="answerMiniQuiz('rukun')" class="bg-slate-200 hover:bg-white text-slate-900 font-bold py-3 px-10 rounded-xl transition shadow-md">${textRukun}</button>
            <button onclick="answerMiniQuiz('wajib')" class="bg-slate-200 hover:bg-white text-slate-900 font-bold py-3 px-10 rounded-xl transition shadow-md">${textWajib}</button>
        `;
    } else if (q.type === 'tf') {
        const textBenar = lang === 'en' ? 'True' : (lang === 'ar' ? 'صحيح' : 'Benar');
        const textSalah = lang === 'en' ? 'False' : (lang === 'ar' ? 'خطأ' : 'Salah');
        btnHtml = `
            <button onclick="answerMiniQuiz('true')" class="bg-slate-200 hover:bg-white text-slate-900 font-bold py-3 px-10 rounded-xl transition shadow-md">${textBenar}</button>
            <button onclick="answerMiniQuiz('false')" class="bg-slate-200 hover:bg-white text-slate-900 font-bold py-3 px-10 rounded-xl transition shadow-md">${textSalah}</button>
        `;
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
    
    const lang = localStorage.getItem('userLang') || 'id';
    const textTepat = lang === 'en' ? 'Correct.' : (lang === 'ar' ? 'صحيح.' : 'Tepat.');
    const textKurang = lang === 'en' ? 'Incorrect.' : (lang === 'ar' ? 'غير صحيح.' : 'Belum Tepat.');

    fbContainer.classList.remove('hidden');
    document.getElementById('qz-btn-container').classList.add('hidden');
    document.getElementById('qz-next-container').classList.remove('hidden');

    if(isCorrect) {
        card.classList.replace('border-transparent', 'border-emerald-500');
        fbText.innerHTML = `<b>${textTepat}</b> ${q.expl}`;
    } else {
        card.classList.replace('border-transparent', 'border-rose-500');
        fbText.innerHTML = `<b>${textKurang}</b> ${q.expl}`;
    }
}

window.nextMiniQuiz = function() {
    mqIdx++;
    renderMiniQuiz();
}

window.playAI = function(section) {
    if ('speechSynthesis' in window) {
        speechSynthesis.cancel(); 
        const lang = localStorage.getItem('userLang') || 'id';
        let text = translations[lang].law_desc.replace(/<[^>]*>?/gm, ''); 
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
// ============================================
// GAME INTERAKTIF (PERSIAPAN IHRAM)
// ============================================
let ihramItems = { izar: false, rida: false, sandal: false, sabuk: false };

window.toggleIhramItem = function(item) {
    ihramItems[item] = !ihramItems[item];
    const btn = document.getElementById(`btn-${item}`);
    const svg = document.getElementById(`svg-${item}`);
    const err = document.getElementById('game-error');
    
    err.classList.add('hidden'); // Sembunyikan error jika klik item yang benar

    if (ihramItems[item]) {
        btn.classList.replace('border-slate-200', 'border-emerald-500');
        btn.classList.add('bg-emerald-50');
        svg.classList.remove('opacity-0', 'scale-95', 'translate-y-4', 'translate-y-[-10px]', 'translate-y-2');
        svg.classList.add('opacity-100', 'scale-100', 'translate-y-0');
        if (item === 'sandal') {
            const sandal2 = document.getElementById('svg-sandal2');
            sandal2.classList.remove('opacity-0', 'translate-y-2');
            sandal2.classList.add('opacity-100', 'translate-y-0');
        }
    } else {
        btn.classList.replace('border-emerald-500', 'border-slate-200');
        btn.classList.remove('bg-emerald-50');
        svg.classList.remove('opacity-100', 'scale-100', 'translate-y-0');
        svg.classList.add('opacity-0');
        if (item === 'sandal') document.getElementById('svg-sandal2').classList.add('opacity-0');
    }

    // Cek apakah item wajib sudah lengkap
    if (ihramItems.izar && ihramItems.rida && ihramItems.sandal) {
        document.getElementById('game-success').classList.remove('hidden');
    } else {
        document.getElementById('game-success').classList.add('hidden');
    }
}

window.checkWrongIhram = function(item, msg) {
    const btn = document.getElementById(`btn-${item}`);
    const err = document.getElementById('game-error');
    
    err.innerHTML = `<span class="text-xl">⚠️</span> <span>${msg}</span>`;
    err.classList.remove('hidden');

    // Efek merah sekejap pada tombol
    btn.classList.add('bg-rose-100', 'border-rose-500', 'text-rose-900');
    setTimeout(() => {
        btn.classList.remove('bg-rose-100', 'border-rose-500', 'text-rose-900');
    }, 1500);
}

window.resetIhramGame = function() {
    ['izar', 'rida', 'sandal', 'sabuk'].forEach(i => {
        ihramItems[i] = true; // Paksa jadi true dulu
        toggleIhramItem(i);   // Lalu toggle agar jadi false dan animasi berjalan mundur
    });
    document.getElementById('game-error').classList.add('hidden');
}


// ============================================
// KUIS MINI 2 (PERSIAPAN IHRAM)
// ============================================
const masterQuizBank2 = [
    { term: "Wewangian boleh disemprotkan pada kain ihram laki-laki.", ans: "false", expl: "Wewangian hanya disunnahkan di kulit badan sebelum niat, BUKAN di pakaian." },
    { term: "Kain ihram atas untuk laki-laki disebut Rida'.", ans: "true", expl: "Tepat. Rida' menutupi bagian atas tubuh, dan Izar untuk bagian bawah." },
    { term: "Jemaah boleh memakai sabuk atau tas pinggang untuk menyimpan uang.", ans: "true", expl: "Sabuk/tas pinggang diperbolehkan selama bukan pakaian yang dijahit membentuk tubuh secara keseluruhan." },
    { term: "Jemaah pesawat langsung Makkah boleh niat setelah mendarat di bandara Jeddah.", ans: "false", expl: "Pesawat akan melewati miqat di udara, sehingga jemaah harus niat saat di pesawat." }
];
let activeQuiz2 = [];
let mqIdx2 = 0;

window.ulangiKuisMini2 = function() {
    activeQuiz2 = shuffle([...masterQuizBank2]);
    mqIdx2 = 0;
    renderMiniQuiz2();
}

window.renderMiniQuiz2 = function() {
    if(activeQuiz2.length === 0) activeQuiz2 = shuffle([...masterQuizBank2]);
    if(mqIdx2 >= activeQuiz2.length) {
        document.getElementById('qz2-card').innerHTML = `<h4 class="text-2xl font-bold text-slate-900">Kuis Selesai! 🎉</h4>`;
        document.getElementById('qz2-feedback-container').classList.add('hidden');
        document.getElementById('qz2-btn-container').classList.add('hidden');
        document.getElementById('qz2-next-container').classList.add('hidden');
        return;
    }
    const q = activeQuiz2[mqIdx2];
    document.getElementById('qz2-curr').innerText = mqIdx2 + 1;
    document.getElementById('qz2-term').innerText = q.term;
    document.getElementById('qz2-feedback-container').classList.add('hidden');
    document.getElementById('qz2-card').className = "bg-white rounded-2xl p-10 text-center shadow-lg border-4 border-transparent flex flex-col items-center justify-center min-h-[150px] transition-all";
    
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
// ============================================
// MODUL 3: SIMULASI PESAWAT, AUDIO & KUIS 3
// ============================================

// 1. AUDIO BACAAN (Menggunakan Web Speech API Bawaan Browser - 100% Berbunyi)
window.playDoaAudio = function(type) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // Hentikan audio sebelumnya jika ada
        
        let text = '';
        if(type === 'niat') text = 'لَبَّيْكَ اللَّهُمَّ عُمْرَةً';
        if(type === 'syarat') text = 'اللَّهُمَّ مَحِلِّي حَيْثُ حَبَسْتَنِي';
        if(type === 'talbiyah') text = 'لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ';
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ar-SA'; // Suara Bahasa Arab
        utterance.rate = 0.85;   // Kecepatan membaca sedikit perlahan agar jelas
        window.speechSynthesis.speak(utterance);
    } else {
        alert("Browser Anda tidak mendukung fitur pemutar suara.");
    }
}

// 2. LOGIKA GAME PESAWAT DI PETA (Sudah Dikalibrasi Presisi)
let planeInterval;
let planeProgress = 0; 
let isGameRunning = false;

window.startPlaneGame = function() {
    if (isGameRunning) return;
    
    document.getElementById('plane-result').classList.add('hidden');
    document.getElementById('btn-niat').innerHTML = '🤲 Niat Sekarang!';
    planeProgress = 0;
    isGameRunning = true;
    
    // Reset posisi awal pesawat (di luar peta sebelah tenggara)
    const planeIcon = document.getElementById('plane-icon');
    planeIcon.style.left = '80%';
    planeIcon.style.top = '110%';

    planeInterval = setInterval(() => {
        planeProgress += 0.5; // Kecepatan pergerakan
        
        // Pergerakan dari Tenggara (x:80%, y:110%) menuju Jeddah (x:30%, y:75%)
        let currentLeft = 80 - (planeProgress * (80 - 30) / 100); 
        let currentTop = 110 - (planeProgress * (110 - 75) / 100);
        
        planeIcon.style.left = currentLeft + '%';
        planeIcon.style.top = currentTop + '%';
        
        if (planeProgress >= 100) {
            clearInterval(planeInterval);
            isGameRunning = false;
            document.getElementById('btn-niat').innerHTML = '🤲 Niat di bandara';
            showPlaneResult("terlewat");
        }
    }, 50);
}

window.niatSekarang = function() {
    if (!isGameRunning) {
        if (planeProgress === 0 || planeProgress >= 100) {
            showPlaneResult("terlewat_bandara");
        } else {
            alert("Klik '▶ Mulai Perjalanan' terlebih dahulu!");
        }
        return;
    }
    
    clearInterval(planeInterval);
    isGameRunning = false;
    document.getElementById('btn-niat').innerHTML = '🤲 Niat di bandara';
    
    // KALIBRASI PRESISI SESUAI VISUAL PETA:
    // - Sebelum 58%: Belum sampai Yalamlam (Terlalu Cepat)
    // - 58% sampai 78%: Berada pas di atas garis/titik Yalamlam (Sempurna)
    // - Di atas 78%: Melewati Yalamlam menuju Jeddah (Terlewat)
    if (planeProgress < 58) {
        showPlaneResult("makruh");
    } else if (planeProgress >= 58 && planeProgress <= 78) {
        showPlaneResult("sah");
    } else {
        showPlaneResult("terlewat");
    }
}

function showPlaneResult(status) {
    const resBox = document.getElementById('plane-result');
    resBox.classList.remove('hidden', 'bg-amber-100', 'bg-emerald-100', 'bg-rose-100');
    
    if (status === "makruh") {
        resBox.classList.add('bg-amber-100', 'text-amber-900', 'border-amber-300');
        resBox.innerHTML = `<b>⚠️ Terlalu Cepat (Sah, tetapi Makruh):</b> Anda berniat ihram sebelum miqat (pesawat belum menyentuh garis/titik Yalamlam).`;
    } else if (status === "sah") {
        resBox.classList.add('bg-emerald-100', 'text-emerald-900', 'border-emerald-300');
        resBox.innerHTML = `<b>✅ Sempurna:</b> Anda berniat tepat saat pesawat melintasi garis Miqat Yalamlam. Umrah Anda sah.`;
    } else if (status === "terlewat_bandara") {
        resBox.classList.add('bg-rose-100', 'text-rose-900', 'border-rose-300');
        resBox.innerHTML = `<b>🚨 Terlewat Miqat:</b> Anda berniat saat sudah tiba di Bandara Jeddah (melewati miqat). Wajib kembali ke miqat atau membayar Dam.`;
    } else {
        resBox.classList.add('bg-rose-100', 'text-rose-900', 'border-rose-300');
        resBox.innerHTML = `<b>🚨 Terlewat Garis Miqat:</b> Anda melewati batas miqat tanpa berniat. Pesawat sudah melewati Yalamlam menuju Jeddah. Wajib membayar Dam (seekor kambing).`;
    }
}

// 3. KUIS MINI 3 (MIQAT)
const masterQuizBank3 = [
    { term: "Berniat ihram sejurus selepas pesawat berlepas dari Indonesia adalah yang paling utama.", ans: "false", expl: "Berniat sebelum miqat hukumnya sah namun makruh. Yang paling utama adalah tepat di miqat." },
    { term: "Jika pesawat mendarat di Jeddah dan jemaah baru berniat ihram di bandara, maka ia wajib membayar dam.", ans: "true", expl: "Benar. Bandara Jeddah berada di dalam batas miqat, sehingga ia telah melewati miqat tanpa ihram." },
    { term: "Niat bersyarat (Allahumma mahilli...) dianjurkan bagi semua jemaah tanpa terkecuali.", ans: "false", expl: "Lebih dianjurkan bagi yang khawatir terhalang (sakit, lansia, dll)." },
    { term: "Bacaan Talbiyah untuk umrah dihentikan ketika jemaah mulai melaksanakan Thawaf.", ans: "true", expl: "Tepat. Talbiyah dibaca sepanjang jalan dan dihentikan saat akan thawaf." }
];
let activeQuiz3 = [];
let mqIdx3 = 0;

window.ulangiKuisMini3 = function() {
    activeQuiz3 = shuffle([...masterQuizBank3]);
    mqIdx3 = 0;
    renderMiniQuiz3();
}

window.renderMiniQuiz3 = function() {
    if(activeQuiz3.length === 0) activeQuiz3 = shuffle([...masterQuizBank3]);
    if(mqIdx3 >= activeQuiz3.length) {
        document.getElementById('qz3-card').innerHTML = `<h4 class="text-2xl font-bold text-slate-900">Kuis Miqat Selesai! 🎉</h4>`;
        document.getElementById('qz3-feedback-container').classList.add('hidden');
        document.getElementById('qz3-btn-container').classList.add('hidden');
        document.getElementById('qz3-next-container').classList.add('hidden');
        return;
    }
    const q = activeQuiz3[mqIdx3];
    document.getElementById('qz3-curr').innerText = mqIdx3 + 1;
    document.getElementById('qz3-term').innerText = q.term;
    document.getElementById('qz3-feedback-container').classList.add('hidden');
    document.getElementById('qz3-card').className = "bg-white rounded-2xl p-10 text-center shadow-lg border-4 border-transparent flex flex-col items-center justify-center min-h-[150px] transition-all";
    
    document.getElementById('qz3-btn-container').innerHTML = `
        <button onclick="answerMiniQuiz3('true')" class="bg-slate-200 hover:bg-white text-slate-900 font-bold py-3 px-10 rounded-xl transition shadow-md">Benar</button>
        <button onclick="answerMiniQuiz3('false')" class="bg-slate-200 hover:bg-white text-slate-900 font-bold py-3 px-10 rounded-xl transition shadow-md">Salah</button>
    `;
    document.getElementById('qz3-btn-container').classList.remove('hidden');
    document.getElementById('qz3-next-container').classList.add('hidden');
}

window.answerMiniQuiz3 = function(ans) {
    const q = activeQuiz3[mqIdx3];
    const isCorrect = (ans === q.ans);
    const fbContainer = document.getElementById('qz3-feedback-container');
    const fbText = document.getElementById('qz3-feedback-text');
    const card = document.getElementById('qz3-card');

    fbContainer.classList.remove('hidden');
    document.getElementById('qz3-btn-container').classList.add('hidden');
    document.getElementById('qz3-next-container').classList.remove('hidden');

    if(isCorrect) {
        card.classList.replace('border-transparent', 'border-emerald-500');
        fbText.innerHTML = `<b>Tepat.</b> ${q.expl}`;
    } else {
        card.classList.replace('border-transparent', 'border-rose-500');
        fbText.innerHTML = `<b>Belum Tepat.</b> ${q.expl}`;
    }
}
window.nextMiniQuiz3 = function() { mqIdx3++; renderMiniQuiz3(); }