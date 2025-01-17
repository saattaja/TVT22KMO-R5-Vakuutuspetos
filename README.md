# Vahinkoilmoitussovellus vakuutusmeklareille
Tämä projekti on tehty 4 hengen ryhmätyönä osana IT-insinööriopintoja syksyllä 2023 Oulun ammattikorkeakoulussa. Tehtävänä oli keksiä ja luoda omavalintainen mobiilisovellus joka sisältää erilaisia ominaisuuksia. Tämä sovellus on rakennettu vakuutusmelkareille, jotka haluavat tiedon vahingosta tai muusta tapahtumasta ennen kuin työskentely itse vakuutusyhtiön kanssa alkaa. Tietojen saaminen lomakemuodossa nopeuttaa käsittelyprosessia, kun ylimääräinen lisäkysymysten ja selvitysten määrä vähenee.

<img src="https://github.com/saattaja/TVT22KMO-R5-Vakuutuspetos/assets/113536134/30b0a95b-b705-418c-b71f-493e185bf3e4" height="500">
<img src="https://github.com/saattaja/TVT22KMO-R5-Vakuutuspetos/assets/113536134/7a8a1a4e-8ca2-4f15-aded-ab2cd1daf369" height="500">
<img src="https://github.com/saattaja/TVT22KMO-R5-Vakuutuspetos/assets/113536134/56daea19-e7c6-4077-9d47-53f6c2d73fc3" height="500">

## Perusidea
Sovellus on tehty React Nativea käyttäen. Sovellukseen rekisteröidytään ja kirjaudutaan sähköpostilla ja salasanalla. Peruskäyttäjä eli asiakas näkee etusivullaan lähettämänsä vahinkoilmoitukset sekä niiden tilan. Hän voi lähettää vahinkoilmoituksen, lähettää viestin vakuutusmeklarille, tarkastella omia tietoja, vaihtaa salasanan, kirjautua ulos ja poistaa käyttäjätunnuksensa. Vakuutusmeklari näkee omassa etusivunäkymässään hänen vastuualueensa avoimet vahinkoilmoitukset ja voi muuttaa niiden tilaa. Admin-näkymässä etusivulla on kaikki rekisteröityneet käyttäjät ja admin voi vaihtaa jokaiselle käyttäjälle roolin (peruskäyttäjä tai meklarien vastuualueet).

## Tietokanta ja autentikointi
Tietokantana on käytössä Googlen Firebase Firestore noSQL-tietokanta. Asiakkaiden tiedot, viestit sekä vahinkoilmoitukset tallennetaan ja niitä luetaan tietokannasta. Firebasen Cloud Storageen tallennettiin lomakkeen mukana laitettu kuva. Firebasen Authenticationia hyödynnettiin rekisteröitymiseen.

## Oma osuuteni ryhmätyöprojektissa
Omaa kädenjälkeäni tässä projektissa on muun muassa navigoinnin koodaus, tietokannan alustus, lomakkeen lähetys(tiedon lähettäminen tietokantaan), etusivunäkymä(tiedon hakeminen ja rajaus tietokannasta), viestien lähetys, käyttäjätietojen tarkistaminen, uloskirjautuminen ja kuvan hakeminen tietokannasta näkyviin.

*Janita Kaikkonen*
