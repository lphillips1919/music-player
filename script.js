let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");
let shuffleBtn = document.querySelector(".shuffle-track");
let loopBtn = document.querySelector(".loop-track");
 
let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
 
// Specify globally used values
let track_index = 0;
let isPlaying = false;
let isLooping = false;
let updateTimer;

let curr_track = document.createElement('audio');

// Some variables that Trevor was playing around with. We will hopefully be able to implement this better at a later date. I don't know Javascript!
let queue_index = 0;

function addToQueue(addedID) {
    // Adds a song to the queue when the + button is clicked. If the queue is currently empty, starts playing the music.
    if (queue_list.length == 0) {
        loadTrack(addedID);
    }
    queue_list.push(addedID);
    if (queue_list.length > 3) {
        console.log(queue_list[queue_list.length - 1]);
    }
}

// Define the tracks that have to be played
let track_list = [
    {
        name: "Night Owl",
        artist: "Broke For Free",
        image: "https://images.pexels.com/photos/2264753/pexels-photo-2264753.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
        path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/WFMU/Broke_For_Free/Directionless_EP/Broke_For_Free_-_01_-_Night_Owl.mp3"
    },
    {
        name: "Enthusiast",
        artist: "Tours",
        image: "https://images.pexels.com/photos/3100835/pexels-photo-3100835.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
        path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Tours/Enthusiast/Tours_-_01_-_Enthusiast.mp3"
    },
    {
        name: "Shipping Lanes",
        artist: "Chad Crouch",
        image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
        path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Arps/Chad_Crouch_-_Shipping_Lanes.mp3",
    },
    {
        name: "Against all odds",
        artist: "Nick Petrov",
        image: "https://cdn.bensound.com/image/cover/nickpetrov-pixeldreams.webp",
        path: "/Assets/Audio/againstallodds.mp3"
    },
    {
        name: "Follow the River",
        artist: "Ethereal 88",
        image: "https://www.free-stock-music.com/thumbnails/ethereal88-follow-the-river.jpg",
        path: "/Assets/Audio/ethereal88-follow-the-river.mp3"
    },
    {
        name: "Last Potatoe on Fire",
        artist: "Lobo Loco",
        image: "https://freemusicarchive.org/image/?file=album_image%2F3EIbW78YhfW3Oq0byETPzQfx6M9suAWIQnSZ0Zzl.jpg&width=290&height=290&type=album",
        path: "Assets/Audio/Lobo Loco - Last Potatoe on Fire (ID 2088).mp3"
    },
    {
        name: "Cover Girl",
        artist: "Beat Mekanik",
        image: "https://freemusicarchive.org/image/?file=track_image%2Fgn4SzIXBiH3kOVR1bDrKPshJkkTA9QufEBR6CdiR.jpg&width=290&height=290&type=track",
        path: "Assets/Audio/Beat Mekanik - Cover Girl.mp3"
    },
    {
        name: "1st Contact",
        artist: "Der Weg",
        image: "https://freemusicarchive.org/image/?file=track_image%2FKlHPFWlt96ZeEqH52r0PN41wTrWgvHyN2TWRiwwi.jpg&width=290&height=290&type=track",
        path: "Assets/Audio/1st Contact - Der Weg.mp3"
    },
    {
        name: "Cover Gurl",
        artist: "Dvr Wvg",
        image: "https://images.pexels.com/photos/3100835/pexels-photo-3100835.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
        path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Arps/Chad_Crouch_-_Shipping_Lanes.mp3"
    },
];

let queue_list = [];

function loadTrack(song_id) {
    /* This function is very confusing as I found it on GeeksForGeeks. It appears to load a track when the URL to the webpage is opened and has no call in the HTML file however if its not broken don't fix it. */
    // Trevor here, I have hijacked this function to now operate on the queue instead of the hardcoded track_list

    // Clear the previous seek timer
    clearInterval(updateTimer);
    resetValues();
    
    // Load a new track
    curr_track.src = track_list[song_id].path;
    curr_track.load();
    
    // Update details of the track
    track_art.style.backgroundImage = 
        "url(" + track_list[song_id].image + ")";
    track_name.textContent = track_list[song_id].name;
    track_artist.textContent = track_list[song_id].artist;
    
    // Set an interval of 1000 milliseconds
    // for updating the seek slider
    updateTimer = setInterval(seekUpdate, 1000);
    
    // Move to the next track if the current finishes playing
    // using the 'ended' event
    curr_track.addEventListener("ended", nextTrack);
}

// Function to reset all values to their default
function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

function playpauseTrack() {
    // Switch between playing and pausing
    // depending on the current state
    if (!isPlaying) playTrack();
    else pauseTrack();
}

function playTrack() {
    // Play the loaded track
    curr_track.play();
    isPlaying = true;

    // Replace icon with the pause icon
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-2x"></i>';
}

function pauseTrack() {
    // Pause the loaded track
    curr_track.pause();
    isPlaying = false;

    // Replace icon with the play icon
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-2x"></i>';
}

function nextTrack() {
    // Go back to the first track if the
    // current one is the last in the track list
    if (queue_list.length != 0) {
        if (queue_index < queue_list.length - 1) {
            queue_index += 1;
        }
        else queue_index = 0;

        // Load and play the new track
        loadTrack(queue_list[queue_index]);
        playTrack();
    }
}

function prevTrack() {
    // Go back to the last track if the
    // current one is the first in the track list
    if (queue_list.length != 0) {
        if (queue_index > 0)
            queue_index -= 1;
        else queue_index = queue_list.length - 1;

        // Load and play the new track
        loadTrack(queue_list[queue_index]);
        playTrack();
    }
}

function seekTo() {
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}

function setVolume() {
    // Set the volume according to the
    // percentage of the volume slider set
    curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
    let seekPosition = 0;

    // Check if the current track duration is a legible number
    if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        // Calculate the time left and the total duration
        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        // Add a zero to the single digit time values
        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        // Display the updated duration
        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}

// Fisher-Yates shuffle algorithm to shuffle tracks
function shuffleTracks() {
    if (queue_list.length != 0) {
        for (let i = queue_list.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = queue_list[i];
            queue_list[i] = queue_list[j];
            queue_list[j] = temp;
        }
        queue_index = 0;
        // If I didnt add the or statement then it wont be shuffled unless actively being played
        if (isPlaying || !isPlaying) {
            loadTrack(queue_list[queue_index]);
            playTrack();
        }
    }
}


function switchLoop() {
    // Switch between Looping and UnLooping
    // depending on the current state
    if (!isLooping) loopTrack();
    else unLoopTrack();
}

function loopTrack() {
    // Loop the loaded track
    curr_track.loop = true;
    isLooping = true;

    // Replace icon with the looping icon
    loopBtn.innerHTML = '<i class="fa fa-sync fa-2x"></i>';
}

function unLoopTrack() {
    // unLoop the loaded track
    curr_track.loop = false;
    isLooping = false;

    // Replace icon with the unLoop icon
    loopBtn.innerHTML = '<i class="fa fa-repeat fa-2x"></i>';
}

document.addEventListener("DOMContentLoaded", function () {
    // Select all the cards and their elements
    let cards = document.querySelectorAll(".card");

    // Loop through each card
    cards.forEach((card, index) => {
        // Set the initial track details for each card
        let currentTrack = track_list[index];
        updateCard(card, currentTrack);
    });

    // Function to update the card content
    function updateCard(card, track) {
        let cardImg = card.querySelector(".card-img");
        let songTitle = card.querySelector(".card-title");
        let songInfo = card.querySelector(".card-info");

        cardImg.src = track.image;
        songTitle.textContent = track.name;
        songInfo.textContent = `Artist: ${track.artist}`;
    }
});


const handleClick = (event) => {
    const listTitle = event.target;
    const innerList = listTitle.nextElementSibling;
    const content = innerList.querySelector(".content");
  
    // listTitle.classList.toggle("active");
    if (listTitle.classList.contains("active")) {
      listTitle.classList.remove("active");
      innerList.style.height = 0;
    } else {
      listTitle.classList.add("active");
      innerList.style.height = `${content.clientHeight}px`;
    }
};
  
const listTitles = document.querySelectorAll(".list-title");

for (let listTitle of listTitles) {
    listTitle.addEventListener("click", handleClick);
}
  

// Load the first track in the tracklist
//loadTrack(track_index);
//console.log(queue_list.length);