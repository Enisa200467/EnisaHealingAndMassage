# Klantenmail: voordeelpakketten energetische reiniging

## Bestanden

- `email.html`: volledige HTML voor de MailerLite HTML-editor.
- `email.txt`: overeenkomende platte-tekstversie.
- Afbeelding: `public/images/energetische-blokkades-loslaten-email.jpg` vanuit de repositoryroot. Dit is een echte JPEG-conversie van de aangeleverde WebP, 1200 × 675 px, circa 144 KB. Het originele bestand is ongewijzigd.

## Onderwerpregel: letterlijk overnemen

Voel je je soms of regelmatig moe, zonder energie of zonder zin om iets te doen?

## Preheader: letterlijk overnemen

Reinig oude en ongewenste energie en maak ruimte voor nieuwe inzichten.

Ook opnemen in het preheaderveld van MailerLite. Dezelfde tekst staat verborgen bovenaan de HTML.

## Inhoud behouden

De definitieve mailtekst, prijzen, voorwaarden en ondertekening zijn niet herschreven. Op expliciet verzoek is de em-dash in de alinea “Soms dragen we langer energie met ons mee” vervangen door een komma, in zowel HTML als tekstversie. De overige aangeleverde interpunctie is behouden. Er zijn geen alternatieve onderwerpregels gemaakt, omdat deze definitief is aangeleverd.

Alleen de gevraagde technische toevoegingen zijn toegepast:

- Aanhef: `Beste {$name|default('klant')},`.
- Klikbaar rond logo van 92 × 92 px in de roze topbanner, identiek aan de zomeractie-mail en gelinkt naar de website. De bestaande publieke ICO-afbeelding is gebruikt; controleer de weergave in Outlook vóór verzending en vervang de bron door een PNG-versie van hetzelfde logo zodra die publiek beschikbaar is.
- Eén statische hoofdfoto boven de tekst, met vloeiende schaling en beschrijvende alt-tekst.
- Drie afzonderlijke boekingsknoppen onder “Wil je een pakket boeken?”.
- Aanklikbare website en AFMELDEN-mailto, plus een afzonderlijke MailerLite-afmeldlink `{$unsubscribe}`.
- Fysiek praktijkadres in de footer, afkomstig uit `app/constants/businessInfo.ts`.
- Tabelopbouw met inline styling, maximaal 640 px breed, mobiel kleinere marges en knoppen onder elkaar.

De gekozen afbeelding bevat personen. Deze is bewust gebruikt volgens de expliciete bestandskeuze van Matthijs, ondanks de eerdere algemene voorkeur van de maintainer voor een afbeelding zonder personen.

## Pakketlinks

Rechtstreeks overgenomen uit de publieke Setmore-boekingspagina; niet samengesteld uit gegokte product-ID's. De links openen het betreffende pakket bij de datum-/tijdkeuze. Er is geen boeking of betaling uitgevoerd.

| Pakket | Prijs in mail | Setmore-product |
| --- | --- | --- |
| 3 behandelingen | €255 | `4fd2b67f-504e-417e-abf1-d841e3c16d04` |
| 6 behandelingen | €510 | `5492eab3-cea6-4827-99b9-4c052b833695` |
| 10 behandelingen | €850 | `973d4731-f775-49ba-b31d-af0d078e8c74` |

Bij de eerste controle toonde Setmore nog €225, €450 en €750. Matthijs heeft bevestigd dat die prijzen worden aangepast. De mail houdt daarom de aangeleverde €255, €510 en €850 aan. Controleer vóór verzending dat de bedragen in de volledige boekingsflow overeenkomen. Verwijder of vervang de pakketten niet zonder de links opnieuw te controleren.

## Vóór verzending

1. **Afbeelding publiceren.** De HTML gebruikt:
   `https://www.enisahealingenmassage.nl/images/energetische-blokkades-loslaten-email.jpg`
   Deze URL gaf tijdens de controle nog **HTTP 404**. Publiceer de nieuwe JPEG via de gebruikelijke websitedeployment, of upload hem naar de eigen MailerLite-bestandsbibliotheek en vervang de `src` door de werkelijke publieke HTTPS-URL. Controleer daarna HTTP 200 én content-type `image/jpeg`. De afbeelding is nog niet geüpload of gedeployd door deze taak.
2. **Prijzen controleren.** Laat de bevestigde wijzigingen in Setmore doorvoeren en controleer alle drie de pakketknoppen, inclusief de uiteindelijke prijsweergave.
3. **HTML importeren.** Gebruik de MailerLite HTML-editor en neem de vaste onderwerpregel en preheader over. Controleer de platte-tekstversie, of gebruik `email.txt` waar de editor dit toestaat.
4. **Voornaam controleren.** MailerLite gebruikt `name` voor de voornaam. Controleer bij import dat dit veld alleen de voornaam bevat. Met `name = Anna` hoort “Beste Anna,” te verschijnen; bij een leeg veld “Beste klant,”. Test ook een lange naam op mobiel.
5. **Afzender en antwoorden instellen.** Gebruik Enisa Healing & Massage als afzendernaam en een geverifieerd afzenderadres. Stel het antwoordadres in op de bewaakte mailbox `info@enisahealingenmassage.nl`.
6. **Afmelden testen.** Controleer dat MailerLite `{$unsubscribe}` omzet naar een werkende persoonlijke afmeldlink. De oorspronkelijke mogelijkheid om met AFMELDEN te antwoorden is behouden; die antwoorden moeten daadwerkelijk worden verwerkt en de afzenders moeten als uitgeschreven worden gemarkeerd. De HTML verwerkt geen antwoorden automatisch.
7. **Ontvangers afschermen.** Verstuur als reguliere MailerLite-campagne aan de bedoelde abonneegroep: MailerLite levert de mails individueel af. Zet nooit alle klantadressen samen in Aan/CC en neem geen adressenlijst op in de mailtekst of HTML. Ontvangersprivacy wordt door de verzendwijze geregeld, niet door de HTML.
8. **Volledige test uitvoeren.** Maak een aparte testcampagne met uitsluitend eigen testcontacten, één met voornaam en één zonder. Een gewone layout-testmail test niet alle systeemvariabelen. Controleer personalisatie, afbeelding, afmeldlink en drie pakketkeuzes vanuit de ontvangen mail. Bekijk ook Gmail, Outlook en mobiele weergave, met afbeeldingen aan én uit.
9. Verstuur alleen naar de bedoelde abonnees die nieuws en aanbiedingen mogen ontvangen. Plan of verstuur de echte campagne pas na controle en expliciete goedkeuring.

## Uitgevoerde controles

- De aangeleverde tekst en volgorde vergeleken met de HTML en tekstversie; alleen toegestane technische toevoegingen.
- HTML-nesting, Nederlandse documenttaal, presentatietabellen, absolute links, alt-tekst en afwezigheid van oningevulde schrijfmarkeringen gecontroleerd.
- Drie verschillende pakket-ID's gecontroleerd; de links staan ook in de tekstversie.
- De drie directe boekingslinks gaven HTTP 200; namen en pakketkeuzes zijn gecontroleerd op de publieke Setmore-pagina. Dit is geen voltooide boekingstest.
- Website gaf HTTP 200; publieke JPEG-URL gaf nog HTTP 404, zie verzendblokkade hierboven.
- Kortingen nagerekend: 3 × €95 − €255 = €30; 6 × €95 − €510 = €60; 10 × €95 − €850 = €100.
- JPEG-formaat en afmetingen gecontroleerd. De HTML is circa 12,5 KB, ruim onder de gebruikelijke Gmail-afkapgrens.
- MailerLite-personalisatiesyntax bevestigd in de officiële documentatie:
  https://www.mailerlite.com/help/how-to-use-variables-in-mailerlite

**Status:** technisch voorbereid voor import, nog niet vrijgegeven voor verzending. Geen campagne verstuurd, geen klantenlijst geraadpleegd en niets in Setmore gewijzigd. Rendering in echte mailclients en verwerking van systeemtags moeten nog via MailerLite worden getest.
