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
  const countriesList = document.getElementById('countries-list');
  countriesList.innerHTML = ''; // Rensa tidigare resultat
  
  if (countries.length === 0) {
    countriesList.innerHTML = 'Inga länder hittades.';
    return;
  }
  
  countries.forEach(country => {
    if (country && country.name && country.name.common) {
      const countryElement = document.createElement('div');
      countryElement.textContent = country.name.common;
      countryElement.addEventListener('click', () => getNews(country.name.common));
      countriesList.appendChild(countryElement);
    }
  });
}
// Funktion för att konvertera landsnamn till landkod
function getCountryCode(countryName) {
  const countryCodes = {
      'Sweden': 'se',
      'United States': 'us',
      'United Kingdom': 'gb',
      'Canada': 'ca',
      'Australia': 'au',
      'Germany': 'de',
      'France': 'fr',
      'Italy': 'it',
      'Spain': 'es',
      'China': 'cn',
      'Japan': 'jp',
      'South Korea': 'kr',
      'Brazil': 'br',
      'India': 'in',
      'Mexico': 'mx',
      'Russia': 'ru',
      'Netherlands': 'nl',
      'Belgium': 'be',
      'Norway': 'no',
      'Denmark': 'dk',
      'Finland': 'fi',
      'Switzerland': 'ch',
      'Austria': 'at',
      'Ireland': 'ie',
      'New Zealand': 'nz',
      'South Africa': 'za',
      'Argentina': 'ar',
      'Chile': 'cl',
      'Colombia': 'co',
      'Egypt': 'eg',
      'Greece': 'gr',
      'Hungary': 'hu',
      'Iceland': 'is',
      'Israel': 'il',
      'Malaysia': 'my',
      'Nigeria': 'ng',
      'Pakistan': 'pk',
      'Philippines': 'ph',
      'Poland': 'pl',
      'Portugal': 'pt',
      'Saudi Arabia': 'sa',
      'Singapore': 'sg',
      'Turkey': 'tr',
      'Ukraine': 'ua',
      'Vietnam': 'vn',
      'Bangladesh': 'bd',
      'Czech Republic': 'cz',
      'Indonesia': 'id',
      'Kazakhstan': 'kz',
      'Kenya': 'ke',
      'Morocco': 'ma',
      'Peru': 'pe',
      'Romania': 'ro',
      'Slovakia': 'sk',
      'Thailand': 'th',
      'United Arab Emirates': 'ae',
      'Venezuela': 've',
      'Zimbabwe': 'zw',
      'Portugal': 'pt',
      'Luxembourg': 'lu',
      'Monaco': 'mc',
      'Liechtenstein': 'li',
      'Malta': 'mt',
      'Cyprus': 'cy',
      'Estonia': 'ee',
      'Latvia': 'lv',
      'Lithuania': 'lt',
      'Slovenia': 'si',
      'Croatia': 'hr',
      'Bosnia and Herzegovina': 'ba',
      'North Macedonia': 'mk',
      'Serbia': 'rs',
      'Montenegro': 'me',
      'Albania': 'al',
      'Bulgaria': 'bg',
      'Georgia': 'ge',
      'Armenia': 'am',
      'Azerbaijan': 'az',
      'Moldova': 'md',
      'Belarus': 'by'
  };
  return countryCodes[countryName] || '';
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
          <p>${article.description || 'Ingen beskrivning tillgänglig'}</p>
          <a href="${article.url}" target="_blank">Läs mer</a>
      `;
      newsContainer.appendChild(articleElement);
  });
}
// Starta appen
getCountries();