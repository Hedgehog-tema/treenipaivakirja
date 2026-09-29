## Tekoälyn käyttö


**Mihin käytin:**
- Git-komentojen ja komentorivin käytön opetteluun (esim. `git remote add`, `git branch -M main`).
- Ongelmatilanteiden ratkaisemiseen: virheiden tulkinta (esim. `git is not recognized`, `EJSONPARSE`), tiedostopolkujen ja oikeiden komentojen löytäminen.


**Mitä muokkasin:**
- Kaikki koodi on kirjoitettu ja muokattu itse — tekoälyä ei käytetty koodin generointiin.

**Mitä hylkäsin:**
- Ei hylättyjä ehdotuksia — tekoälyä käytettiin vain komentojen ja virheiden selvittämiseen, ei koodin suunnitteluun.

**Miten tarkistin:**
- Jokainen backend-reitti testattiin Thunder Clientillä (GET, POST, PUT, DELETE).
- Frontend testattiin selaimessa: listan lataus, lomakkeen lähetys, muokkaus, poisto.
- Luin jokaisen tiedoston läpi ja varmistin, että osaan selittää sen.
- Testasin sovelluksen tyhjällä datalla ja virhetilanteilla (404, 400).

## Jatkokehitys

- **Suodatus ja lajittelu** — treenien suodatus lajin tai päivämäärän mukaan
- **Automaattiset testit** — Jest/Vitest backendille ja frontendille
- **Vientitoiminto** — treenien vienti CSV- tai PDF-tiedostoon
- **Parempi virheenkäsittely** — tarkemmat virheilmoitukset lomakkeissa