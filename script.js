const renderResults = (option) => {
  const section = document.querySelector('#results');

  const band = option.band;
  const title = option.title;

  const div = document.createElement('div');
  div.className = 'result-card';

  if (title) {
    div.innerText = `${band} - ${title}`;
  } else {
    div.innerText = `${band}`;
  }

  section.appendChild(div);

  // div.addEventListener('click', fetchOption);
};

const fetchAPI = async () => {
  const query = document.querySelector('#input-query').value;

  if (!query) {
    alert('Insira palavras-chave');
  }

  else {
    try {
      const response = await fetch(`https://api.vagalume.com.br/search.artmus?q=${query}&limit=5`);

      const data = await response.json();

      data.response.docs.forEach(option => renderResults(option));
      console.log(data.response.docs)
    } catch (error) { alert('erro na requisição') }
  }
};

window.onload = () => {
  const submitBtn = document.querySelector('#submit-btn');
  submitBtn.addEventListener('click', fetchAPI);
};
