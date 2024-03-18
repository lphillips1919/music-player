const createPlaylistButton = document.getElementById("createPlaylist");
const AddSongButton = document.getElementById("addSong");

const defaultSongOne = new Song("Night Owl", "Broke For Free", "https://images.pexels.com/photos/2264753/pexels-photo-2264753.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250", "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/WFMU/Broke_For_Free/Directionless_EP/Broke_For_Free_-_01_-_Night_Owl.mp3")

class Song {

    constructor(a, t, i, p) {
        this.author = a;
        this.title = t;
        this.image = i;
        this.path = p;
    }

    author = "";
    title = "";
    image = "";
    path = "";
}

class Playlist {

    constructor(name) {
        this.name = name;
    }

    ChangeName(newName) {
        this.name = newName;

    }

    AddSong(file) {
        this.songs.push(file);

    }

    RemoveSong(file) {
        let temp = this.songs.indexOf(file);
        this.songs = this.songs.splice(temp, 1);

    }

    GetSongs(i) {
        return songs[i];
    }

    name = ""
    songs = [];
}

let playlistArray = [];

function CreatePlaylist(name) {
    playlistArray.push(new Playlist(name));

}

function DeletePlaylist(name) {
    let temp = playlistArray.indexOf(name);
    playlistArray = playlistArray.splice(temp, 1);

}

function AddSongTPlaylist(song) {
    playlistArray[0].AddSong(song);
}

createPlaylistButton.addEventListener("click", CreatePlaylist("Default Playlist"));
AddSongButton.addEventListener("click", AddSongTPlaylist(defaultSongOne));