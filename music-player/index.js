const buttonPlay = document.querySelector('.play')
const buttonPause = document.querySelector('.pause')
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

renderMusic(i)

buttonPlay.addEventListener('click', () => {
    checkIfIsPlaying(songs[i].song)
    play(songs[i].song)

    buttonPlay.classList.add('hide')
    buttonPause.classList.remove('hide')
})

buttonPause.addEventListener('click', () => {
    checkIfIsPlaying(songs[i].song)
    pause(songs[i].song)

    buttonPlay.classList.remove('hide')
    buttonPause.classList.add('hide')
})

buttonPrevious.addEventListener('click', () => {
    songs[i].song.pause()
    i--
    if(i < 0) {
        i = songs.length - 1
    }
    
    checkIfIsPlaying(songs[i].song)
    togglePlay(songs[i].song)
    cover.setAttribute('src', songs[i].cover) 
    title.textContent = songs[i].title
    author.textContent = songs[i].author
    songs[i].song.currentTime = 0
})

buttonNext.addEventListener('click', () => {
    songs[i].song.pause()
    i++

    if(i == songs.length) {
        i = 0
    }
    checkIfIsPlaying(songs[i].song)
    togglePlay(songs[i].song)
    cover.setAttribute('src', songs[i].cover) 
    title.textContent = songs[i].title
    author.textContent = songs[i].author
    songs[i].song.currentTime = 0
})


function checkIfIsPlaying(audio) {
    audio.onplaying = function() {
        audio.addEventListener('timeupdate', () => {
            updateProgress(audio)
        })
        isPlaying = true
    } 
    audio.onpause = function() {
        isPlaying = false
    }
}

function togglePlay(audio) {
    if (isPlaying) {
        audio.play()
    } else {
        audio.pause()
    }
}

function pause(audio) {
    audio.pause()
}

function play(audio) {
    audio.play()
}


function updateProgress(audio) {
    let line = document.querySelector('progress')
    line.style.width = Math.floor((audio.currentTime / audio.duration) * 100) + '%'
    let timePast = document.querySelector('.start')
    timePast.textContent = convertSecondsToMinutes(Math.floor(audio.currentTime))

    let musicDuration = document.querySelector('.end')
    musicDuration.textContent = convertSecondsToMinutes(Math.floor(audio.duration))
}

function convertSecondsToMinutes(seconds) {
    let minutesField = Math.floor(seconds / 60)
    let secondsField = String(seconds % 60).padStart(2, '0')
    return `${minutesField}:${secondsField}`
}


function renderMusic(i) {
    songs[i].song.addEventListener('loadeddata', () => {
        cover.setAttribute('src', songs[i].cover) 
        title.textContent = songs[i].title
        author.textContent = songs[i].author
        musicDuration.textContent = convertSecondsToMinutes(Math.floor(audio.duration))
    })

}