const createPlaylistButton = document.getElementById("createPlaylist");
const AddSongButton = document.getElementById("addSong");
const playlistPageLink = document.getElementsByClassName('dynamicLink')

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

    constructor(name, thumbnail) {
        this.name = name;
        this.thumbnail = thumbnail;
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

    GetSong(i) {
        return songs[i];
    }

    name = "";
    songs = [];
    thumbnail = "";
}

let playlistArray = [];

function CreatePlaylist(name) {
    playlistArray.push(new Playlist(name));

    localStorage.setItem("Playlists", playlistArray)

}

function DeletePlaylist(name) {
    let temp = playlistArray.indexOf(name);
    playlistArray = playlistArray.splice(temp, 1);

}

function AddSongToPlaylist(index, song) {
    playlistArray[index].AddSong(song);
}

function UpdateLinks() {
    for (var i = 0; i < playlistPageLink.length; i++) {
        let temp = './PlaylistInfoPage/playlistInfo.html?index=' + i +"&name=" + playlistArray[i].name;

        playlistPageLink[i].href = temp;

    }
    /*playlistPageLink.forEach(element => {
        element.href = './temp.html';
        console.log(playlistPageLink.href)
        console.log("in loop")

    });*/

    //playlistPageLink.href = './temp.html';

}


function ContentLoad() {
    CreatePlaylist("Playlist One");
    for (var i = 0; i <5; i++) {
        AddSongToPlaylist(0, defaultSongOne);
    }
    UpdateLinks();

}

const defaultSongOne = new Song("Night Owl", "Broke For Free", "https://images.pexels.com/photos/2264753/pexels-photo-2264753.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250", "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/WFMU/Broke_For_Free/Directionless_EP/Broke_For_Free_-_01_-_Night_Owl.mp3")

createPlaylistButton.addEventListener("click", function () {CreatePlaylist("Default Playlist")}, false);

AddSongButton.addEventListener("click", function () {AddSongToPlaylist(0,defaultSongOne)}, false);

document.addEventListener("DOMContentLoaded", function () {ContentLoad()}, false);


