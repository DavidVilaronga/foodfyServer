const express = require('express')
const nunjucks = require('nunjucks')
const items = require('./data.js')

const server = express()

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    noCache: true
})

server.get("/", function(req, res){
    return res.render("main", {items})
})

server.get("/about", function(req, res){
    return res.render("about")
})

server.get("/recipe", function(req, res){
    return res.render("recipe", {items})
})

server.get("/detail/:id", function(req, res){
    const detailIndex = req.params.id
    items.find(function(item){
        if(item.id==detailIndex){
            return res.render('detail', {item})
        }
    })
})

server.listen(5000, function(){
    console.log("server is running")
})