const openBtn = document.getElementById("open-btn");
const closeBtn = document.getElementById("close-btn");
const cover = document.getElementById("cover");
const page = document.getElementById("page");
const music = document.getElementById("bg-music");

// === BALLOON SETUP ===
const canvas = document.getElementById("balloon-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let balloons = [];
let animationId = null;
let balloonTimer = null;

// === BUAT BALON SECARA ACAK ===
function createBalloon() {
    const x = Math.random() * canvas.width;
    const y = canvas.height + 100;
    const radius = 15 + Math.random() * 20;
    const color = ["#ffb6b9", "#fde2e4", "#ffcad4", "#f8edeb"][
        Math.floor(Math.random() * 4)
    ];
    const speed = 1 + Math.random() * 2;

    balloons.push({ x, y, radius, color, speed });
}

// === ANIMASI BALON ===
function animateBalloons() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balloons.forEach((b, i) => {
        b.y -= b.speed;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.fill();
        if (b.y + b.radius < 0) balloons.splice(i, 1);
    });

    animationId = requestAnimationFrame(animateBalloons);
}

// === JALANKAN BALON SELAMA DURASI ===
function startBalloons(duration = 5000) {
    clearInterval(balloonTimer);

    // Hanya jalankan animasi jika belum berjalan
    if (!animationId) animateBalloons();

    const endTime = Date.now() + duration;

    balloonTimer = setInterval(() => {
        if (Date.now() < endTime) {
            createBalloon();
        } else {
            clearInterval(balloonTimer);

            // Setelah selesai, beri delay 500ms untuk animasi terakhir
            setTimeout(() => {
                cancelAnimationFrame(animationId);
                animationId = null;
                balloons.length = 0; // Hapus semua balon dari array
                ctx.clearRect(0, 0, canvas.width, canvas.height); // Bersihkan canvas
            }, 500);
        }
    }, 200);
}

// === KETIKA OPEN DITEKAN ===
openBtn.addEventListener("click", () => {
    cover.style.transform = "rotateY(-180deg)";
    page.style.transform = "rotateY(0deg)";
    music.play();
    startBalloons(15000); // 🎈 tampilkan balon 15 detik
});

// === KETIKA CLOSE DITEKAN ===
closeBtn.addEventListener("click", () => {
    cover.style.transform = "rotateY(0deg)";
    page.style.transform = "rotateY(180deg)";
    music.pause();
    music.currentTime = 0;
});

// === BALON MUNCUL SAAT FOTO DIKLIK ===
document.querySelectorAll(".gallery img").forEach((img) => {
    img.addEventListener("click", () => {
        startBalloons(5000); // 🎈 tampilkan balon 5 detik
    });
});
