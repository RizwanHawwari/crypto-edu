    // ---------- Data ----------
    const QUESTIONS = [
      {q: 'Apa itu Bitcoin?', a: ['Stablecoin yang dipatok ke USD','Mata uang digital terdesentralisasi pertama','Token ERC-20 di Ethereum','Sebuah jenis NFT'], correct:1},
      {q: 'Apa fungsi "private key" pada wallet kripto?', a:['Alamat publik untuk menerima token','Kata sandi untuk exchange','Kunci rahasia untuk menandatangani transaksi','Nama pengguna wallet'], correct:2},
      {q: 'Apa itu NFT?', a:['Token yang mewakili kepemilikan unik pada aset digital','Mata uang jaringan decentralized','Alat untuk mining','Protokol untuk staking'], correct:0},
      {q: 'Airdrop umumnya berarti?', a:['Distribusi token gratis atau promosi','Pembakaran token','Proses mining baru','Biaya transaksi di jaringan'], correct:0},
      {q: 'Apa itu smart contract?', a:['Kontrak fisik di notaris','Skrip otomatis di blockchain yang mengeksekusi saat kondisi terpenuhi','Aplikasi dompet','Tipe NFT'], correct:1},
      {q: 'Gas fee biasanya dibayar untuk?', a:['Membeli NFT di marketplace','Mengirim email','Memproses transaksi dan menjalankan smart contract','Menyimpan data di wallet'], correct:2},
      {q: 'Metode paling aman untuk menyimpan private key adalah?', a:['Menyimpannya di notepad online','Membagikannya ke teman','Menggunakan cold wallet / hardware wallet','Menulisnya di media sosial'], correct:2},
      {q: 'Stablecoin adalah?', a:['Token yang harga berubah cepat','Token yang nilainya dipatok ke aset stabil, mis. USD','Jenis altcoin yang hanya di Ethereum','Smart contract'], correct:1},
      {q: 'Apa itu DeFi?', a:['Desentralized Finance — layanan keuangan tanpa perantara','Framework pengembangan wallet','Exchange sentral','Jenis NFT'], correct:0},
      {q: 'Liquidity pool berfungsi untuk?', a:['Menyimpan NFT','Memungkinkan pertukaran aset di AMM tanpa order book','Mempercepat transaksi di Bitcoin','Menyimpan private key secara aman'], correct:1},
      {q: 'Salah satu tanda airdrop scam adalah?', a:['Proyek meminta seed phrase atau private key','Proyek menyediakan alamat Twitter','Proyek punya whitepaper','Proyek ada di GitHub'], correct:0},
      {q: 'ERC-20 adalah standar token di jaringan?', a:['Bitcoin','Solana','Ethereum','Polkadot'], correct:2},
      {q: 'Signing transaction berarti?', a:['Membayar gas fee dengan kartu kredit','Menandatangani transaksi dengan private key untuk menyetujui tindakan','Membuat NFT baru','Membuka akun exchange'], correct:1},
      {q: 'Apa itu staking?', a:['Menahan token di wallet untuk mendukung jaringan dan mendapat reward','Mencetak uang','Membuat NFT','Membeli token di exchange'], correct:0},
      {q: 'Flash loan adalah?', a:['Pinjaman tanpa bunga','Pinjaman kripto yang dipinjam & dikembalikan dalam satu transaksi','Tipe airdrop','Exchange terdesentralisasi'], correct:1},
      {q: 'Apa yang harus dilakukan sebelum ikut airdrop?', a:['Langsung kirim private key','Periksa reputasi proyek dan baca aturan resmi','Transfer semua dana ke proyek','Install extension random browser dari DM'], correct:1},
      {q: 'Cross-chain berarti?', a:['Token yang hanya bisa di satu chain','Interaksi dan transfer antar blockchain berbeda','Jenis wallet','Sebuah NFT'], correct:1},
      {q: 'Fork pada blockchain adalah?', a:['Pemisahan jaringan menjadi dua jalur karena perubahan protokol','Proses mining','Mekanisme smart contract','Jenis exchange'], correct:0},
      {q: 'Apa itu seed phrase?', a:['Serangkaian kata yang merepresentasikan private key untuk recovery wallet','Alamat publik wallet','Nama token','Smart contract'], correct:0},
      {q: 'Bagaimana cara mengurangi risiko saat mencoba airdrop baru?', a:['Gunakan wallet eksperimen, jangan berikan private key, verifikasi kontrak','Berikan private key ke developer','Gunakan wallet utama untuk semua airdrop','Membagikan screenshot dompet di forum'], correct:0}
    ];

    // ---------- Utilities & state ----------
    let currentIndex = 0;
    let answers = Array(QUESTIONS.length).fill(null);
    let timerInterval = null;
    let timeLeft = 60 * 20; // 20 menit

    // DOM
    const qIndexEl = document.getElementById('qIndex');
    const qTextEl = document.getElementById('qText');
    const optionsEl = document.getElementById('options');
    const startBtn = document.getElementById('startBtn');
    const quizCard = document.getElementById('quizCard');
    const resultCard = document.getElementById('resultCard');
    const scoreEl = document.getElementById('score');
    const finalScoreEl = document.getElementById('finalScore');
    const resName = document.getElementById('resName');
    const resMessage = document.getElementById('resMessage');
    const playerNameInput = document.getElementById('playerName');
    const bestScoreEl = document.getElementById('bestScore');
    const mainProgressEl = document.getElementById('mainProgress');
    const timerEl = document.getElementById('timer');

    // Load best score
    function loadBest() {
      const b = localStorage.getItem('ce_best');
      if (b) bestScoreEl.textContent = b;
    }
    loadBest();

    // Render question
    function renderQuestion(i) {
      const Q = QUESTIONS[i];
      qIndexEl.textContent = i + 1;
      qTextEl.textContent = Q.q;
      optionsEl.innerHTML = '';
      Q.a.forEach((opt, idx) => {
        const div = document.createElement('div');
        div.className = 'option';
        div.tabIndex = 0;
        div.textContent = opt;
        if (answers[i] === idx) div.classList.add('selected');
        div.addEventListener('click', () => selectOption(i, idx, div));
        div.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') selectOption(i, idx, div);
        });
        optionsEl.appendChild(div);
      });
    }

    function selectOption(qi, optIdx, el) {
      answers[qi] = optIdx;
      Array.from(optionsEl.children).forEach(c => c.classList.remove('selected'));
      el.classList.add('selected');
      updateScorePreview();
    }

    function updateScorePreview() {
      const s = answers.reduce((acc, a, idx) => a === QUESTIONS[idx].correct ? acc + 1 : acc, 0);
      scoreEl.textContent = s;
      mainProgressEl.style.width = Math.round((s / QUESTIONS.length) * 100) + '%';
    }

    document.getElementById('prevBtn').addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        renderQuestion(currentIndex);
      }
    });

    document.getElementById('nextBtn').addEventListener('click', () => {
      if (currentIndex < QUESTIONS.length - 1) {
        currentIndex++;
        renderQuestion(currentIndex);
      }
    });

    document.getElementById('submitBtn').addEventListener('click', submitQuiz);

    document.getElementById('resetBtn').addEventListener('click', () => {
      if (confirm('Reset jawaban dan mulai ulang kuis?')) {
        answers = Array(QUESTIONS.length).fill(null);
        currentIndex = 0;
        renderQuestion(0);
        updateScorePreview();
        localStorage.removeItem('ce_answers');
      }
    });

    document.getElementById('retryBtn').addEventListener('click', () => {
      resultCard.style.display = 'none';
      quizCard.style.display = 'block';
      answers = Array(QUESTIONS.length).fill(null);
      currentIndex = 0;
      renderQuestion(0);
      updateScorePreview();
      startTimer();
    });

    document.getElementById('shareBtn').addEventListener('click', () => {
      const txt = `${playerNameInput.value || 'Peserta'} mendapat skor ${finalScoreEl.textContent}/20 di CryptoEdu! Coba kuisnya:`;
      if (navigator.share) {
        navigator.share({ title: 'Hasil CryptoEdu', text: txt }).catch(() => alert('Gagal share'));
      } else {
        navigator.clipboard.writeText(txt);
        alert('Teks hasil disalin ke clipboard!');
      }
    });

    function submitQuiz() {
      if (!confirm('Kumpulkan jawaban dan lihat hasil?')) return;
      clearInterval(timerInterval);
      const s = answers.reduce((acc, a, idx) => a === QUESTIONS[idx].correct ? acc + 1 : acc, 0);
      finalScoreEl.textContent = s;
      resName.textContent = playerNameInput.value || 'Peserta';
      resultCard.style.display = 'block';
      quizCard.style.display = 'none';
      resMessage.textContent = getMessage(s);

      // Simpan skor tertinggi
      const prev = parseInt(localStorage.getItem('ce_best') || '0', 10);
      if (s > prev) {
        localStorage.setItem('ce_best', s);
        loadBest();
      }

      saveSession();
    }

    function getMessage(score) {
      if (score === 20) return 'Sempurna! Kamu paham semua konsep dasar kripto & airdrop.';
      if (score >= 14) return 'Bagus! Pemahamanmu di atas rata-rata.';
      if (score >= 8) return 'Cukup. Lakukan review di beberapa topik untuk tingkatkan skor.';
      return 'Perlu latihan lebih. Baca kembali materi dasar & tips airdrop.';
    }

    // Start quiz
    startBtn.addEventListener('click', () => {
      const name = playerNameInput.value.trim();
      if (!name) {
        if (!confirm('Kamu belum mengisi nama — lanjut tanpa nama?')) return;
      }
      quizCard.style.display = 'block';
      resultCard.style.display = 'none';
      renderQuestion(currentIndex);
      updateScorePreview();
      startTimer();
    });

    // Timer
    function startTimer() {
      clearInterval(timerInterval);
      timeLeft = QUESTIONS.length * 60; // 1 menit per soal
      updateTimerDisplay();
      timerInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
          clearInterval(timerInterval);
          alert('Waktu habis — kuis otomatis dikumpulkan.');
          submitQuiz();
        }
        updateTimerDisplay();
      }, 1000);
    }

    function updateTimerDisplay() {
      const m = Math.floor(timeLeft / 60).toString().padStart(2, '0');
      const s = (timeLeft % 60).toString().padStart(2, '0');
      timerEl.textContent = `${m}:${s}`;
    }

    // Save & load session
    function saveSession() {
      const payload = {
        name: playerNameInput.value || '',
        answers,
        timeLeft,
        timestamp: Date.now()
      };
      localStorage.setItem('ce_session', JSON.stringify(payload));
    }

    function loadSession() {
      const raw = localStorage.getItem('ce_session');
      if (!raw) return;
      try {
        const p = JSON.parse(raw);
        playerNameInput.value = p.name || '';
        if (p.answers) answers = p.answers;
        updateScorePreview();
      } catch (e) {}
    }
    loadSession();

    // Search filter
    document.getElementById('searchInput').addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase();
      document.querySelectorAll('.lesson-card').forEach(card => {
        const txt = card.textContent.toLowerCase();
        card.style.display = txt.includes(q) ? 'flex' : 'none';
      });
    });

    // Save profile
    document.getElementById('saveProfileBtn').addEventListener('click', () => {
      const name = prompt('Masukkan nama untuk disimpan di profil (akan disimpan di browser):', localStorage.getItem('ce_name') || '');
      if (name !== null) {
        localStorage.setItem('ce_name', name);
        playerNameInput.value = name;
        alert('Nama tersimpan.');
      }
    });

    playerNameInput.addEventListener('blur', () => {
      if (playerNameInput.value.trim()) {
        localStorage.setItem('ce_name', playerNameInput.value.trim());
      }
    });

    // Keyboard shortcuts
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') document.getElementById('nextBtn').click();
      if (e.key === 'ArrowLeft') document.getElementById('prevBtn').click();
    });

    window.addEventListener('beforeunload', () => saveSession());

    // Init
    (function init() {
      const saved = localStorage.getItem('ce_name');
      if (saved) playerNameInput.value = saved;
      renderQuestion(0);
      updateScorePreview();
    })();

    // Accessibility focus
    document.addEventListener('focusin', (e) => {
      if (e.target.classList.contains('option')) {
        e.target.style.outline = '2px solid rgba(124,92,255,0.2)';
      }
    });
    document.addEventListener('focusout', (e) => {
      if (e.target.classList.contains('option')) {
        e.target.style.outline = '';
      }
    });