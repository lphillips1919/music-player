const indexValue = new URLSearchParams(window.location.search)
//const currentPlaylist = localStorage.getItem("Playlists")[indexValue]

const currentPlaylist = {
    name: "Default Playlist", 
    songs:[
        {name:"test",
        author:"Jimmy",
        path:"home",
        thumbnail:"https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250"},
        {name:"test",
        author:"Jimmy",
        path:"home",
        thumbnail:"https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250"}],
    thumbnail:"https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250"
}

const title = document.getElementById("playlistTitle")
const container = document.getElementById("songList")



function CreateStrips() {
    currentPlaylist.songs.forEach(element => {
        const songStrip = `
            <img src="${element.thumbnail}" class="strip-Image">
            <p class="strip-title" id="songTitle">${element.title}</p>
            <p class="strip-info" id="songInfo">${element.author}</p>`;

            container.innerHTML += songStrip;
        
    });

}

function UpdateInformation () {
    title.textContent = currentPlaylist.name;
    console.log(currentPlaylist.name)
    console.log(title.textContent)

}


function ContentLoaded () {
    UpdateInformation();
    CreateStrips();
    console.log("info")

}

document.addEventListener("DOMContentLoaded", function () {ContentLoaded()}, false);