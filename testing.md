testade själv sidan på mobil, sort by knapparna i konstig ordning.

fixade det genom att sluta använda grid system för att istället bara använda 
flex med justify-content-between med breakpoints som ändrar flex-direction så 
att allting ryms.

## test på annan person på mobil, oliver:

### Kan du kolla på en video?
ja, går bra

### Kan du lägga upp en ny video?
ja, men går också att ladda upp jättestora filer, filer som inte egentligen är mp4

### Kan du redigera en video?
ja går bra

### Kan du ta bort en video?
ja men inte en för stor fil

### Vad är svårt att förstå på sidan?
den gick lätt att förstå

### Kan du sortera?
ja, men separera updated at och uploaded at

det här väljer jag att inte göra eftersom jag då behöver ändra många saker som tar tid som jag kan lägga på att fixa viktigare saker

### Övriga synpunkter, vad kan förbättras?
redirect istället för att skicka text till webbläsaren direkt

jag tänker också att det kanske hade varit bra med en error sida med nunjucks variabel som berättar felet, annars redirect om det inte är något fel.

märkte också en vit del som sticker ut på sidan som är större än bredden.

## validering HTML

### index
någon typo, använder samma id för flera element

fick ändra lite i js för att det skulle funka men nu är det fixat

### upload
någon typo, taggar placerade på fel ställen

fixat

### edit
någon typo (det är exakt samma typo på en massa sidor), en action attribute som är tom

fixat

### error
inga error där inte

## validering CSS

en massa parsningsfel, känns inte som att jag kan göra något åt det för att när jag letade upp problemet på internet så verkade det som att det är ett fel med bootstrap för att det ska vara kompatibelt med IE eller nåt.

## wave
missing form labels på upload och edit sidorna

fixat