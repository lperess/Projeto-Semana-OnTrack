const fetchAPI = async () => {
  const artist = document.querySelector('#input-artist').value;
  const song = document.querySelector('#input-song').value;

  if (!artist) {
    alert('Insira o nome de um artista');
  }
  if (!song) {
    alert('Insira o nome de uma música');
  }

  if (artist && song) {
    try {
      const response = await fetch(`https://api.vagalume.com.br/search.php?art=${artist}&mus=${song}`);

      const data = await response.json();

      document.querySelector('#lyrics').innerText = data.mus[0].text;
    } catch (error) { alert('Artista ou música não encontrado') }
  }
};

window.onload = () => {
  const submitBtn = document.querySelector('#submit-btn');
  submitBtn.addEventListener('click', fetchAPI);
};
