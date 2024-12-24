let isBackgroundPlaying = false; // Theo dõi trạng thái nhạc nền
let currentGiftAudio = null; // Theo dõi nhạc của hộp quà đang phát

  // Hàm để bắt đầu trải nghiệm
  function startExperience() {
    // Phát nhạc nền
    const backgroundAudio = document.getElementById("background-audio");
    
    const playPromise = backgroundAudio.play();
    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                console.log("Nhạc nền đang phát!");
                isBackgroundPlaying = true;
            })
            .catch((error) => {
                console.error("Không thể phát nhạc nền:", error);
                setTimeout(playBackgroundAudio, 100);
            });
    }
    
    // Ẩn màn hình chào mừng
    const welcomeScreen = document.getElementById("welcome-screen");
    welcomeScreen.style.display = "none";
}


// Hàm mở hộp quà
function openGift(box) {
var paperId = box.getAttribute("data-text");
var paper = document.getElementById(paperId);

// Tạm dừng nhạc nền
const backgroundAudio = document.getElementById("background-audio");
if (isBackgroundPlaying) {
backgroundAudio.pause();
isBackgroundPlaying = false;
}

// Phát nhạc riêng cho hộp quà
const giftAudioId = box.getAttribute("data-audio"); // Lấy ID audio từ thuộc tính data
const giftAudio = document.getElementById(giftAudioId);
if (currentGiftAudio) {
currentGiftAudio.pause();
currentGiftAudio.currentTime = 0;
}
currentGiftAudio = giftAudio;
giftAudio.play();

// Show the paper with animation
paper.style.display = "block";
paper.style.animation = "showPaper 0.5s forwards";

var contentElements = paper.querySelectorAll(".paper-content > *");
contentElements.forEach((element, index) => {
element.style.animation = `contentAppear 0.5s ease ${index * 0.3}s forwards`;
});

box.style.animation = "hideGiftBox 0.5s forwards";


}

function closePaper(paperId) {
var paper = document.getElementById(paperId);
var contentElements = paper.querySelectorAll(".paper-content > *");

contentElements.forEach((element) => {
element.style.animation = "contentDisappear 0.5s ease forwards";
});

// Dừng nhạc hộp quà
if (currentGiftAudio) {
currentGiftAudio.pause();
currentGiftAudio.currentTime = 0;
currentGiftAudio = null;
}

// Phát lại nhạc nền
const backgroundAudio = document.getElementById("background-audio");
if (!isBackgroundPlaying) {
backgroundAudio.play();
isBackgroundPlaying = true;
}

// Hide the paper after animation
paper.style.animation = "hidePaper 0.5s forwards";

setTimeout(function() {
paper.style.display = "none";

}, 500);
}


