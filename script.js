const fetchLyric = async (artist, song) => {
  try {
    const response = await fetch(`https://api.vagalume.com.br/search.php?art=${artist}&mus=${song}`);

    const data = await response.json();

    document.querySelector('#results').innerText = data.mus[0].text;
  } catch (error) { alert('Artista ou música não encontrado') }
};

const fetchImg = async (id) => {
  const response = await fetch(`https://api.vagalume.com.br/image.php?bandID=${id}`);

  const data = await response.json();
  return data.images[0].url;
};

const fetchOption = async (event) => {
  let artist;
  let song;

  if (event.target.querySelector('.artist')) {
    artist = event.target.querySelector('.artist');
    song = event.target.querySelector('.song');
  }
  else {
    artist = event.target.closest('.result-card')
      .querySelector('.artist');
    song = event.target.closest('.result-card')
      .querySelector('.song');
  }
  fetchLyric(artist.innerText, song.innerText);
};

const getArtistId = async (url) => {
  const response = await fetch(`https://www.vagalume.com.br/${url}/index.js`);
  const data = await response.json();
  const answer = await fetchImg(data.artist.id);
  return answer;
};

const renderResults = async (option, completeURL) => {
  const imgURL = await getArtistURL(completeURL);
  const section = document.querySelector('#results');
  const img = document.createElement('img');
  img.src = imgURL;
  img.style.width = '100px';

  const band = option.band;
  const title = option.title;

  const div = document.createElement('div');
  div.className = 'result-card';

  const song = document.createElement('p');
  song.className = 'song';
  song.innerText = title;
  div.appendChild(song);

  const artist = document.createElement('p');
  artist.className = 'artist';
  artist.innerText = band;
  div.appendChild(artist);
  
  console.log(img)
  div.appendChild(img);

  section.appendChild(div);

  div.addEventListener('click', fetchOption);
};

const getArtistURL = async completeURL => {
  const artist = completeURL.split('/');
  const answer = await getArtistId(artist[1]);
  return answer;
};

const fetchAPI = async () => {
  const query = document.querySelector('#input-query').value;

  if (!query) {
    alert('Insira palavras-chave');
  }

  else {
    try {
      const response = await fetch(`https://api.vagalume.com.br/search.excerpt?q=${query}&limit=10`);

      const data = await response.json();

      const section = document.querySelector('#results');
      section.innerHTML = '';
      const songs = data.response.docs
        .filter(option => option.title)
      // .forEach(song => {
      //   renderResults(song, getArtistURL(song.url));
      for (let i = 0; i < songs.length; i += 1) {
        renderResults(songs[i], songs[i].url)
      }
    } catch (error) { alert('erro na requisição') }
  }
  document.querySelector('#input-query').value = '';
};

window.onload = () => {
  const submitBtn = document.querySelector('#submit-btn');
  submitBtn.addEventListener('click', fetchAPI);
};
