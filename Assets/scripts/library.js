document.addEventListener("DOMContentLoaded", () => {
    const emptyBox = document.getElementById("NoPlaylist");
    const playlistBox = document.getElementById("Playlists");

    document.querySelector("#createPlaylist").addEventListener("click", e => {
        e.preventDefault();
        emptyBox.style.display = 'none';
        playlistBox.style.display = 'block';

    })
})