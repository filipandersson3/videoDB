# Video databas

Filip 2022

## Inledning

Målet var att skapa en sida där användare kan ladda upp, titta på och ta bort 
videofiler. Jag använde Bootstrap för CSS, ett npm paket för att ladda ner filer 
till servern och Nunjucks för att skapa HTML som skickas till användaren. Jag 
använde också en databas där alla videoposts sparas.

Här beskriver du kortfattat arbetets syfte/mål, arbetssätt, genomförande.

## Bakgrund

Först skrev jag en grundläggande plan där jag skrev vilka delar som projektet 
skulle innehålla, vilka begränsningar som skulle göras osv. Finns i 
planering.md. 

Sen skrev jag en mer utförlig planering med allt som jag tänkte skulle ingå och 
den finns i https://github.com/filipandersson3/videoDB/projects/1, fast jag kom 
ju inte på exakt alla delar som skulle finnas första lektionen och då lade jag 
till saker som hosting och användbarhetstester några lektioner senare. Det gick 
bra ändå eftersom jag inte hade fyllt planeringen med för mycket saker som tar 
tid och det kändes först som att jag hade överskattat tiden som det skulle ta 
att göra att göra de features som jag hade planerat för. Men det blir oftast så 
att tiden går åt, så jag hann bli färdig med det jag hade planerat för varken 
för tidigt eller för sent.

Jag gjorde också en design på figma så att jag kunde komma tillbaka till den sen 
för att hämta t.ex. fonts, färger osv. så att jag kunde göra all design först 
innan jag började. 

https://www.figma.com/file/8fvxS8fWxC9xti9Nb4jWE0/VideoDB?node-id=0%3A1

Sen installerade jag express och fick det att funka och efter det gjorde jag en 
databas med id, title, description, updated_at och path (för videofilens plats 
på servern).

Jag laddade också ner express-fileupload med npm och testade att använda det med 
en enkel form för att testa det. Jag läste dokumentationen och då var det  
ganska straight-forward. Jag hade först tänkt att lagra videor direkt på 
databasen, men kom på att det skulle funka dåligt och att eftersom Heroku kunde 
hosta hundratals megabyte så var det smidigare att lagra filer direkt på 
servern.

Sen kopplade jag ihop databasen med node och gjorde en video sida med GET route 
där alla 
videor i databasen hämtas och visas och videorna kunde visas direkt på sidan med 
HTML. Jag hade inte först tänkt på att videor kunde visas direkt i HTML utan 
trodde att jag skulle behöva ladda ner en videospelare för sidan, men det blev 
mycket lättare nu.

Efter det gjorde jag en upload sida som skapar en post i databasen och sparar 
en video på servern, file upload och andra inputs i form som js och 
express-fileupload tar hand om.

Sen gjorde jag en edit sida som är nästan samma som upload sida fast den är 
kopplad till en viss ID, som är videopostens ID i databasen. Skillnaden är att 
fälten redan är ifyllda med title och description och att det inte går att ladda 
upp en ny video, så det är bara databasen som ändras.

Men det blev problem när jag märkte att alla videor måste laddas när man laddar 
sidan. Det är dåligt för prestandan så jag gjorde så att de bara laddas när man 
klickar på videon. Men då behövde jag också thumbnails, så jag hittade en 
thumbnail generator på npm som skapar en ny thumbnail för varje video när man 
laddar upp dom.

Delete möjlighet skulle jag lägga till på edit sidan, men det blev komplicerat 
när jag kom på att jag behövde ta bort video, thumbnail och databas entry. 

Sorteringsfunktion med sessions. Sorteringsknappar reloadar sidan med en annan 
session som påverkar GET.

Filer med samma namn skapade problem, så jag använder nu istället hashade 
filnamn och gjorde en check för att filen slutar på .mp4.

Sen gjorde jag en enkel navbar och började på att göra sidan samma som min figma 
design. Då skulle jag ändra färger och fonts i Bootstrap, så jag behövde ladda 
ner bootstrap med npm, skapa variables fil och ändra det där. Det var svårt att 
förstå dokumentationen, så det tog länge att bara ändra typ en färg.

Efter det gjorde jag responsivitet och försökte att förstå bootstraps responsiva 
klasser och det tog ett tag, men sen fick jag automatiska breakpoints och det 
blev bra. 

Hosting var lite svårt eftersom jag glömde att läsa hosting guiden så jag hade 
bland annat fel version på node och jag fick lära mig använda heroku CLI.

Jag märkte sen att jag hade glömt att göra sort by menyn responsiv, så jag 
började först med att försöka göra det med grid, men det blev fel om och om igen 
och det hade varit mycket lättare om jag bara använde flex och ändrade 
flex-direction vid en breakpoint, så jag gjorde det.

### Testing

läs testing.md

Fanns bland annat säkerhetsproblem som kunde paja sidan.

## Positiva erfarenheter

Här beskriver du vad som har gått bra i ditt projekt och analyserar varför. Hur ska du upprepa framgångarna.

Jag har fått använda flera olika npm packages och känner mig mer bekväm med hur 
det funkar nu.

Ganska lite problem med databas eftersom jag har använt det förut. 

Jag tycker att jag gjorde en design som ser helt okej ut och den verkade lätt 
att använda från min testing. Jag kunde också kopiera designen från Figma, så 
att det ser lika ut som jag hade planerat.

Jag gjorde också tester på andra, på responsivitet och användbarhet och använde 
verktyg som Wave för att testa vidare. Jag validerade också det som gick att 
validera, så att det följer HTML regler osv.

Planeringen gick bra för att jag hann göra allt som jag hade planerat och hade 
tid över för testing och hosting och det. Mycket tid går åt för allt sånt, men 
jag hade planerat för det.

## Negativa erfarenheter

Här beskriver du det som du anser har gått mindre bra med ditt projekt och analyserar hur du kan undvika detta i framtida projekt.

## Sammanfattning

Här redovisar du dina slutsatser, erfarenheter och lärdomar. Reflektera över din produkt och dess/dina utvecklingsmöjligheter.
Vad kan vidareutvecklas och finns det utrymme att bygga vidare på projektet.