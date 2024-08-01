document.getElementById('searchButton').addEventListener('click', () => {
  const userInput = document.getElementById('searchInput').value;
  getCountries(userInput); 
});

// Hämta länder
async function getCountries(searchTerm = '') {
  let url = 'https://restcountries.com/v3.1/all';
  if (searchTerm) {
    url = `https://restcountries.com/v3.1/name/${searchTerm}`;
  }
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    // Kontrollera om svaret är en array eller ett enskilt land
    const countries = Array.isArray(data) ? data : [data];
    
    displayCountries(countries);
  } catch (error) {
    console.error('Error fetching countries:', error);
    // Visa ett felmeddelande för användaren
    document.getElementById('countries-list').innerHTML = 'Kunde inte hämta länder. Försök igen.';
  }
}

// Visa länder
function displayCountries(countries) {
  // lista med samtliga länder
  const countriesList = document.getElementById('countries-list');
  // lista med länder som man favoritiserat
  const favoritesList = document.getElementById('favorites-list');
  countriesList.innerHTML = '';// Rensa tidigare resultat
  
  if (countries.length === 0) {
    countriesList.innerHTML = 'Inga länder hittades.';
    return;
  }
  
  countries.forEach(country => {
    if (country && country.name && country.name.common) {
      const countryElement = document.createElement('div');
      countryElement.innerHTML = `
        <span class="country-name">${country.name.common}</span>
        <span class="favorite-heart" data-country="${country.name.common}">&#9825;</span>
      `;
      countryElement.querySelector('.country-name').addEventListener('click', () => getNews(country.name.common));
      countryElement.querySelector('.favorite-heart').addEventListener('click', (e) => toggleFavorite(e, country.name.common));
      countriesList.appendChild(countryElement);
    }
  });
}
// Hämta nyheter för ett land
async function getNews(countryName) {
  const apiKey = '42bd8b5e092c4462987691c6f166b316'; 
  const countryCode = getCountryCode(countryName);
  
  if (!countryCode) {
      console.error('Kunde inte hitta landkod för:', countryName);
      return;
  }

  try {
      const response = await fetch(`https://newsapi.org/v2/top-headlines?country=${countryCode}&apiKey=${apiKey}`);
      const newsData = await response.json();
      
      if (newsData.status === 'ok') {
          displayNews(newsData.articles);
      } else {
          throw new Error(newsData.message || 'Kunde inte hämta nyheter');
      }
  } catch (error) {
      console.error('Fel vid hämtning av nyheter:', error);
      document.getElementById('news-container').innerHTML = 'Kunde inte ladda nyheter. Försök igen senare.';
  }
}

// Visa nyheter
function loadImage(src) {
  return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
  });
}

function displayNews(articles) {
  const newsContainer = document.getElementById('news-container');
  newsContainer.innerHTML = '';

  if (articles.length === 0) {
      newsContainer.innerHTML = 'Inga nyheter hittades för detta land.';
      return;
  }

  articles.forEach(article => {
      const articleElement = document.createElement('article');
      articleElement.innerHTML = `
          <h2>${article.title || 'Ingen titel tillgänglig'}</h2>
          ${article.description ? `<p>${article.description}</p>` : ''}
          <p>Källa: ${article.source.name}</p>
          <a href="${article.url}" target="_blank">Läs mer</a>
          ${article.publishedAt ? `<p>Publicerad: ${new Date(article.publishedAt).toLocaleString()}</p>` : ''}
         <img src="${article.urlToImage || 'https://loremflickr.com/300/300/news'}" alt="Nyhetsbild" style="max-width:100%; height:auto;">
      `;
      newsContainer.appendChild(articleElement);
  });
}
img


// Starta appen
getCountries();
