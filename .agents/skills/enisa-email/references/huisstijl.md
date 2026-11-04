# Huisstijl en referenties

## Bronnen en prioriteit

1. De actuele briefing van de gebruiker voor feiten en campagne-inhoud.
2. De zomeractie-mail als primaire visuele en tekstuele referentie:
   https://preview.mailerlite.io/preview/2171687/emails/194989330393990532
3. De websitekleuren in `app/assets/css/main.css` (`amber-v2`) en bevestigde bedrijfsinformatie in `app/constants/businessInfo.ts`.
4. De eerste nieuwsbrief, “Nieuwe website en korting !”, alleen als secundaire inspiratie:
   https://preview.mailerlite.io/preview/2171687/emails/181375818600023228

De gebruiker vindt de eerste nieuwsbrief minder sterk. De visuele richting is daarom de zachtere zomeractie-mail, niet het fellere roze van de eerste poging. De instructies en lokale HTML-basis zijn zelfstandig bruikbaar als de previews verdwijnen.

Beide previews waren bereikbaar bij het opstellen van de skill. De kale aanhef “Lieve ,” en lege afmeldlink in de previews zijn geen patroon om over te nemen: personalisatie en systeemlinks kunnen in previews anders worden weergegeven dan bij verzending.

## Kleuren

| Toepassing | Kleur |
| --- | --- |
| Buitenachtergrond, afwisselend licht vlak | `#f9f2f3` |
| Header, footer, zacht actieblok | `#f1dfe0` |
| Subtiele rand | `#e3c0c2` |
| Extra lichte introductie/sectie | `#fff8f8` |
| Witte inhoud | `#ffffff` |
| Lopende tekst | `#4a2c2d` |
| Koppen | `#613c3d` |
| CTA en onderstreepte links | `#794c4e` |

Geen felroze `#ff637e`-knoppen, harde zwarte koppen of onnodige kleurwisselingen uit de eerste nieuwsbrief.

## Vormgeving

- Gecentreerde kolom van maximaal 640 px, één kolom op desktop én mobiel.
- Rustige roze header en footer; inhoud afwisselend wit en zeer licht roze.
- Gebruik standaard de klikbare logoheader uit de zomeractie-mail, niet alleen de merknaam als tekst. Centreer het ronde logo op 92 × 92 px, met 24 px ruimte boven en 30 px onder, op `#f1dfe0`. Het logo linkt naar `https://www.enisahealingenmassage.nl/` en heeft alt-tekst “Enisa Healing & Massage”. Dit is de expliciete voorkeur van de gebruiker.
- Desktop horizontale padding circa 48 px; mobiel 20–24 px.
- Fontstack `Inter, Arial, Helvetica, sans-serif`. Inter is een voorkeur, geen vereiste; geen externe fontimport nodig.
- H1 circa 38–42 px, mobiel circa 30–32 px; H2 circa 28–32 px met gewicht 500.
- Body 16 px met 25–26 px regelafstand. Kleine footer circa 13 px met 21 px regelafstand.
- Veel lucht. Geen kaartenraster, overmatige schaduwen, drukke iconenrijen of grote aantallen knoppen.
- Eén primaire knop met witte tekst op `#794c4e`, circa 16 px verticale padding en zacht afgeronde hoeken. Outlook mag een rechthoekige knop tonen, maar tekst, kleur en klikbaarheid moeten behouden blijven.
- Hoogstens één relevante hoofdfoto; meer alleen als de inhoud erom vraagt. Belangrijke tekst staat als HTML in de mail, nooit alleen in een afbeelding.
- Bij een korte aankondiging zijn introductie, kernboodschap, CTA en afronding genoeg. Bij een actie kan één zachtroze actieblok met maximaal twee behandelingssecties worden toegevoegd.

## Toon

Enisa schrijft zelf aan iemand die welkom is in haar praktijk:

- “Ik” en “je/jij”, niet het onpersoonlijke “wij” of formele “u”.
- Warm, persoonlijk, nuchter en verzorgd; niet overdreven spiritueel of commercieel.
- Benoem rust, aandacht, ontspanning en ruimte voor jezelf zonder resultaten te garanderen.
- Korte, concrete zinnen en alinea's. Vermijd herhaling van “een moment voor jezelf”.
- Subtiele emoji's mogen als ze passen, doorgaans maximaal twee of drie in de hele mail. Geen emoji nodig in elke kop.
- Geen valse schaarste, sensationele onderwerpregels, dwingende verkooptaal of gezondheidsclaims zoals “geneest trauma” of “verhelpt pijn gegarandeerd”.
- Aanhef zonder personalisatie standaard “Lieve jij,”. Ondertekening “Liefs, / Enisa / Enisa Healing & Massage”.
- Voorbeeld-CTA's: “Plan je moment voor jezelf”, “Ontdek de behandeling”, “Bekijk de mogelijkheden”. Kies één die bij de bestemming past.

## Links en afbeeldingen

Bekende basislinks; controleer opnieuw bij gebruik:

- Website: `https://www.enisahealingenmassage.nl/`
- Boeken: `https://enisa-healing-massage.setmore.com/`
- Contact: `mailto:info@enisahealingenmassage.nl` (bevestig tegen bedrijfsinformatie).

Bronafbeeldingen uit de voorbeelden:

- Logo: `https://storage.mlcdn.com/account_image/2171687/ZZVFPetjR4dsAsGaIHXzeAu31JFpbfViS6rirJoL.ico`
- Foto zomeractie: `https://www.enisahealingenmassage.nl/images/enisa-intro.webp`
- Foto eerste nieuwsbrief: `https://storage.mlcdn.com/account_image/2171687/iPQ2URwzD6Wz0eBsMYDiLyO2Orxq4AHNTzMbkBl3.jpg`
- Websitelogo: `https://www.enisahealingenmassage.nl/images/logo.webp`

**Let op afbeeldingscompatibiliteit:** het voorbeeldlogo is daadwerkelijk een ICO en de websitebeelden zijn WebP. Deze formaten zijn geen betrouwbare keuze voor alle Outlook-versies. Geef voor productie de voorkeur aan een door de gebruiker bevestigde, publiek gehoste PNG/JPEG-versie. Verander nooit alleen een bestandsextensie in een URL. Op expliciet verzoek gebruikt de basis dezelfde klikbare logoafbeelding als de zomeractie-mail, met de bestaande publieke ICO-URL. Behoud die logoheader en vervang hem niet stilzwijgend door tekst. Test het logo vóór verzending ook in Outlook; zodra een publiek gehoste PNG-versie van hetzelfde logo beschikbaar is, gebruik die met dezelfde afmetingen en link. Verzin geen asset-URL en upload niets zonder opdracht. Een optionele foto mag achterwege blijven als er geen geschikte foto beschikbaar is.

Gebruik geen social-links uit de eerste nieuwsbrief: de Instagram-link ging naar de website en een Facebook-URL is geen bewijs van een actueel bevestigd profiel. Voeg socials alleen toe na bevestiging.

## MailerLite

- Lever één volledig HTML-document voor de HTML-editor, geen Vue-template of Markdown-fragment.
- Systeemtag voor afmelden: `<a href="{$unsubscribe}">Afmelden</a>`. Laat MailerLite deze verwerken; controleer de gegenereerde link in een testmail van de uiteindelijke campagne.
- De basis gebruikt geen voornaamtag. Voor een gevraagde aanhef “Beste [Voornaam]” met fallback “Beste klant” ondersteunt MailerLite `Beste {$name|default('klant')},`. Controleer dat het veld `name` daadwerkelijk de voornaam bevat; importeer niet per ongeluk een volledige naam in dit veld. Bron: https://www.mailerlite.com/help/how-to-use-variables-in-mailerlite. Test met én zonder voornaam. Een layout-testmail bewijst niet dat alle systeemvariabelen werken: stuur voor een volledige controle een aparte campagne uitsluitend naar eigen testcontacten, één met voornaam en één zonder. Produceer nooit “Beste ,” of “Lieve ,”.
- Geen previewgebonden `data-link-id`, campagne-ID's of trackingpixels kopiëren. MailerLite verzorgt eigen tracking.
- Fysiek praktijkadres uit de huidige bevestigde bedrijfsinformatie opnemen; geen oud adres uit een mail overnemen. Laat de afzenderidentiteit en verzendinstellingen in MailerLite controleren.
- Een browserpreview bewijst geen goede weergave in Outlook/Gmail. Laat de gebruiker vóór verzending een testmail sturen en mobiele weergave, CTA, afmelden en eventuele personalisatie controleren.

## Optioneel inhoudsblok

Voeg een sectie als complete rij in `{{HOOFDBLOKKEN_HTML}}` in. Herhaal alleen als nodig; wissel desgewenst wit af met `#f9f2f3` of `#fff8f8`. Gebruik de titel en inhoud van de actuele briefing, niet letterlijk onderstaande markeringen:

```html
<tr>
  <td class="content-pad" bgcolor="#ffffff" style="padding:32px 48px; background-color:#ffffff; font-family:Inter, Arial, Helvetica, sans-serif; color:#4a2c2d;">
    <h2 style="margin:0 0 16px; font-size:28px; line-height:35px; font-weight:500; color:#613c3d;">[Bevestigde sectietitel]</h2>
    <p style="margin:0; font-size:16px; line-height:26px;">[Korte, feitelijk juiste inhoud]</p>
  </td>
</tr>
```

Een aanbieding krijgt een duidelijk benoemde periode en bevestigde prijs. Vermeld bij trajecten of het bedrag per sessie of voor het hele traject geldt. Gebruik doorgestreepte oude prijzen alleen als deze aantoonbaar kloppen.
