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

$("#lari").on("mouseenter", function (e) {
  var tombol = $(this);
  
  
  if (tombol.hasClass("terkejar")) return;

  var windowWidth = $(window).width();
  var windowHeight = $(window).height();
  var tombolWidth = tombol.outerWidth();
  var tombolHeight = tombol.outerHeight();

  var maxY = windowHeight - tombolHeight - 20;

  maxX = Math.max(20, maxX);
  maxY = Math.max(20, maxY);

  var randomX = Math.floor(Math.random() * maxX) + 10;
  var randomY = Math.floor(Math.random() * maxY) + 10;

  var randomRotate = Math.floor(Math.random() * 360);

  tombol.css({
    "position": "fixed", 
    "left": randomX + "px",
    "top": randomY + "px",
    "transform": "rotate(" + randomRotate + "deg)",
    "z-index": "9999" 
  });
});
$(document).ready(function () {
  var envelope = $("#envelope");
  var btn_open = $("#open");
  var btn_reset = $("#reset");
  var btn_lari = $("#lari");

  function getRandomPosition() {
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    var btnWidth = btn_lari.outerWidth();
    var btnHeight = btn_lari.outerHeight();

    var maxX = windowWidth - btnWidth - 20;
    var maxY = windowHeight - btnHeight - 20;

    // Pastikan tidak negatif
    maxX = Math.max(10, maxX);
    maxY = Math.max(10, maxY);

    var randomX = Math.floor(Math.random() * (maxX - 10 + 1)) + 10;
    var randomY = Math.floor(Math.random() * (maxY - 10 + 1)) + 10;

    return { x: randomX, y: randomY };
  }

  btn_lari.on("mouseenter", function (e) {
    if (btn_lari.hasClass("tertangkap")) return;

    var pos = getRandomPosition();
    var randomRotate = Math.floor(Math.random() * 360); 
    btn_lari.css({
      left: pos.x + "px",
      top: pos.y + "px",
      transform: "rotate(" + randomRotate + "deg)"
    });
  });
  btn_lari.on("click", function () {
    if (btn_lari.hasClass("tertangkap")) return;
    
    btn_lari.addClass("tertangkap");
    btn_lari.text("Yah, ketangkap! 😝");

    btn_lari.css({
      left: "",    
      top: "",
      transform: "rotate(0deg)"
    });

    
    setTimeout(function () {
      alert("Wah, kamu berhasil menangkap tombol ini! (kalo bukanya pake leptop pasti ga ketangkep)");
    }, 200);
  });

  
  $(window).on("resize", function () {
    if (!btn_lari.hasClass("tertangkap")) {
      var currentLeft = parseInt(btn_lari.css("left"), 10);
      var currentTop = parseInt(btn_lari.css("top"), 10);
      var btnWidth = btn_lari.outerWidth();
      var btnHeight = btn_lari.outerHeight();
      var windowWidth = $(window).width();
      var windowHeight = $(window).height();
      
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

  }
});
