# Video databas

Filip 2022

## Inledning

Målet var att skapa en sida där användare kan ladda upp, titta på och ta bort 
videofiler. Jag använde Bootstrap för CSS, ett npm paket för att ladda ner filer 
till servern och Nunjucks för att skapa HTML som skickas till användaren. Jag 
använde också en databas där alla videoposts sparas och express för själva servern.

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

## Säkerhet

Jag har kollat på OWASP top 10 för att se om det finns vulnerabilities för min sida.

Broken access control, har inte gjort så att vissa användare ska kunna göra mer än andra. Alla kan se, lägga upp, redigera och ta bort alla videor, men det är något som skulle ta lång tid att fixa som jag skriver om i negativa erfarenheter. 

Cryptographic failures inte relevant, lagrar ingen känslig information som lösenord på servern.

Injection har jag haft i åtanke och jag använder t.ex. ingen concatenation för user-inputs till DB och alla filer som blir uppladdade blir kollade inte bara med filändelse men också signatur för att det ska vara i mp4 format.

Insecure design känns svårt att testa. Jag har iallafall "Limit resource consumption by user or service". Användare kan bara ladda upp filer mindre än 8 MB.

Security misconfiguration, jag skickar inte stack traces vid error, bara errormeddelanden som jag har skrivit. Men npm packages hade 1 moderate och 7 high vulnerabilities för att de var outdated. Det försökte jag fixa men det var bara breaking changes, så jag vet inte om det skulle fungera om jag upgraderade med dem.

Identification and Authentication Failures inget problem.

Security Logging and Monitoring Failures, har ganska detaljerade loggar (men det kan bli för mycket med många användare).

Server-Side Request Forgery (SSRF) borde inte vara ett problem, men skulle kunna vara ett problem om någon fick tillgång till bootstrap och kunde skicka dålig JS eftersom jag direkt tar scripts därifrån.

## Positiva erfarenheter

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

Blev lätt att hålla koll på vad jag skulle göra med kanban planering. 

Jag har haft säkerhet i åtanke och jobbat för att t.ex. endast vissa requests kan skickas och behandlas på vissa sätt. Det går t.ex. inte att ladda upp filer i fel format, med för stor storlek och jag har försökt se till att det inte går att påverka databasen på sätt som inte är avsedda.

## Negativa erfarenheter

En säkerhetsgrej som jag inte planerade att lägga till eftersom det inte fanns nog med tid var någon slags moderering så att alla användare inte bara kan ladda upp eller ta bort vad de vill. Det skulle kunna lösas med login och användare där bara vissa användare får ladda upp videor eller så att alla videor som läggs upp måste gå igenom en buffer där jag måste välja om de får läggas upp eller inte. För att just nu är jag ansvarig för det andra laddar upp och då måste jag ta bort om någon lägger upp olagligt innehåll. Å andra sidan så kan alla andra som är inne på sidan också ta bort dåligt innehåll.

Läste inte hosting guiden så det blev problem med node version för hosting. Glömde bort att den fanns, men någon minut av att läsa dokumentation löser mycket. 



## Sammanfattning

* Känner mig mer säker med databas och att använda npm packages
* Nice med design på figma
* Bra att testa på andra och validera, märkte saker jag inte hade gjort annars
* Planering gick bra och kanban är också nice
* Ska fortsätta ha säkerhet i åtanke
* Skulle gjort en säkrare sida med vem som får ladda upp saker om det fanns mer tid nu eller om jag skulle göra samma sak igen i framtiden
* Ska fortsätta att läsa dokumentation i framtiden

Det finns fortfarande mycket utvecklingsmöjligheter och om jag skulle fortsätta så skulle jag lägga till login system och rapportering av posts eller att alla videor måste bli checkade innan de hamnar på internet. Skulle också lägga till så att videor hamnar på olika sidor när första sidan blir full.

Men jag har en bra grund för att vidareutveckla såna saker.