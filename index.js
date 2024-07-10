async function getsongs(){
    let a = await fetch("http://127.0.0.1:5500/songs/")
    let responses = await a.text();
    let div = document.createElement("div");
    div.innerHTML = responses;
    let as  = div.getElementsByTagName("a");
    let songs = [];
    for(let i =0 ;i<as.length;i++){
        const element = as[i];     
        if(element.href.endsWith(".mp3")){
            songs.push(element.href)
        }
    }
    return songs ;
}  

async function split(){ 
    let link= await getsongs();  
    let songname  = [];
    for(let i =0 ;i<link.length;i++){ 
        const element = link[i];
        songname.push(element.split("/songs/")[1]);
    }       
    return songname 
} 
         
async function main(){
    let songs = await getsongs();
    let songname = await split(); 
    let songul = document.querySelector(".playsong").getElementsByTagName("ul")[0];

    for(const song of songname)
        { 
            songul.innerHTML = songul.innerHTML + `<img class ="invert icon-1" src = "music.svg" alt = "music"></img>` + `<li>${song.replaceAll("%20"," ")}</li>` + `<img class ="invert icon-1" src = "play.svg" alt = "play"></img>`;
        }  
 
    console.log(songs)   
    var audio = new Audio(songs[9]);
    audio.play();
  
}    
main();     