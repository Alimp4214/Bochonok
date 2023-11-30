import express from "express";
import { Sequelize } from "sequelize";
import initConnection from "./functions/init-models.js";
import { notesInitter } from "./models/notes.js";
import Notes from "./models/notes.js";


const connection = new Sequelize("postgres", "postgres", "5301", {
    dialect: "postgres",
    host: "localhost",
    port: "5432",
    logging: false,
    sync: { alter: true }
});

await initConnection([notesInitter], connection);

const app = express();
const urlencodedParser = express.urlencoded({extended: false});
 
const port = 3000;

app.set("view engine", "hbs");

// синхронизация с бд, после успшной синхронизации запускаем сервер
connection.sync().then(()=>{
  app.listen(3000, function(){
    console.log("Сервер ожидает подключения...");
  });
}).catch(err=>console.log(err));
 

// получение данных
app.get("/", function(req, res){
  Notes.findAll({raw: true }).then(data=>{
    res.render("index.hbs", {
      notes: data
    });
  }).catch(err=>console.log(err));
});

app.get("/create", function(req, res){
  res.render("create.hbs");
});

// добавление данных
app.post("/create", urlencodedParser, function (req, res) {
         
  if(!req.body) return res.sendStatus(400);

  const usernotes = req.body.name;

  Notes.create({ notes: usernotes}).then(()=>{
    res.redirect("/");
  }).catch(err=>console.log(err));
});



// получаем объект по id для редактирования
app.get("/edit/:id", function(req, res){
  const notesid = req.params.id;
  Notes.findAll({where:{id: notesid}, raw: true })
  .then(data=>{
    res.render("edit.hbs", {
      notes: data[0]
    });
  })
  .catch(err=>console.log(err));
});


// обновление данных в БД
app.post("/edit", urlencodedParser, function (req, res) {
         
  if(!req.body) return res.sendStatus(400);
 
  const usernotes = req.body.name;
  const notesid = req.body.id;
  Notes.update({notes:usernotes}, {where: {id: notesid} }).then(() => {
    res.redirect("/");
  })
  .catch(err=>console.log(err));
});


// удаление данных
app.post("/delete/:id", function(req, res){  
  const notesid = req.params.id;
  Notes.destroy({where: {id: notesid} }).then(() => {
    res.redirect("/");
  }).catch(err=>console.log(err));
});


