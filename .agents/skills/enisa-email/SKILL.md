---
name: enisa-email
description: Maak complete Nederlandstalige HTML-mails, nieuwsbrieven en actiemails in de huisstijl en persoonlijke toon van Enisa Healing & Massage, klaar voor import in MailerLite. Gebruik bij verzoeken om een e-mail, mailing, nieuwsbrief, campagne of HTML-mail voor Enisa te schrijven of aan te passen. Lever ook een onderwerpregel, preheader en platte-tekstversie.
---

# Enisa e-mail

Maak een persoonlijke mail van Enisa, geen generieke marketingnieuwsbrief. De zomeractie-mail is de primaire stijlreferentie; de eerste website-mail is alleen aanvullende inspiratie.

## Lees eerst

- Lees `references/huisstijl.md` voor vormgeving, toon, bronnen en MailerLite-afspraken.
- Lees `assets/basis.html` en gebruik deze als technische basis. Alle paden hier zijn relatief aan deze skillmap.
- Bekijk bij een bestaande mail ook de aangeleverde HTML of tekst. Behandel voorbeeldmails als referentie, niet als bron van actuele prijzen of acties.

## Werkwijze

1. **Bepaal de boodschap.** Gebruik de briefing voor onderwerp, doelgroep, nieuws, behandeling, aanbod en gewenste actie. Vraag alleen naar ontbrekende feiten die nodig zijn, liefst in één korte vraag. Verzin geen kortingen, codes, geldigheidsdatums, beschikbaarheid of resultaten.
2. **Controleer feiten.** Gebruik bij behandelingsinformatie de relevante bestanden in `content/behandelingen/`, zonder ze te wijzigen. Controleer contactgegevens in `app/constants/businessInfo.ts`. Bij tegenstrijdige prijzen of voorwaarden: vraag om bevestiging. Gebruik historische voorbeeldprijzen nooit als actuele waarheid.
3. **Respecteer definitieve tekst.** Bij een aangeleverde definitieve tekst of “inhoud niet aanpassen”: behoud onderwerpregel, preheader, formuleringen, bedragen, voorwaarden en ondertekening letterlijk. Pas alleen expliciet gevraagde techniek toe, zoals een gepersonaliseerde aanhef, boekingsknoppen en een aanvullende afmeldlink. Corrigeer ook spelfouten of leestekens niet stilzwijgend. Een expliciete afbeeldingskeuze gaat vóór een algemene beeldvoorkeur in de briefing. Schrijf alleen bij een schrijfopdracht nieuwe tekst vanuit Enisa: Nederlands, ik/jij, warm, rustig en uitnodigend. Korte alinea's; één hoofdboodschap en normaal één primaire CTA (meerdere pakketknoppen als dat gevraagd wordt). Sluit zonder opgegeven ondertekening normaal af met “Liefs,” en “Enisa”. Geen medische garanties of druk om te boeken.
4. **Bouw de HTML.** Vul de basis in en pas de blokken aan de boodschap aan. Verwijder ongebruikte blokken; vul ze niet met algemene opvultekst. Gebruik alleen bestaande, gecontroleerde links en afbeeldingen. Voeg geen websitecomponenten, composables, routes, dependencies of verzendintegratie toe.
5. **Lever bestanden.** Schrijf standaard in `emails/<beschrijvende-campagneslug>/`:
   - `email.html`: volledige HTML, direct te importeren in de MailerLite HTML-editor.
   - `email.txt`: inhoudelijk overeenkomende platte-tekstversie, met CTA-URL, afzender en afmeldtag.
   - `campagne.md`: onderwerpregel, preheader en eventuele verzendcontroles of ontbrekende gegevens. Geef alleen bij een schrijfopdracht twee alternatieve onderwerpregels; niet bij een definitief aangeleverde onderwerpregel.
   Gebruik een andere map als de gebruiker die opgeeft. Overschrijf geen bestaande campagne zonder opdracht. Als de gebruiker expliciet alleen code wil, lever de volledige HTML in één codeblok en de onderwerpregel/preheader apart.
6. **Controleer voor oplevering.** Voer de onderstaande checklist uit. Meld precies welke controles zijn uitgevoerd en welke nog in MailerLite moeten gebeuren. Verstuur of plan nooit een campagne zonder expliciete opdracht.

## Template invullen

De `{{...}}`-velden zijn uitsluitend schrijfmarkeringen, geen werkende MailerLite-tags. Vervang ze allemaal:

| Markering | Inhoud |
| --- | --- |
| `{{ONDERWERP}}` | HTML-geëscapete onderwerpregel voor de documenttitel |
| `{{PREHEADER}}` | Korte aanvullende inboxtekst, ongeveer 60–100 tekens |
| `{{AANHEF}}` | Veilige aanhef, standaard “Lieve jij,”; zie personalisatie in de referentie |
| `{{INTRO_HTML}}` | Eén of twee persoonlijke introductiealinea's |
| `{{HOOFDBLOKKEN_HTML}}` | Complete tabelrijen voor nieuws, behandeling en/of aanbod; mag leeg zijn |
| `{{CTA_URL}}` | Gecontroleerde absolute URL, standaard de Setmore-boekingspagina |
| `{{CTA_TEKST}}` | Concreet en vriendelijk, bijvoorbeeld “Plan je moment voor jezelf” |
| `{{AFSLUITING_HTML}}` | Korte afronding vóór de vaste ondertekening |
| `{{PRAKTIJKADRES}}` | Actueel, HTML-geëscapet praktijkadres uit de bevestigde bedrijfsgegevens |

Escape tekst en attribuutwaarden correct, waaronder `&` als `&amp;`. Voeg HTML-blokken alleen als gecontroleerde markup in. Laat de MailerLite-systeemtag `{$unsubscribe}` intact; deze wordt pas door MailerLite verwerkt.

## Oplevercheck

- Gebruik nergens em-dashes (Unicode U+2014), ook niet via HTML-entiteiten. Vervang ze door passende komma's, punten of dubbele punten. Dit is een expliciete gebruikersvoorkeur en geldt ook voor aangeleverde definitieve tekst.
- Onderwerpregel, preheader, HTML en tekstversie passen bij dezelfde boodschap. Controleer definitief aangeleverde tekst woordelijk tegen de uitvoer, los van expliciet toegestane technische toevoegingen.
- Ontvangersprivacy is een verzendinstelling, geen HTML-functie. Adviseer een MailerLite-campagne met individuele aflevering; zet nooit een klantenlijst in Aan/CC of in het HTML-bestand. Bewaar een gevraagde afmeldmogelijkheid per antwoord, maar voeg ook de systeemlink toe en benoem dat antwoorden handmatig verwerkt moeten worden.
- Prijzen, korting en totaalbedragen kloppen; bij een actie zijn periode (inclusief jaar) en voorwaarden duidelijk en bevestigd.
- Geen `{{...}}`, TODO's, verzonnen feiten, lege `href`/`src`, tracking-ID's uit voorbeelden of verlopen voorbeeldacties.
- Geldige `<!doctype html>`, `lang="nl"`, UTF-8 en viewport. Presentatietabellen hebben `role="presentation"`.
- Essentiële styling staat inline; e-mail blijft leesbaar zonder afbeeldingen, webfonts of mediaqueries.
- Geen scripts, formulieren, iframes, externe stylesheets, flexbox/grid of base64-afbeeldingen.
- Mobiele padding circa 20–24 px, bodytekst minimaal 16 px, ruime regelafstand en een goed aanklikbare knop.
- Gebruik standaard het gecentreerde, klikbare logo van 92 × 92 px in de roze topbanner, zoals in de zomeractie-mail. Link naar de website; vervang deze logoheader niet door een tekstheader. Zie de referentie voor de bron-URL en de compatibiliteitscheck.
- Afbeeldingen hebben een absolute HTTPS-URL, passende alt-tekst en vaste breedte met vloeibare schaling. Geef voorkeur aan PNG/JPEG, zie referentie.
- Controleer gebruikte gewone links en afbeeldings-URL's met een HTTP-request indien netwerk beschikbaar is. Controleer ook content-type en bestemming; HTTP 200 alleen bewijst niet dat de bestemming inhoudelijk klopt. Rapporteer als controle niet mogelijk is. Bezoek geen gepersonaliseerde afmeldlinks.
- Afzendernaam, bevestigd fysiek praktijkadres en zichtbare Nederlandstalige afmeldlink aanwezig. Afmeldtag nooit leegmaken of vervangen door `#`.
- HTML liefst onder 80 KB en altijd onder circa 102 KB om Gmail-afkapping te beperken.
- Maak onderscheid tussen **technisch gecontroleerd** en **klaar om te verzenden**: MailerLite-testmail, afmeldlink, personalisatie en rendering in mobiele mail, Gmail en Outlook moeten vóór verzending gecontroleerd zijn. Claim geen inboxcompatibiliteit op basis van alleen een browserpreview.

## Voorbeeldopdracht

“Maak een nieuwsbrief over [onderwerp]. Dit zijn de bevestigde details: [informatie]. Houd de rustige stijl van de zomeractie-mail aan en lever de HTML voor MailerLite.”
