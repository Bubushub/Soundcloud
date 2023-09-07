let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
    {
        img : 'https://i.scdn.co/image/ab67616d0000b27325d7f0d0437a0a55386d7ece',
        name : 'INSTASAMKA Отключаю телефон',
        artist : '',
        music : 'insta.mp3'
    },
    {
        img : 'https://i.scdn.co/image/ab67616d0000b273fb48a126d3d2b46810f44209',
        name : 'Bloddy Mary X Dum Dum',
        artist : '',
        music : 'bloody.mp3'
    },
    {
        img : 'https://i.ytimg.com/vi/5W0PC1EpoK0/maxresdefault.jpg',
        name : 'Desh Pakisztan/popo',
        artist : '',
        music : 'pakisztani.mp3'
    },
    {
        img : 'https://i.ytimg.com/vi/kVfNv59ELVQ/maxresdefault.jpg',
        name : 'Kkevin Csak a szesz',
        artist : '',
        music : 'csaka.mp3'
    },
    {
        img : 'https://i.scdn.co/image/ab67616d0000b27336be7de7d26219b029d7e485',
        name : 'Baby gang mentalité',
        artist : '',
        music : 'babygang.mp3'
    },
    {
        img : 'https://i.ytimg.com/vi/WNBhWGO62ZQ/maxresdefault.jpg',
        name : 'BRUNO  ÖRDÖG NÓRIKA',
        artist : '',
        music : 'bruno.mp3'
    },
    {
        img : 'https://upload.wikimedia.org/wikipedia/en/6/66/In_the_Name_of_Love_Cover_Art_by_Bebe_Rexha_and_Martin_Garrix.jpeg',
        name : 'In The name of love',
        artist : '',
        music : 'inthe.mp3'
    },
    {
        img : 'https://i1.sndcdn.com/artworks-XxpFdkKghzPdeXGE-y3yzbw-t500x500.jpg',
        name : 'The Lost Soul Down',
        artist : '',
        music : 'lost.mp3'
    },
    {
        img : 'https://i1.sndcdn.com/artworks-J9Va6Szvss63-0-t500x500.png',
        name : 'It Goes Like',
        artist : '',
        music : 'nanana.mp3'
    },
    {
        img : 'https://i.ytimg.com/vi/CWozQTW7Fi0/maxresdefault.jpg',
        name : 'Fiatal Bajnokok',
        artist : '',
        music : 'fiatal.mp3'
    },
    {
        img : 'https://i.ytimg.com/vi/_83AOaZ3Iyg/maxresdefault.jpg',
        name : 'Je M appdlle',
        artist : '',
        music : 'jem.mp3'
    },
   
    {
        img : ' https://i1.sndcdn.com/artworks-wLLMbSeESTItNV0P-Fi80Vg-t500x500.jpg',
        name : 'Moulaga sped up',
        artist : '',
        music : 'moulaga.mp3'
    },
    {
        img : 'https://www.atempo.sk/images/hirek/2019/byealex-sleep.jpg',
        name : 'Lombok',
        artist : '',
        music : 'lombok.mp3'
    },
    {
        img : 'https://upload.wikimedia.org/wikipedia/en/1/18/Elley_Duh%C3%A9_-_Middle_of_the_Night.png',
        name : 'Middle of the night',
        artist : '',
        music : 'middle.mp3'
    },
    {
        img : 'https://i.ytimg.com/vi/EcOCb6veGao/maxresdefault.jpg',
        name : 'Daddy Rompe',
        artist : '',
        music : 'rompe.mp3'
    },
    
    

];


loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
    random_bg_color();
}

function random_bg_color(){
    let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
    let a;

    function populate(a){
        for(let i=0; i<6; i++){
            let x = Math.round(Math.random() * 14);
            let y = hex[x];
            a += y;
        }
        return a;
    }
    let Color1 = populate('#');
    let Color2 = populate('#');
    var angle = 'to right';

    let gradient = 'linear-gradient(' + angle + ',' + Color1 + ', ' + Color2 + ")";
    document.body.style.background = gradient;
}
function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}
function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}
function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}
function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    wave.classList.add('loader');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}

