window.onload = () => {
    const currentSong = JSON.parse(localStorage.getItem('currentSong'));
    
    if (currentSong) {
        const basePath = "../TEAM E";
        const fullPath = basePath + currentSong.audioUrl.substring(1); // Correctly concatenate the path
        console.log("Audio url: " + fullPath);

        const minimizedContainer = document.getElementById('minimized_music_player');
        const footer = document.getElementById('footer');
        footer.style.display = 'block';
        document.querySelector('.title').textContent = currentSong.title;
        document.querySelector('.artist').textContent = currentSong.artist;
        document.querySelector('#current-time').textContent = currentSong.currentTime;
        document.querySelector('#total-duration').textContent = currentSong.duration;
        
        const progressBar = document.querySelector('#prg');

        // Function to convert time format mm:ss to total seconds
        function timeToSeconds(time) {
            if (typeof time === 'string' && time.includes(':')) {
                const [minutes, seconds] = time.split(':').map(Number);
                return (minutes * 60) + seconds;
            } else if (typeof time === 'number') {
                return time; // Time is already in seconds
            } else {
                console.error("Invalid time format:", time);
                return 0;
            }
        }

        // Calculate progress
        const currentMinutes = timeToSeconds(currentSong.currentTime);
        const totalMinutes = timeToSeconds(currentSong.duration);
        progressBar.value = (currentMinutes / totalMinutes) * 100;

        // Apply custom styles to the minimized container
        // minimizedContainer.style.position = 'fixed';
        // minimizedContainer.style.bottom = '10px';
        // minimizedContainer.style.left = '50%';
        // minimizedContainer.style.transform = 'translateX(-50%)';
        // minimizedContainer.style.background = 'rgba(0, 0, 0, 0.8)';
        // minimizedContainer.style.color = 'white';
        // minimizedContainer.style.padding = '10px';
        // minimizedContainer.style.borderRadius = '10px';
        // minimizedContainer.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
        // minimizedContainer.style.width = '250px';

        // Setup audio player
        const audioElement = document.getElementById('audio');
        const audioSource = document.getElementById('audio-source');
        audioSource.src = fullPath;
        audioElement.load();

        // Set the current time for the audio
        const currentTime = currentSong.currentTime.split(':');
        audioElement.currentTime = parseInt(currentTime[0]) * 60 + parseInt(currentTime[1]);

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
