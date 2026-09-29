# Treenipäiväkirja

Harjoituspäiväkirja kestävyysurheilijalle. Treenit ja niiden tulokset
(kesto, matka, syke, fiilis) yhdessä paikassa.

## Kenelle

Kestävyysurheilijalle, joka seuraa omaa harjoitteluaan.

## Miksi

Treenit ovat hajallaan puhelimen muistiinpanoissa ja urheilukellon
sovelluksessa, eikä kehitystä näe yhdestä paikasta.

## Teknologiat

- **Frontend:** React + React Router + Vite
- **Backend:** Node.js + Express
- **Tietovarasto:** JSON-tiedosto
- **Versionhallinta:** Git + GitHub

## Asennus ja käynnistys

### Vaatimukset

- Node.js (v18 tai uudempi)
- npm

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Backend käynnistyy osoitteessa http://localhost:3000

`.env`-tiedoston sisältö (esimerkki):

```
PORT=3000
FRONTEND_URL=http://localhost:5173
```

### Frontend

Avaa toinen komentorivi-ikkuna:

```bash
cd frontend
npm install
npm run dev
```

Frontend käynnistyy osoitteessa http://localhost:5173

### Käyttö

Avaa selaimessa http://localhost:5173

## Ominaisuudet

- Treenilista — kaikkien treenien listaus
- Treenin lisäys — lomake uuden treenin tallentamiseen
- Treenin muokkaus — olemassa olevan treenin päivittäminen
- Treenin poisto — vahvistuksella
- Treenin tiedot — yhden treenin näkymä
- 404-sivu — tuntemattomille reiteille
- Lataus- ja virhetilat — käyttäjä ei jää tyhjän ruudun eteen

## Rajapinta

| Metodi | Reitti | Kuvaus |
|---|---|---|
| GET | `/api/treenit` | Listaa kaikki treenit |
| GET | `/api/treenit/:id` | Yksi treeni |
| POST | `/api/treenit` | Luo uusi treeni |
| PUT | `/api/treenit/:id` | Päivitä treeni |
| DELETE | `/api/treenit/:id` | Poista treeni |
| GET | `/api/health` | Health-check |

## Työnjako

Yksin tehty projekti — **Artem Komarov** vastasi kaikista osa-alueista:
backend, frontend, dokumentaatio ja versionhallinta.

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