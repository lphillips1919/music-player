let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");
 
let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
 
// Specify globally used values
let track_index = 0;
let isPlaying = false;
let updateTimer;
 

let curr_track = document.createElement('audio');

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
];

document.addEventListener("DOMContentLoaded", function () {
    // Select all the cards and their elements
    let cards = document.querySelectorAll(".card");

    // Loop through each card
    cards.forEach((card, index) => {
        // Select the card elements
        let cardImg = card.querySelector(".card-img");
        let songTitle = card.querySelector(".card-title");
        let songInfo = card.querySelector(".card-info");

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