$(document).ready(function () {
  var envelope = $("#envelope");
  var btn_open = $("#open");
  var btn_reset = $("#reset");

  envelope.click(function () {
    open();
  });
  btn_open.click(function () {
    open();
  });
  btn_reset.click(function () {
    close();
  });

  function open() {
    envelope.addClass("open").removeClass("close");
  }
  function close() {
    envelope.addClass("close").removeClass("open");
    document.getElementById("pesan-rahasia").style.display = "block";
  }
});

// Tombol lari (menghindar)
$("#lari").on("mouseenter", function (e) {
  var tombol = $(this);
  
  // Cek dulu apakah tombol sedang dalam mode "terkejar" (sudah diklik)
  if (tombol.hasClass("terkejar")) return;

  // Ambil ukuran window dan tombol
  var windowWidth = $(window).width();
  var windowHeight = $(window).height();
  var tombolWidth = tombol.outerWidth();
  var tombolHeight = tombol.outerHeight();

  // Hitung posisi maksimal agar tombol tidak keluar layar
  var maxX = windowWidth - tombolWidth - 20; // 20px margin dari tepi
  var maxY = windowHeight - tombolHeight - 20;

  // Kalau layar kecil, minimal posisi 0
  maxX = Math.max(20, maxX);
  maxY = Math.max(20, maxY);

  // Generate posisi acak
  var randomX = Math.floor(Math.random() * maxX) + 10;
  var randomY = Math.floor(Math.random() * maxY) + 10;

  // Generate sudut putar acak (0-360 derajat) biar tambah seru
  var randomRotate = Math.floor(Math.random() * 360);

  // Terapkan posisi dan rotasi baru
  tombol.css({
    "position": "fixed", // pakai fixed biar relatif ke window
    "left": randomX + "px",
    "top": randomY + "px",
    "transform": "rotate(" + randomRotate + "deg)",
    "z-index": "9999" // biar di atas elemen lain
  });
});
$(document).ready(function () {
  var envelope = $("#envelope");
  var btn_open = $("#open");
  var btn_reset = $("#reset");
  var btn_lari = $("#lari");

  // Fungsi untuk mendapatkan posisi acak di dalam layar
  function getRandomPosition() {
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    var btnWidth = btn_lari.outerWidth();
    var btnHeight = btn_lari.outerHeight();

    // Hitung batas maksimal agar tombol tidak keluar layar (dengan margin 10px)
    var maxX = windowWidth - btnWidth - 20;
    var maxY = windowHeight - btnHeight - 20;

    // Pastikan tidak negatif
    maxX = Math.max(10, maxX);
    maxY = Math.max(10, maxY);

    var randomX = Math.floor(Math.random() * (maxX - 10 + 1)) + 10;
    var randomY = Math.floor(Math.random() * (maxY - 10 + 1)) + 10;

    return { x: randomX, y: randomY };
  }

  // Event mouseenter: saat cursor memasuki tombol, tombol lari
  btn_lari.on("mouseenter", function (e) {
    // Jika tombol sudah dalam status "tertangkap", jangan lari lagi
    if (btn_lari.hasClass("tertangkap")) return;

    var pos = getRandomPosition();
    var randomRotate = Math.floor(Math.random() * 360); // sudut rotasi acak

    // Terapkan posisi dan rotasi baru dengan transisi halus
    btn_lari.css({
      left: pos.x + "px",
      top: pos.y + "px",
      transform: "rotate(" + randomRotate + "deg)"
    });
  });

  // Event click: saat tombol berhasil diklik
  btn_lari.on("click", function () {
    if (btn_lari.hasClass("tertangkap")) return;

    // Tandai sudah tertangkap
    btn_lari.addClass("tertangkap");
    btn_lari.text("Yah, ketangkap! 😝");

    // Kembalikan posisi ke tempat semula (misalnya di samping tombol Close)
    btn_lari.css({
      left: "",      // kosongkan agar kembali ke posisi default di flow layout
      top: "",
      transform: "rotate(0deg)"
    });

    // Opsional: beri alert atau redirect setelah tertangkap
    setTimeout(function () {
      alert("Wah, kamu berhasil menangkap tombol ini! ❤️");
    }, 200);
  });

  // Agar tombol tidak kabur saat window di-resize (opsional, agar tetap di dalam layar)
  $(window).on("resize", function () {
    if (!btn_lari.hasClass("tertangkap")) {
      // Jika tombol belum tertangkap, pastikan posisinya masih dalam batas layar
      var currentLeft = parseInt(btn_lari.css("left"), 10);
      var currentTop = parseInt(btn_lari.css("top"), 10);
      var btnWidth = btn_lari.outerWidth();
      var btnHeight = btn_lari.outerHeight();
      var windowWidth = $(window).width();
      var windowHeight = $(window).height();

      // Jika posisi keluar layar, pindahkan ke posisi aman
      if (currentLeft + btnWidth > windowWidth - 20) {
        currentLeft = windowWidth - btnWidth - 20;
      }
      if (currentTop + btnHeight > windowHeight - 20) {
        currentTop = windowHeight - btnHeight - 20;
      }
      if (currentLeft < 10) currentLeft = 10;
      if (currentTop < 10) currentTop = 10;

      btn_lari.css({
        left: currentLeft + "px",
        top: currentTop + "px"
      });
    }
  });

  // ====== Fungsi asli untuk amplop ======
  envelope.click(function () {
    open();
  });
  btn_open.click(function () {
    open();
  });
  btn_reset.click(function () {
    close();
  });

  function open() {
    envelope.addClass("open").removeClass("close");
  }
  function close() {
    envelope.addClass("close").removeClass("open");
    // Jika ingin redirect, tambahkan di sini
    // window.location.href = "https://...";
  }
});
