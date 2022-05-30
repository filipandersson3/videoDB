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



Redovisa arbetets olika delar. Så att läsaren förstår vad du gjort och hur.

Använd gärna bilder för att illustrera.

För att lägga till bilder i markdown. Bilderna kan du ladda upp med Git som vanligt, länka dem med url eller filnamnet.

## Positiva erfarenheter

Här beskriver du vad som har gått bra i ditt projekt och analyserar varför. Hur ska du upprepa framgångarna.

## Negativa erfarenheter

Här beskriver du det som du anser har gått mindre bra med ditt projekt och analyserar hur du kan undvika detta i framtida projekt.

## Sammanfattning

Här redovisar du dina slutsatser, erfarenheter och lärdomar. Reflektera över din produkt och dess/dina utvecklingsmöjligheter.
Vad kan vidareutvecklas och finns det utrymme att bygga vidare på projektet.