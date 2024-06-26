// Hämta länder
async function getCountries() {
  const response = await fetch('https://restcountries.com/v3.1/all');
  const countries = await response.json();
  displayCountries(countries);
}

// Visa länder
function displayCountries(countries) {
  const countriesList = document.getElementById('countries-list');
  countries.forEach(country => {
      const countryElement = document.createElement('div');
      countryElement.textContent = country.name.common;
      countryElement.addEventListener('click', () => getNews(country.name.common));
      countriesList.appendChild(countryElement);
  });
}

// Hämta nyheter för ett land
async function getNews(countryName) {
  const apiKey = '42bd8b5e092c4462987691c6f166b316';
  const response = await fetch(`https://newsapi.org/v2/top-headlines?country=${countryName}&apiKey=${apiKey}`);
  const newsData = await response.json();
  displayNews(newsData.articles);
}

// Visa nyheter
function displayNews(articles) {
  const newsContainer = document.getElementById('news-container');
  newsContainer.innerHTML = '';
  articles.forEach(article => {
      const articleElement = document.createElement('article');
      articleElement.innerHTML = `
          <h2>${article.title}</h2>
          <p>${article.description}</p>
          <a href="${article.url}" target="_blank">Läs mer</a>
      `;
      newsContainer.appendChild(articleElement);
  });
}

// Starta appen
getCountries();