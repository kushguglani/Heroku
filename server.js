//npm
const express =  require('express');
const hbs = require('hbs');

//node
const fs = require('fs');


//decalred constant
const app = express();
const port = process.env.PORT || 3000;
const maintainance = false; // make it true when site is on maintainance

//log file maintainance
app.use((request,response,next)=>{
    let logs = `${new Date().toString()} , ${request.url} ,${request.method}`
    fs.appendFile('log-server.js',`${logs} '\n' `,(err)=>{
        if(err)
            console.log("unable to make logs");
        next();
    })
})


//maintainance code
app.use((request,response,next)=>{
    if(maintainance)
    response.render('maintainance.hbs');
    else
        next();
});

// for html files
app.use(express.static(__dirname+'/public'));

// helper for fbs files
hbs.registerHelper('getCurrentYear',()=> new Date().getFullYear());

//partials
hbs.registerPartials(__dirname+'/views/partials');
// for home or first page render
app.get('/',(request,response)=>{
    response.render('home.hbs',{
        title : 'Home Page',
        welcomeMessage : 'Welcome to our home page'
    });
});

app.get('/about',(request,response)=>{
    response.render('home.hbs',{
        title : 'About Page',
    });
});
app.get('/projects',(request,response)=>{
    response.render('portfolio.hbs',{
        title:'Projects'
    })
});


app.listen(port,()=>{
    console.log(`server is up on port `+port)
});