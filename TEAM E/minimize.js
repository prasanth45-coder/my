window.addEventListener('load', () => {
    if (localStorage.getItem('currentSong')) {
        
        localStorage.removeItem('currentSong');
    }
    const minimizeButton = document.getElementById('minimize');
    minimizeButton.addEventListener('click', function() {
        const currentSong = {
            title: songs[songIndex].title,
            artist: songs[songIndex].artist,
            currentTime: audio.currentTime,
            duration: audio.duration,
            audioUrl: songs[songIndex].path,
        };
        localStorage.setItem('currentSong', JSON.stringify(currentSong));
        localStorage.setItem('userLogged','true');
        window.location.href = 'http://127.0.0.1:5500/my/interface/index.html';

    });
});
