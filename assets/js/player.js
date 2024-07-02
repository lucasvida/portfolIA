/* Script */

const songName = document.getElementById("songName"); // ou querySelector('#songName');
const song = document.getElementById("audio"); // ou querySelector('#audio');
const bandName = document.getElementById("bandName"); // ou querySelector('#bandName');
const play = document.getElementById("play"); // ou querySelector('#play');
const next = document.getElementById("next"); // ou querySelector('#play');
const prev = document.getElementById("prev"); // ou querySelector('#play');
const cover = document.getElementById("cover"); // ou querySelector('#cover');
const shuffleButton = document.getElementById("shuffle"); // ou querySelector('#cover');
const repeat = document.getElementById("repeat"); // ou querySlector("#repeat");
const progressBar = document.getElementById("progresso-atual");
const progressMusic = document.getElementById("progress-music");

/*Musicas Objetos*/

const musicOne = {
  songName: "Crazy Love Madness",
  artist: "Suno",
  file: "CrazyLoveMadness",
};

const musicTwo = {
  songName: "Vidas Desalinhadas",
  artist: "Suno",
  file: "VidaDesalinhada",
};

const musicThree = {
  songName: "Whats Love",
  artist: "Suno",
  file: "WhatsLove",
};

//Playlist
let playList = [musicOne, musicTwo, musicThree];
let sortedPlaylist = [...playList]; // ... Três pontos = spread

let currentSong = 0;

let exe = false;
let isShuffled = false;

play.addEventListener("click", () => {
  if (exe == false) {
    song.play();
    exe = true;
    play.innerHTML = '<i class="bi bi-pause-circle-fill"></i>';
  } else {
    song.pause();
    exe = false;
    play.innerHTML = '<i class="bi bi-play-circle-fill">';
  }
});

/* Next e Prev */

prev.addEventListener("click", () => {
  if (currentSong === 0) {
    currentSong = sortedPlaylist.length - 1;
  } else {
    currentSong = currentSong - 1;
  }
  initializeSong();
  exe = true;
  play.innerHTML = '<i class="bi bi-pause-circle-fill"></i>';
  song.play();
});

next.addEventListener("click", () => {
  if (currentSong === sortedPlaylist.length - 1) {
    currentSong = 0;
  } else {
    currentSong = currentSong + 1;
  }
  initializeSong();
  exe = true;
  play.innerHTML = '<i class="bi bi-pause-circle-fill"></i>';
  song.play();
});

//Shufle

function shuffleArray(preShuffleArray) {
  const size = preShuffleArray.length;
  let currentIndex = size - 1;
  while (currentIndex > 0) {
    let randomIndex = Math.floor(Math.random() * size);
    let aux = preShuffleArray[currentIndex];
    preShuffleArray[currentIndex] = preShuffleArray[randomIndex];
    preShuffleArray[randomIndex] = aux;
    currentIndex -= 1;
  }
}

function shuffleButtonClicked() {
  if (isShuffled === false) {
    isShuffled = true;
    shuffleArray(sortedPlaylist);
    shuffleButton.classList.add("button-active");
  } else {
    isShuffled = false;
    sortedPlaylist = [...playList];
    shuffleButton.classList.remove("button-active");
  }
}

song.addEventListener("timeupdate", () => {
  const barWidth = (song.currentTime / song.duration) * 100;
  progressBar.style.setProperty("--progress-bar", `${barWidth}%`);
});

progressMusic.addEventListener("click", (event) => {
  const width = progressMusic.clientWidth;
  const clickPosition = event.offsetX;
  const jumptoTime = (clickPosition / width) * song.duration;
  song.currentTime = jumptoTime;
});

function initializeSong() {
  songName.innerText = sortedPlaylist[currentSong].songName;
  bandName.innerText = sortedPlaylist[currentSong].artist;
  song.src = `./assets/songs/${sortedPlaylist[currentSong].file}.mp3`;
  cover.src = `./assets/img/${sortedPlaylist[currentSong].file}.jpg`;
}

initializeSong();
shuffleButton.addEventListener("click", shuffleButtonClicked);
