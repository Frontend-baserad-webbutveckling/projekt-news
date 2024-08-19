# Projekt News

## Projektbeskrivning
Detta projekt är en nyhetsapp som ger användare möjlighet att söka efter och visa nyheter från olika länder runt om i världen. Användaren kan söka efter ett specifikt land, visa de senaste nyheterna för det landet och spara länder som favoriter för snabb åtkomst. Appen är byggd med modern webbteknologi och har en responsiv design.

## Funktioner
- **Sökfunktion:** Dynamisk sökfunktion som låter användaren söka efter länder och visa relaterade nyheter.
- **Favoriter:** Möjlighet att spara och visa favoritländer.
- **Fallback för bilder:** Om en nyhetsartikel saknar bild eller om bild-URL:en är ogiltig, visas en standardbild.
- **Responsiv design:** Appen är optimerad för att fungera på olika enheter och skärmstorlekar.
- **LocalStorage:** Användarens favoriter sparas i webbläsarens LocalStorage för att bevaras mellan sessioner.

## Teknologier
- **HTML, CSS, JavaScript:** Grunderna för applikationen.
- **SASS/SCSS:** För att skapa och hantera stilmallar på ett organiserat sätt.
- **Parcel:** Används som byggverktyg för att automatisera och optimera arbetsprocessen.
- **API:er:** REST Countries API för att hämta landinformation och News API för att hämta nyheter.

## Installation och Konfiguration
1. **Kloning av repo:**
```
   git clone https://github.com/Frontend-baserad-webbutveckling/projekt-news.git
```
2. **Navigera till projektkatalogen:**
```
cd projekt-news
```
2. **Installera dependencies:**
```
npm install
```
3. **Starta utvecklings servern:**
```
npx parcel src/index.html
```

Projektet kommer att starta och vara tillgängligt på http://localhost:1234.

## Användning
   
- Sök efter ett land: Skriv namnet på ett land i sökfältet för att visa tillgängliga länder och deras nyheter.
- Lägg till favoriter: Klicka på hjärtikonen bredvid ett land för att lägga till det som favorit.
 - Visa favoriter: Favoriterna sparas i LocalStorage och visas automatiskt vid nästa besök.


## Live Demo
Du kan testa applikationen [här:](https://front-end-projekt-news.netlify.app/)

## GitHub Repository
Projektets GitHub repository: [Github](https://github.com/Frontend-baserad-webbutveckling/projekt-news.git])