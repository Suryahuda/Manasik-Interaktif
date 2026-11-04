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

window.changeLanguage = function() {
    // Fitur terjemahan telah dihapus, default otomatis bahasa Indonesia
    localStorage.setItem('userLang', 'id');
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

const dalilData = {
    aisyah: { title: "Hadits Aisyah", trans: "\"Aku bertanya: 'Wahai Rasulullah, apakah ada jihad bagi para wanita?' Beliau menjawab: 'Ya, bagi mereka ada jihad yang tidak ada peperangan di dalamnya, yaitu haji dan umrah.'\"", ref: "HR. Ibnu Majah" },
    jibril: { title: "Hadits Jibril", trans: "\"Islam adalah engkau bersaksi bahwa tidak ada tuhan berhak disembah selain Allah dan Muhammad utusan Allah, mendirikan shalat, menunaikan zakat, berhaji dan berumrah, mandi janabah, menyempurnakan wudhu, dan berpuasa Ramadhan.\"", ref: "HR. Ibnu Khuzaimah" },
    abbas: { title: "Perkataan Ibnu Abbas", trans: "\"Sesungguhnya umrah adalah qarinah (pasangan) haji dalam Kitabullah.\"", ref: "Riwayat Al-Bukhari" },
    k1: { title: "1. Menghapuskan Dosa", trans: "\"Antara satu umrah ke umrah berikutnya adalah penebus dosa antara keduanya, dan haji yang mabrur tidak ada balasan baginya selain surga.\"", ref: "HR. Bukhari & Muslim" },
    k2: { title: "2. Menjadi Tamu Allah", trans: "\"Orang yang berperang di jalan Allah, orang yang berhaji, dan orang yang berumrah adalah tamu Allah...\"", ref: "HR. Ibnu Majah" },
    k3: { title: "3. Menghapus Dosa", trans: "\"Iringilah antara haji dan umrah, karena keduanya menghilangkan kefakiran dan dosa-dosa...\"", ref: "HR. Tirmidzi" },
    k4: { title: "4. Menghilangkan Kefakiran", trans: "\"Iringilah antara haji dan umrah, karena keduanya menghilangkan kefakiran...\"", ref: "HR. Tirmidzi" },
    k5: { title: "5. Setara Jihad bagi Wanita", trans: "\"...jihad yang paling afdhal (bagi wanita) adalah haji yang mabrur.\"", ref: "HR. Bukhari" },
    k6: { title: "6. Pahala Masjidil Haram", trans: "\"Shalat di masjidku ini lebih utama dari seribu shalat di masjid yang lain kecuali Masjidil Haram.\"", ref: "HR. Muslim" },
    k7: { title: "7. Thawaf Meninggikan Derajat", trans: "\"Barangsiapa yang thawaf di Baitullah tujuh putaran... maka pahalanya seperti memerdekakan seorang budak.\"", ref: "HR. Ahmad" },
    k8: { title: "8. Pahala Sesuai Usaha", trans: "\"...Akan tetapi pahalanya sesuai dengan kadar nafkahmu atau kelelahanmu.\"", ref: "HR. Bukhari & Muslim" }
};

window.openDalilModal = function(id) {
    document.getElementById('modalTitle').innerText = dalilData[id].title;
    document.getElementById('modalArabic').innerText = arabicTexts[id];
    document.getElementById('modalTranslation').innerText = dalilData[id].trans;
    document.getElementById('modalRef').innerText = dalilData[id].ref;
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
    
    if(q.type === 'rw') {
        btnHtml = `
            <button onclick="answerMiniQuiz('rukun')" class="bg-slate-200 hover:bg-white text-slate-900 font-bold py-3 px-10 rounded-xl transition shadow-md">Rukun</button>
            <button onclick="answerMiniQuiz('wajib')" class="bg-slate-200 hover:bg-white text-slate-900 font-bold py-3 px-10 rounded-xl transition shadow-md">Wajib</button>
        `;
    } else if (q.type === 'tf') {
        btnHtml = `
            <button onclick="answerMiniQuiz('true')" class="bg-slate-200 hover:bg-white text-slate-900 font-bold py-3 px-10 rounded-xl transition shadow-md">Benar</button>
            <button onclick="answerMiniQuiz('false')" class="bg-slate-200 hover:bg-white text-slate-900 font-bold py-3 px-10 rounded-xl transition shadow-md">Salah</button>
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
    
    const textTepat = 'Tepat.';
    const textKurang = 'Belum Tepat.';

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
        // Menggunakan teks statis bahasa Indonesia
        let text = "Terdapat perbedaan pendapat ulama. Namun, kami mengambil pendapat Imam Syafi'i, Ahmad, dan mayoritas Sahabat bahwa hukum umrah adalah Wajib sekali seumur hidup bagi yang mampu."; 
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'id-ID';
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
    
    err.classList.add('hidden'); 

    if (ihramItems[item]) {
        btn.classList.replace('bg-black/50', 'bg-[#d4af37]/20');
        btn.classList.replace('border-white/10', 'border-[#d4af37]');
        btn.classList.replace('text-slate-300', 'text-[#d4af37]');
        
        if (svg) {
            svg.classList.remove('opacity-0', 'scale-95', 'translate-y-4', 'translate-y-[-10px]', 'translate-y-2');
            svg.classList.add('opacity-100', 'scale-100', 'translate-y-0');
        }
        
        if (item === 'sandal') {
            const sandal2 = document.getElementById('svg-sandal2');
            if(sandal2) {
                sandal2.classList.remove('opacity-0', 'translate-y-2');
                sandal2.classList.add('opacity-100', 'translate-y-0');
            }
        }
    } else {
        btn.classList.replace('bg-[#d4af37]/20', 'bg-black/50');
        btn.classList.replace('border-[#d4af37]', 'border-white/10');
        btn.classList.replace('text-[#d4af37]', 'text-slate-300');
        
        if (svg) {
            svg.classList.remove('opacity-100', 'scale-100', 'translate-y-0');
            svg.classList.add('opacity-0');
        }
        
        // PERBAIKAN BUG SANDAL: Menyembunyikan sandal yang kedua
        if (item === 'sandal') {
            const sandal2 = document.getElementById('svg-sandal2');
            if(sandal2) {
                sandal2.classList.remove('opacity-100', 'translate-y-0');
                sandal2.classList.add('opacity-0', 'translate-y-2');
            }
        }
    }

    if (ihramItems.izar && ihramItems.rida) {
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

    btn.classList.add('bg-rose-900/50', 'border-rose-500', 'text-rose-200');
    setTimeout(() => {
        btn.classList.remove('bg-rose-900/50', 'border-rose-500', 'text-rose-200');
    }, 1500);
}

window.resetIhramGame = function() {
    ['izar', 'rida', 'sandal', 'sabuk'].forEach(i => {
        ihramItems[i] = true; 
        toggleIhramItem(i);   
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

window.mulaiKuisMini2 = function() {
    document.getElementById('qz2-start-screen').classList.add('hidden');
    document.getElementById('qz2-content').classList.remove('hidden');
    ulangiKuisMini2();
}

window.ulangiKuisMini2 = function() {
    activeQuiz2 = shuffle([...masterQuizBank2]);
    mqIdx2 = 0;
    
    // Pastikan layar kuis terbuka
    document.getElementById('qz2-start-screen').classList.add('hidden');
    document.getElementById('qz2-content').classList.remove('hidden');
    
    renderMiniQuiz2();
}

window.renderMiniQuiz2 = function() {
    if(activeQuiz2.length === 0) activeQuiz2 = shuffle([...masterQuizBank2]);
    
    const card = document.getElementById('qz2-card');
    const btnContainer = document.getElementById('qz2-btn-container');
    const termEl = document.getElementById('qz2-term');

    // Jika kuis sudah habis
    if(mqIdx2 >= activeQuiz2.length) {
        termEl.innerHTML = `Kuis Selesai! 🎉`;
        document.getElementById('qz2-feedback-container').classList.add('hidden');
        btnContainer.classList.add('hidden');
        document.getElementById('qz2-next-container').classList.add('hidden');
        return;
    }
    
    const q = activeQuiz2[mqIdx2];
    document.getElementById('qz2-curr').innerText = mqIdx2 + 1;
    termEl.innerText = q.term; // Memasukkan pertanyaan ke layar
    
    // Kembalikan warna border kartu ke netral
    card.classList.remove('border-emerald-500', 'border-rose-500', 'border-4');
    card.classList.add('border-white/10', 'border');

    document.getElementById('qz2-feedback-container').classList.add('hidden');
    btnContainer.classList.remove('hidden');
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

    // Efek ketika menjawab benar atau salah
    if(isCorrect) {
        card.classList.replace('border-white/10', 'border-emerald-500');
        card.classList.replace('border', 'border-4');
        fbText.innerHTML = `<b class="text-emerald-400">Tepat.</b> ${q.expl}`;
    } else {
        card.classList.replace('border-white/10', 'border-rose-500');
        card.classList.replace('border', 'border-4');
        fbText.innerHTML = `<b class="text-rose-400">Belum Tepat.</b> ${q.expl}`;
    }
}

window.nextMiniQuiz2 = function() {
    mqIdx2++; 
    renderMiniQuiz2(); 
}
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
            document.getElementById('btn-niat').innerHTML = '🤲 Niat Ihrom';
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
    document.getElementById('btn-niat').innerHTML = '🤲 Niat Ihrom';
    
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
    
    // Reset desain kotak hasil
    resBox.className = 'mt-8 p-5 rounded-xl border font-medium text-center shadow-lg relative z-20 transition-all block';
    
    if (status === "makruh") {
        resBox.classList.add('bg-amber-900/80', 'text-amber-200', 'border-amber-500');
        resBox.innerHTML = `<b>⚠️ Terlalu Cepat (Sah, tetapi Makruh):</b> Anda berniat ihram sebelum miqat (pesawat belum menyentuh garis Yalamlam).`;
    } else if (status === "sah") {
        resBox.classList.add('bg-emerald-900/80', 'text-emerald-200', 'border-emerald-500');
        resBox.innerHTML = `<b>✅ Sempurna:</b> Anda berniat tepat saat pesawat melintasi garis Miqat Yalamlam. Umrah Anda sah.`;
    } else if (status === "terlewat_bandara") {
        resBox.classList.add('bg-rose-900/80', 'text-rose-200', 'border-rose-500');
        resBox.innerHTML = `<b>🚨 Terlewat Miqat:</b> Anda berniat saat sudah tiba di Bandara Jeddah (melewati miqat). Wajib kembali ke miqat atau membayar Dam.`;
    } else {
        resBox.classList.add('bg-rose-900/80', 'text-rose-200', 'border-rose-500');
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

window.mulaiKuisMini3 = function() {
    document.getElementById('qz3-start-screen').classList.add('hidden');
    document.getElementById('qz3-content').classList.remove('hidden');
    ulangiKuisMini3();
}

window.ulangiKuisMini3 = function() {
    activeQuiz3 = shuffle([...masterQuizBank3]);
    mqIdx3 = 0;
    
    document.getElementById('qz3-start-screen').classList.add('hidden');
    document.getElementById('qz3-content').classList.remove('hidden');
    
    renderMiniQuiz3();
}

window.renderMiniQuiz3 = function() {
    if(activeQuiz3.length === 0) activeQuiz3 = shuffle([...masterQuizBank3]);
    
    const card = document.getElementById('qz3-card');
    const btnContainer = document.getElementById('qz3-btn-container');
    const termEl = document.getElementById('qz3-term');

    if(mqIdx3 >= activeQuiz3.length) {
        termEl.innerHTML = `Kuis Selesai! 🎉`;
        document.getElementById('qz3-feedback-container').classList.add('hidden');
        btnContainer.classList.add('hidden');
        document.getElementById('qz3-next-container').classList.add('hidden');
        return;
    }
    
    const q = activeQuiz3[mqIdx3];
    document.getElementById('qz3-curr').innerText = mqIdx3 + 1;
    termEl.innerText = q.term; 
    
    card.classList.remove('border-emerald-500', 'border-rose-500', 'border-4');
    card.classList.add('border-white/10', 'border');

    document.getElementById('qz3-feedback-container').classList.add('hidden');
    btnContainer.classList.remove('hidden');
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
        card.classList.replace('border-white/10', 'border-emerald-500');
        card.classList.replace('border', 'border-4');
        fbText.innerHTML = `<b class="text-emerald-400">Tepat.</b> ${q.expl}`;
    } else {
        card.classList.replace('border-white/10', 'border-rose-500');
        card.classList.replace('border', 'border-4');
        fbText.innerHTML = `<b class="text-rose-400">Belum Tepat.</b> ${q.expl}`;
    }
}

window.nextMiniQuiz3 = function() { 
    mqIdx3++; 
    renderMiniQuiz3(); 
}