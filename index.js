import express from "express";
import ejs from "ejs";
import bodyParser from "body-parser";
import axios from "axios";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;
// const YOUR_API_KEY = "";

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "Movies",
    password: "Om16",
    port: 5432,
})
db.connect();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

let movies = [{id : 1, title : "Dhurandhar",  watch_date : '2026-05-01', rating : 5, review : "Best Movie", poster : "https://cinema.mu/wp-content/uploads/2025/12/Dhurandhar-Poster-500x740.jpg"}];

app.get("/", async (req, res)=>{
    try{
        const r = await db.query("SELECT * FROM movies ORDER BY watch_date ASC");
        movies = r.rows;
    }
    catch(err){
        console.log(err);
    }
    res.render("index.ejs", {m : movies});
})

app.get("/add", (req, res)=>{
    res.render("add.ejs");
})

app.get("/edit/:id", async (req, res)=>{
    try{
        const r = await db.query("SELECT id, title, rating, review, poster, TO_CHAR(watch_date, 'YYYY-MM-DD') AS watch_date FROM movies WHERE id=$1", [req.params.id]);
        movies = r.rows;
    }
    catch(err){
        console.log(err);
    }
    res.render("edit.ejs", {m : movies[0]});
})

app.get("/delete-confirm/:id", (req, res)=>{
    res.render("delete-confirm.ejs", {movieId : req.params.id});
})

app.post("/add", async (req, res)=>{
    if (req.body.password !== process.env.PASSWORD) {
        return res.render("error.ejs");
    }
    try{
        let response = await axios.get("http://www.omdbapi.com/", {
            params: {
                t: req.body.title.trim(),
                apikey: process.env.OMDB_API_KEY
            }
        });
        let p = "";
        if (response.data.Response === "True" && response.data.Poster !== "N/A") {
            p = response.data.Poster;
        } else {
            p = "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
        }
        const r = await db.query("INSERT INTO movies (title, watch_date, rating, review, poster) VALUES ($1, $2, $3, $4, $5)", [req.body.title, req.body.watch_date, req.body.rating, req.body.notes, p]);
    }
    catch(err){
        console.log(err);
    }
    res.redirect("/");
})

app.post("/edit/:id", async (req, res)=>{
    if (req.body.password !== process.env.PASSWORD) {
        return res.render("error.ejs");
    }
    try{
        let response = await axios.get("http://www.omdbapi.com/", {
            params: {
                t: req.body.title.trim(),
                apikey: process.env.OMDB_API_KEY
            }
        });
        let p = "";
        if (response.data.Response === "True" && response.data.Poster !== "N/A") {
            p = response.data.Poster;
        } else {
            p = "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
        }
        const r = await db.query("UPDATE movies SET title = $1,  watch_date = $2, rating = $3, review = $4, poster = $5 WHERE id=$6", [req.body.title, req.body.watch_date, req.body.rating, req.body.notes, p, req.body.id]);
    }
    catch(err){
        console.log(err);
    }
    res.redirect("/");
})

app.post("/delete", async (req, res)=>{
    if (req.body.password !== process.env.PASSWORD) {
        return res.render("error.ejs");
    }
    try{
        const r = await db.query("DELETE FROM movies WHERE id=$1", [req.body.id]);
    }
    catch(err){
        console.log(err);
    }
    res.redirect("/");
})

app.listen(port, ()=>{
    console.log(`Server running on ${port}.`)
})