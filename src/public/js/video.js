const socket = io();

const face = document.getElementById("face");
const muteBtn = document.getElementById("mute");
const cameraBtn = document.getElementById("camera");

let stream;
let muted = false;
let cameraOff = false;

const getMedia = async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true,
    });
    face.srcObject = stream;
  } catch (err) {
    console.error(err);
  }
};

getMedia();

const handleMuteClick = () => {
  if (!muted) {
    muteBtn.innerText = "Unmute";
    muted = true;
  } else {
    muteBtn.innerText = "Mute";
    muted = false;
  }
};

const handleCameraClick = () => {
  if (!!cameraOff) {
    cameraBtn.innerText = "Turn Camera Off";
    cameraOff = false;
  } else {
    cameraBtn.innerText = "Turn Camera On";
    cameraOff = true;
  }
};

muteBtn.addEventListener("click", handleMuteClick);
cameraBtn.addEventListener("click", handleCameraClick);
