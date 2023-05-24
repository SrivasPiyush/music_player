//Initialize the variables
let songIndex = 0;
let audioElement = new Audio('./songs/1.mp3');
// audioElement.play();
let masterPlay = document.getElementById('masterPlay');
let songItemPlay = document.getElementsByClassName('songItemPlay');
let myProgressBar = document.getElementById('myProgressBar');
let playGif = document.getElementById('playGif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs = [
    {songName:"Ami Je Tomar", filePath: "songs/1.mp3", coverPath: "covers/1.jpg", duration: "3:50"},
    {songName:"Ami Je Tomar 2", filePath: "songs/2.mp3", coverPath: "covers/2.jpg", duration: "2:33"},
    {songName:"Ami Je Tomar 3", filePath: "songs/3.mp3", coverPath: "covers/3.jpg", duration:"4:33"},
    {songName:"Ami Je Tomar 4", filePath: "songs/4.mp3", coverPath: "covers/4.jpg", duration:"4:27"},
    {songName:"Ami Je Tomar 5", filePath: "songs/5.mp3", coverPath: "covers/5.jpg", duration:"3:28"},
    {songName:"Ami Je Tomar 6", filePath: "songs/6.mp3", coverPath: "covers/6.jpg", duration:"4:33"},
]

songItems.forEach((element, i)=> {
    console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    element.getElementsByClassName("timeStamp")[0].innerText = songs[i].duration;
});
//handle Play/Pause Button

masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0)
{
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    playGif.style.opacity = 1;
}
else{
    audioElement.pause();
    masterPlay.classList.remove('fa-circle-pause');
    masterPlay.classList.add('fa-circle-play');
    playGif.style.opacity = 0;
}
})

// if (masterPlay.classList.remove('fa-circle-pause')){
//     audioElement.pause();
//     element.target.classList.remove('fa-circle-pause');
//     element.target.classList.add('fa-circle-play');
// }
// else{
//     // audioElement.play();
//     audioElement.target.classList.add('fa-circle-pause');
//     audioElement.target.classList.remove('fa-circle-play');
// }

// eventlisteners

audioElement.addEventListener('timeupdate', ()=>{
    //update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = () =>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) =>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) =>{
    element.addEventListener('click', (element)=>{
        makeAllPlays();
        songIndex = parseInt(element.target.id);
        masterSongName.innerText = songs[songIndex].songName
        element.target.classList.remove('fa-circle-play');
        element.target.classList.add('fa-circle-pause');
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        playGif.style.opacity = 1;
    })
})


document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex >= 5){
        songIndex = 0;
    }else{
        songIndex += 1;
    }
    masterSongName.innerText = songs[songIndex].songName
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    audioElement.src = `songs/${songIndex+1}.mp3`;
    myProgressBar.value = 0;
    audioElement.currentTime = 0;
    audioElement.play();
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex <= 0){
        songIndex = 0;
    }else{
        songIndex -= 1;
    }
    masterSongName.innerText = songs[songIndex].songName
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
})

