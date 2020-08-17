var search_button = document.getElementById('search-button');
        search_button.addEventListener('click',function(){
            var search_box = document.getElementById('search-box').value;

            fetch(`https://api.lyrics.ovh/suggest/${search_box}`)
            .then(res => res.json())
            .then(data =>{
                const songDetails = document.querySelector('.song-details');
                //console.log(songDetails);
                for(i=0;i<10;i++){
                    const song = data.data[i];
                    //console.log(song);
                    const songTitle = data.data[i].title;
                    console.log(songTitle);
                    const artistName = data.data[i].artist.name;
                    console.log(artistName);
                    
                    //updating the UI
                    const para = document.querySelector('.song-details');
                    let newPara = document.createElement('p');
                    newPara.innerHTML = `<p class="author lead"><strong>${songTitle}</strong> Album by <span>${song.artist.name}</span> <button onclick="getLyric('${artistName}', '${songTitle}')" id="songsLyric" class="btn btn-success">Get Lyrics</button></p>`;
                    para.appendChild(newPara);    
                }        
        })

    })

    const getLyric = (artistName, songTitle) =>{
        fetch(`https://api.lyrics.ovh/v1/${artistName}/${songTitle}`)
        .then(response => response.json())
        .then(song => {
            console.log(song);
            document.getElementById('songsLyric').innerHTML = `<h2 class="text-success mb-4">Lyrics</h2>
            <pre class="lyric text-white">${song.lyrics}</pre>`

            console.log('song.lyrics');
        })
    }