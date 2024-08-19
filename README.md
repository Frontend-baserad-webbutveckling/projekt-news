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
npm start
```

Detta kommando startar Parcel, och projektet kommer att vara tillgängligt på http://localhost:1234. 
Parcel hanterar automatiskt HMR (Hot Module Replacement), vilket innebär att sidan laddas om när man gör ändringar.

## Användning
   
- Sök efter ett land: Skriv namnet på ett land i sökfältet för att visa tillgängliga länder och deras nyheter.
- Lägg till favoriter: Klicka på hjärtikonen bredvid ett land för att lägga till det som favorit.
 - Visa favoriter: Favoriterna sparas i LocalStorage och visas automatiskt vid nästa besök.

## Konfiguration av Arbetsprocessen för Parcel
Parcel är konfigurerat för att automatisera och optimera arbetsflödet i detta projekt:
Parcel är konfigurerat för att automatisera och optimera arbetsflödet i detta projekt. Här är en översikt över hur det är inställt:

**Parcel bundler:** Används för att bunta och optimera projektets filer, inklusive HTML, CSS/SCSS och JavaScript.
**Entry point:** Projektets entry point är src/index.html, som specificeras i package.json.
**SCSS till CSS:** Parcel hanterar kompilering av SCSS-filer till CSS automatiskt. Alla SCSS-filer finns i src/styles och inkluderas i style.scss.
**Hot Module Replacement (HMR):** Under utveckling används HMR för att automatiskt ladda om sidan när ändringar görs, vilket snabbar upp utvecklingsprocessen.
**Babel:** Parcel använder Babel för att transpilera modern JavaScript-kod till en version som stöds av äldre webbläsare.
**Produktion:** Vid bygget av produktionsversionen (med npm run build), minifieras och optimeras alla filer automatiskt för snabbare laddningstider och bättre prestanda.

## Live Demo
Du kan testa applikationen [här:](https://front-end-projekt-news.netlify.app/)

## GitHub Repository
Projektets GitHub repository: [Github](https://github.com/Frontend-baserad-webbutveckling/projekt-news.git])