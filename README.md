# movie-api
Jednostavan REST API za upravljanje filmovima i žanrovima, napravljen u Node.js, Express, Sequelize i MySQL. Omogućuje CRUD operacije za filmove i žanrove, uz Swagger dokumentaciju.

# Movie API 

Ovo je jednostavan REST API za upravljanje filmovima i žanrovima, napravljen u Node.js, Express, Sequelize i MySQL.

## Funkcionalnosti
- CRUD za filmove (Movies)
- CRUD za žanrove (Genres)
- Relacija: Svaki film pripada jednom žanru
- Swagger UI za automatsku dokumentaciju API-ja

## Tehnologije
- Node.js
- Express
- Sequelize (ORM)
- MySQL
- Swagger UI

## Pokretanje projekta

1. **Instaliraj ovisnosti:**
npm install
2. **Konfiguriraj pristup bazi u `db.js`**  
(podrazumijevano je `root` bez lozinke na `localhost` za bazu `filmovi`).

3. **Pokreni development server:**
npm start

4. **API dokumentacija**:  
Otvori u pregledniku  
[http://localhost:3000/api-docs](http://localhost:3000/api-docs)




