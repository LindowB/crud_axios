const express = require('express'); // declaration constante app qui requiert express
const BodyParser = require('body-parser');
const cors = require('cors');
const app = express(); // delcaration de la const qui a pour affectation fonction express
const mysql = require('mysql'); // const mysql affectation package mysql

const db = mysql.createPool({ // etablissement de  connexion avec la base de données
    host:"localhost",
    user: "root",
    password:"",
    database: "cruddb"
})

app.use(cors());
app.use(express.json());


app.get("/", (req, res) =>{ // creation route pour "/" avec la fonction get et une fonction qui prend comme param requete et reponse

    // const sqlInsert = "INSERT INTO movie_reviews (movieName, MovieReview) VALUES ('inception', 'good movie');" // requete SQL

   /* db.query(sqlInsert, (err, result) =>{ // execution de la requete
          res.send("res send text") // envoie d'une reponse
    });
  */

    
})

app.get("/api/get", (req, res) => {
    const sqlSelect = "SELECT * FROM `movie_reviews`;"
    db.query(sqlSelect, (err, result) => {
        res.send(result)

    })

})

app.post('/api/insert', (req, res) =>{
    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;
    const sqlInsert = "INSERT INTO movie_reviews(movieName, movieReview) VALUES (?,?);"
    db.query(sqlInsert, [movieName, movieReview], (req, result) => {
        console.log(result)

    })

})
app.delete('/api/delete/:movieName', (req, res) => {
    const name = req.params.movieName;
    const sqlDelete = "DELETE FROM movie_reviews WHERE movieName = ?;";
    db.query(sqlDelete, name, (err, result) => {
        if (err){
        console.log(err)
        } else { console.log(result)}
    })

})
app.put('/api/update/', (req, res) => {
    const name = req.body.movieName;
    const review = req.body.movieReview;
    const sqlUpdate = "UPDATE movie_reviews SET movieReview = ? WHERE movieName = ?;";
    db.query(sqlUpdate, [review, name], (err, result) => {
        if (err){
        console.log(err)
        } else { console.log(result)}
    })

})

app.listen(3001,() => { //usage fonction listen avec comme parametre un port ainsi qu'une fonction qui renvoie un message sur la console

    console.log('listening on port 3001'); // confirmation connexion serveur

} )