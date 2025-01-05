window.onload = () => {
    const currentSong = JSON.parse(localStorage.getItem('currentSong'));
    if (currentSong) {
        console.log(currentSong);
        const minimizedContainer = document.getElementById('minimized_music_player');
        const footer = document.getElementById('footer');
        footer.style.display ='block';
        document.querySelector('.title').textContent = currentSong.title;
        document.querySelector('.artist').textContent = currentSong.artist;
        document.querySelector('#current-time').textContent = currentSong.currentTime;
        document.querySelector('#total-duration').textContent = currentSong.duration;
        const progressBar = document.querySelector('#prg');
        const currentMinutes = parseInt(currentSong.currentTime.split(':')[0]);
        const totalMinutes = parseInt(currentSong.duration.split(':')[0]);
        progressBar.value = (currentMinutes / totalMinutes) * 100;

        // Apply custom styles
        minimizedContainer.style.position = 'fixed';
        minimizedContainer.style.bottom = '10px';
        minimizedContainer.style.left = '50%';
        minimizedContainer.style.transform = 'translateX(-50%)';
        minimizedContainer.style.background = 'rgba(0, 0, 0, 0.8)';
        minimizedContainer.style.color = 'white';
        minimizedContainer.style.padding = '10px';
        minimizedContainer.style.borderRadius = '10px';
        minimizedContainer.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
        minimizedContainer.style.width = '250px';

        localStorage.removeItem('currentSong');
    }
};
