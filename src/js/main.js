
// Dynamisk sök
let debounceTimeout;

document.getElementById('searchInput').addEventListener('input', () => {
  const userInput = document.getElementById('searchInput').value;

  clearTimeout(debounceTimeout);

  debounceTimeout = setTimeout(() => {
    getCountries(userInput);
  }, 100);
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
  // lista med länder som man favoritiserat
  const favoritesList = document.getElementById('favorites-list');


// Hämta nyheter för ett land
async function getNews(countryName) {
  const countryCode = window.getCountryCode(countryName);

  if (!countryCode) {
      console.error('Kunde inte hitta landkod för:', countryName);
      return;
  }

  try {
      const response = await fetch(`/.netlify/functions/getNews?countryCode=${countryCode}`);
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
        ${article.content ? `<p>${article.content}</p>` : ''}
        <p>Källa: ${article.source.name}</p>
        <a href="${article.url}" target="_blank">Läs mer</a>
        ${article.publishedAt ? `<p>Publicerad: ${new Date(article.publishedAt).toLocaleString()}</p>` : ''}
        <img src="${article.urlToImage || `https://picsum.photos/1200/600?random=${Math.random()}`}" alt="Nyhetsbild" style="max-width:100%; height:auto;">
    `;
    newsContainer.appendChild(articleElement);
  });
}
// img

// Spara favoriter till localStorage
function saveFavorites(favorites) {
  localStorage.setItem('favoriteCountries', JSON.stringify(favorites));
}

// Ladda favoriter från localStorage
function loadFavorites() {
  const saved = localStorage.getItem('favoriteCountries');
  return saved ? JSON.parse(saved) : [];
}

// Växla favorit-status för ett land
function toggleFavorite(event, countryName) {
  const heartElement = event.target;
  const favoritesList = document.getElementById('favorites-list');
  let favorites = loadFavorites();
  
  const index = favorites.indexOf(countryName);
  if (index > -1) {
    // Om favorit, ta bort från favoriter
    favorites.splice(index, 1);
    heartElement.innerHTML = '&#9825;'; // Tomt hjärta
  } else {
    // Om inte favorit, lägg till i favoriter
    favorites.push(countryName);
    heartElement.innerHTML = '&#9829;'; // Fyllt hjärta
  }
  
  saveFavorites(favorites);
  displayFavorites();
}

// Visa favoritlistan
function displayFavorites() {
  const favoritesList = document.getElementById('favorites-list');
  favoritesList.innerHTML = ''; // Rensa nuvarande favoriter
  
  const favorites = loadFavorites();
  
  favorites.forEach(countryName => {
    const favoriteElement = document.createElement('div');
    favoriteElement.innerHTML = `
      <span class="country-name">${countryName}</span>
      <span class="favorite-heart" data-country="${countryName}">&#9829;</span>
    `;
    favoriteElement.querySelector('.country-name').addEventListener('click', () => getNews(countryName));
    favoriteElement.querySelector('.favorite-heart').addEventListener('click', (e) => toggleFavorite(e, countryName));
    favoritesList.appendChild(favoriteElement);
  });
}

// Visa länderlistan
function displayCountries(countries) {
  const countriesList = document.getElementById('countries-list');
  countriesList.innerHTML = ''; // Rensa tidigare resultat
  
  if (countries.length === 0) {
    countriesList.innerHTML = 'Inga länder hittades.';
    return;
  }
  
  const favorites = loadFavorites();
  
  countries.forEach(country => {
    if (country && country.name && country.name.common) {
      const countryElement = document.createElement('div');
      const isFavorite = favorites.includes(country.name.common);
      countryElement.innerHTML = `
        <span class="country-name">${country.name.common}</span>
        <span class="favorite-heart" data-country="${country.name.common}">
          ${isFavorite ? '&#9829;' : '&#9825;'}
        </span>
      `;
      countryElement.querySelector('.country-name').addEventListener('click', () => getNews(country.name.common));
      countryElement.querySelector('.favorite-heart').addEventListener('click', (e) => toggleFavorite(e, country.name.common));
      countriesList.appendChild(countryElement);
    }
  });
}

// Visa favoritlistan när sidan laddas
document.addEventListener('DOMContentLoaded', () => {
  displayFavorites();
});
  

// Starta appen
getCountries();
