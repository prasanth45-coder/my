
    const songs = [
    {
        title: 'Katchi sera',
        thumbnail: './assets/thumbnails/Criminal.jpg',
        path: './assets/songs/Katchi Sera.mp3',
        artist: 'Sai Abhyankkar - MassTamilan '
    },
    {
        title: 'Kuru kuru',
        thumbnail: './assets/thumbnails/Drama_Queen.jpg',
        path: './assets/songs/Kuru-Kuru.mp3',
        artist: '  sundar narayana  '
    },
    {
        title: 'Neela nilave',
        thumbnail: './assets/thumbnails/Fantasize.jpg',
        path: './assets/songs/Neela Nilave - RDX-(PagalSongs.Com.IN) (1).mp3',
        artist: 'kapi kapilan'
    },
    {
        title: 'Naan nee ',
        thumbnail: './assets/thumbnails/Kiya_Kiya.jpg',
        path: './assets/songs/Naan-Nee.mp3',
        artist: 'santhosh narayanan ',
    },
    {
        title: 'Railin oligan',
        thumbnail: './assets/thumbnails/Moonlight.jpg',
        path: './assets/songs/Railin Oligal.mp3',
        artist: 'Pradeep Kumar, Shakthisree Gopalan - MassTamilan;  '
    },
    {
        title: 'kesariya',
        thumbnail: './assets/thumbnails/Ordinary_Person.jpg',
        path: './assets/songs/hindi/1.mpeg',
        artist: 'pritam'
    },
    {
        title: 'heeriye',
        thumbnail: './assets/thumbnails/Thug_Le.jpg',
        path: './assets/songs/hindi/2.mpeg',
        artist: 'arijit singh'
    },
    {
        title: 'Kanavellam Neethane',
        thumbnail: './assets/thumbnails/Thumkeshwari.jpg',
        path: './assets/songs/Kanavellam Neethane(PagalWorld).mp3',
        artist: 'Sachin-Jigar and Rashmeet Kaur'
    },
    {
        title: 'Marudhaani-Marudhaani ',
        thumbnail: './assets/thumbnails/Tumhi_Ho_Bandhu.jpg',
        path: './assets/songs/Marudhaani-Marudhaani .mp3',
        artist: 'Neeraj Shridhar and Kavita Seth'
    },
    {
        title: 'Ennnamoh yedho',
        thumbnail: './assets/thumbnails/Uncha_Lamba_Kad.jpg',
        path: './assets/songs/Ennamo-Yeadho.mp3',
        artist: 'Anand Raj Anand and Kalpana Patowary'
    },
];

const title = document.querySelector('.title');
const artist = document.querySelector('.artist');
const player = document.querySelector('.player');
const h2 = document.getElementsByTagName('h2')[0];
let thumbnail = document.querySelector('.thumbnail');
const progress = document.getElementById('prg');
let songIndex = 0;
let audio = null;
let cplaying;

(() => {
    audio = new Audio(songs[songIndex].path);
    audio.addEventListener('ended', () => {
        songIndex++;
        playnext();
    })
    setTitle();
    setArtist();
    setThumbnail();
    setTotalDuration();

    play_pause.addEventListener('click', () => {
        setColour();
        playSong();
        play_pause.classList.toggle('fa-circle-pause');
    });
    previous.addEventListener('click', () => {
        progress.value = 0;
        audio.pause();
        (songIndex == 0) ? (songIndex = songs.length - 1) : (songIndex--);
        playaudio();
    });
    next.addEventListener('click', () => {
        progress.value = 0;
        audio.pause();
        (songIndex == (songs.length - 1)) ? (songIndex = 0) : (songIndex++);
        playaudio();
    });
})();


function setTitle() {
    title.innerText = songs[songIndex].title;
}

function setArtist() {
    artist.innerText = songs[songIndex].artist;
}

function setThumbnail() {
    thumbnail.style.background = `url(${songs[songIndex].thumbnail})`;
    thumbnail.style.backgroundPosition = 'center center';
    thumbnail.style.backgroundSize = 'cover';
}

function playSong() {
    (audio.paused) ? (() => {
        audio.play();
        cplaying.style.animationPlayState = 'running';
        thumbnail.style.animationPlayState = 'running';
    })() : (() => {
        audio.pause();
        cplaying.style.animationPlayState = 'paused';
        thumbnail.style.animationPlayState = 'paused';
    })();

}

function setTotalDuration() {
    let lastUpdateTime = 0;
    current_time.innerText = '00:00';
    audio.onloadedmetadata = () => {
        let songlength = audio.duration;
        let minutes = Math.floor(songlength / 60);
        songlength %= 60;
        let seconds = Math.floor(songlength);
        minutes = (minutes < 10) ? ('0' + minutes) : minutes;
        seconds = (seconds < 10) ? ('0' + seconds) : seconds;
        total_duration.innerText = `${minutes}:${seconds}`;
        audio.addEventListener('timeupdate', () => {
            if ((audio.currentTime - lastUpdateTime) >= 1) {
                updateCurrentTime(audio.duration);
                lastUpdateTime = audio.currentTime;
            }
        });
    }
}

function updateCurrentTime(songlength) {
    let currentTime = audio.currentTime;
    let minutes = Math.floor(currentTime / 60);
    currentTime %= 60;
    let seconds = Math.floor(currentTime);
    minutes = (minutes < 10) ? ('0' + minutes) : minutes;
    seconds = (seconds < 10) ? ('0' + seconds) : seconds;
    current_time.innerText = `${minutes}:${seconds}`;
    updateProgressBar(songlength, audio.currentTime);
}

function updateProgressBar(songlength, currentTime) {
    let value = (currentTime / songlength) * 100;
    progress.value = value;
    progress.addEventListener('change', () => {
        audio.currentTime = (progress.value * songlength) / 100;
    })
}

function playnext() {
    progress.value = 0;
    (songIndex == (songs.length - 1)) ? (songIndex = 0) : (songIndex++);
    let newThumbnail = thumbnail.cloneNode(true);
    thumbnail.parentNode.replaceChild(newThumbnail, thumbnail);
    thumbnail = newThumbnail;
    setThumbnail();
    setTitle();
    setArtist();
    audio = new Audio(songs[songIndex].path);
    playSong();
    setTotalDuration();
}

function playaudio() {
    audio = new Audio(songs[songIndex].path);
    audio.addEventListener('ended', () => {
        playnext();
    })
    setTitle();
    setArtist();
    if (play_pause.classList.contains('fa-circle-pause')) {
        playSong();
        setColour();
    }
    setTotalDuration();
    let newThumbnail = thumbnail.cloneNode(true);
    thumbnail.parentNode.replaceChild(newThumbnail, thumbnail);
    thumbnail = newThumbnail;
    setThumbnail();
}


//PlayList Part
let playlistbox = document.querySelector('.playlist');
playlist.addEventListener('click', () => {
    playlistbox.classList.toggle('show');
})

window.addEventListener('click', (e) => {
    if (e.target !== playlist && e.target !== previous && e.target !== next && e.target !== play_pause && !e.target.classList.contains('songsList') && e.target !== progress) {
        playlistbox.classList.remove('show');
    }
})

songs.forEach((item, index) => {
    let newdiv = document.createElement('div');
    newdiv.classList.add('songsList');
    newdiv.innerText = (index + 1) + '.' + ' ' + item.title;
    playlistbox.appendChild(newdiv);
})

function setColour() {
    let tempitem = document.querySelectorAll('.playlist div');
    tempitem.forEach(z => {
        z.classList.remove('currentplaying');
    })
    tempitem[songIndex].classList.add('currentplaying');
    cplaying = document.querySelector('.currentplaying');
}

function playOnClick() {
    let playlistItems = document.querySelectorAll('.playlist div');
    playlistItems.forEach(e => {
        e.style.cursor = 'pointer';
        e.addEventListener('mouseover', () => {
            e.style.opacity = '0.7';

        });
        e.addEventListener('mouseleave', () => {
            e.style.opacity = '1';

        });
        e.addEventListener('click', () => {
            progress.value = '0';
            audio.pause();
            songIndex = parseInt(e.innerText.split('.')[0]) - 1;
            audio = new Audio(songs[songIndex].path);
            console.log(songIndex);
            audio.play();
            setThumbnail();
            setTitle();
            setArtist();
            setTotalDuration();
            setColour();
            play_pause.classList.add('fa-circle-pause');
        })
    })
}
playOnClick();


const container = document.querySelector('.containerc');

// Function to create floating music symbols
function createMusicSymbol() {
    const symbol = document.createElement('span');
    symbol.className = 'music-symbol';
    symbol.innerText = Math.random() > 0.5 ? '♪' : '♫';

    // Random position within the container width
    symbol.style.right = `${Math.random() * 50}px`; // Float within a smaller range
    symbol.style.animationDuration = `${2 + Math.random() * 3}s`; // Random float speed

    container.appendChild(symbol);

    // Remove the symbol after the animation ends
    setTimeout(() => {
        symbol.remove();
    }, 3000);
}

// Generate music symbols at intervals
setInterval(createMusicSymbol, 500);

document.addEventListener('DOMContentLoaded', function() {
    const minimizeBtn = document.getElementById('minimize');
    const playerContainer = document.querySelector('.player');

    minimizeBtn.addEventListener('click', function() {
        playerContainer.classList.toggle('minimized');
    });
});
