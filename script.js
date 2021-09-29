const fetchLyric = async (artist, song) => {
  try {
    const response = await fetch(`https://api.vagalume.com.br/search.php?art=${artist}&mus=${song}`);

    const data = await response.json();

    document.querySelector('#results').innerText = data.mus[0].text;
  } catch (error) { alert('Artista ou música não encontrado') }
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

const renderResults = (option) => {
  const section = document.querySelector('#results');

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

  section.appendChild(div);

  div.addEventListener('click', fetchOption);
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
      data.response.docs
        .filter(option => option.title)
        .forEach(song => renderResults(song));

    } catch (error) { alert('erro na requisição') }
  }
  document.querySelector('#input-query').value = '';
};

window.onload = () => {
  const submitBtn = document.querySelector('#submit-btn');
  submitBtn.addEventListener('click', fetchAPI);
};
