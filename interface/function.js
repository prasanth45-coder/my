window.onload = () => {
    const currentSong = JSON.parse(localStorage.getItem('currentSong'));
    
    if (currentSong) {
        const basePath = "../TEAM E";
        const fullPath = basePath + currentSong.audioUrl.substring(1);

        const minimizedContainer = document.getElementById('minimized_music_player');
        const footer = document.getElementById('footer');
        footer.style.display = 'block';
        document.querySelector('.title').textContent = currentSong.title;
        document.querySelector('.artist').textContent = currentSong.artist;
        document.querySelector('#current-time').textContent = currentSong.currentTime;
        document.querySelector('#total-duration').textContent = currentSong.duration;

        const progressBar = document.querySelector('#prg');
        function timeToSeconds(time) {
            if (typeof time === 'string' && time.includes(':')) {
                const [minutes, seconds] = time.split(':').map(Number);
                return (minutes * 60) + seconds;
            } else if (typeof time === 'number') {
                return time;
            } else {
                console.error("Invalid time format:", time);
                return 0;
            }
        }

        const currentMinutes = timeToSeconds(currentSong.currentTime);
        const totalMinutes = timeToSeconds(currentSong.duration);
        if (currentMinutes && totalMinutes) {
            progressBar.value = (currentMinutes / totalMinutes) * 100;
        } else {
            console.error("Error with time conversion");
        }
        const audioElement = document.getElementById('audio');
        const audioSource = document.getElementById('audio-source');
        audioSource.src = fullPath;
        audioElement.load();

        if (typeof currentSong.currentTime === 'string') {
            const currentTime = currentSong.currentTime.split(':');
            audioElement.currentTime = parseInt(currentTime[0]) * 60 + parseInt(currentTime[1]);
        } else {
            audioElement.currentTime = currentSong.currentTime;
        }

        // Play/Pause button functionality
        document.getElementById('play_pause').addEventListener('click', () => {
            if (audioElement.paused) {
                audioElement.play();
                document.getElementById('play_pause').classList.replace('fa-circle-play', 'fa-circle-pause');
            } else {
                audioElement.pause();
                document.getElementById('play_pause').classList.replace('fa-circle-pause', 'fa-circle-play');
            }
        });

        // Store the current time whenever it changes
        audioElement.addEventListener('timeupdate', () => {
            const minutes = Math.floor(audioElement.currentTime / 60);
            const seconds = Math.floor(audioElement.currentTime % 60);
            const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            localStorage.setItem('currentSong', JSON.stringify({
                ...currentSong,
                currentTime: formattedTime
            }));
            document.querySelector('#current-time').textContent = formattedTime;
        });

        // Remove the current song from local storage after it's loaded
        localStorage.removeItem('currentSong');
    }
};
