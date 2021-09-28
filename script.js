const fetchAPI = async () => {
  const artist = 'Skank';
  const song = 'Vamos Fugir';

  const response = await fetch(`https://api.vagalume.com.br/search.art?q=Skank&limit=5`);

  const data = await response.json();

  console.log(data);
};

fetchAPI();
