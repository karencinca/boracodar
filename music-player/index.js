const buttonPlay = document.querySelector('.play')
const buttonPrevious = document.querySelector('.previous-song')
const buttonNext = document.querySelector('.next-song')
const song = new Audio("./assets/baby.mp3")
let isPlaying = false
let i = 0

const cover = document.querySelector('.cover')
const title = document.querySelector('.song-title')
const author = document.querySelector('.song-author')

let songs = [
    {
        title: 'Baby',
        author: 'Justin Bieber',
        cover: './assets/baby.jpg',
        song: new Audio("./assets/baby.mp3")
    },

    {
        title: 'One Less Lonely Girl',
        author: 'Justin Bieber',
        cover: './assets/onelesslonelygirl.jpg',
        song: new Audio("./assets/onelesslonelygirl.mp3")
    },

    {
        title: 'One Time',
        author: 'Justin Bieber',
        cover: './assets/onetime.jpg',
        song: new Audio("./assets/onetime.mp4")
    },

    {
        title: 'Somebody To Love',
        author: 'Justin Bieber feat. Usher',
        cover: './assets/somebodytolove.jpg',
        song: new Audio("./assets/somebodytolove.mp3")
    }
]

cover.setAttribute('src', songs[i].cover) 
title.textContent = songs[i].title
author.textContent = songs[i].author

buttonPlay.addEventListener('click', () => {
    checkIfIsPlaying(songs[i].song)
    togglePlay(songs[i].song)
})

buttonPrevious.addEventListener('click', () => {
    songs[i].song.pause()
    i--
    checkIfIsPlaying(songs[i].song)
    songs[i].song.play()
    cover.setAttribute('src', songs[i].cover)
    title.textContent = songs[i].title
    author.textContent = songs[i].author
})

buttonNext.addEventListener('click', () => {
    songs[i].song.pause()
    i++
    checkIfIsPlaying(songs[i].song)
    songs[i].song.play()
    cover.setAttribute('src', songs[i].cover) 
    title.textContent = songs[i].title
    author.textContent = songs[i].author
})


function checkIfIsPlaying(audio) {
    audio.onplaying = function() {
        isPlaying = true
    } 
    audio.onpause = function() {
        audio.currentTime = 0
        isPlaying = false
    }
}

function togglePlay(audio) {
    if (isPlaying) {
        audio.pause()
    } else {
        audio.play()
    }
}

