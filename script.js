const msgEl = document.getElementById("msg");

const randomNum = getRandomNumber();

console.log("Number:", randomNum);

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// Start recognition and game
recognition.start();

// Capture user speak
function onSpeak(e) {
  const msg = e.results[0][0].transcript;

  writeMessage(msg);
  checkNumber(msg);
}

// Write what user speaks
function writeMessage(msg) {
  msgEl.innerHTML = `
    <div>tebakanmu: </div>
    <span class="box">${msg}</span>
  `;
}

// Check msg against number
function checkNumber(msg) {
  const num = +msg;

  // Check if valid number
  if (Number.isNaN(num)) {
    msgEl.innerHTML += "<div>itu bukan angka yang valid</div>";
    return;
  }

  // Check in range
  if (num > 100 || num < 1) {
    msgEl.innerHTML += "<div>angka harus diantara 1 and 100</div>";
    return;
  }

  // Check number
  if (num === randomNum) {
    document.body.innerHTML = `
      <h2>selamat! kamu berhasil menebak angkanya! <br><br>
      benar angkanya ${num}</h2>
      <button class="play-again" id="play-again">bermain lagi</button>
    `;
  } else if (num > randomNum) {
    msgEl.innerHTML += "<div>LEBIH RENDAH LAGI</div>";
  } else {
    msgEl.innerHTML += "<div>LEBIH TINGGI LAGI</div>";
  }
}

// Generate random number
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

// Speak result
recognition.addEventListener("result", onSpeak);

// End SR service
recognition.addEventListener("end", () => recognition.start());

document.body.addEventListener("click", (e) => {
  if (e.target.id == "play-again") {
    window.location.reload();
  }
});

// loading
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

// super simple router - go to page specified in hash, otherwise go to "default"
function router(route) {
  const pageName = route ? route : $(".default.page").attr("data-page-name");
  const $page = $(`[data-page-name="${pageName}"]`);
  $(".page").css("display", "none");
  $("[data-page]").removeClass("active");
  $(`[data-page="${pageName}"]`).addClass("active");
  $page.css("display", "block");
}
router();

// fake loader
let progress = 0;
const fakeLoaderInterval = window.setInterval(function () {
  const $lp = $(".loading-progress");
  progress = progress + getRandomArbitrary(3, 25);
  $lp.css("transform", `translateX(${progress}%)`);

  if (progress >= 75) {
    window.clearInterval(fakeLoaderInterval);
    $lp.css("transform", "translateX(100%)");
    setTimeout(() => $(".loading").css("transform", "translateY(calc(100% + 10px))"), 400);
  }
}, getRandomArbitrary(100, 500));
