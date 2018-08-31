const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
const port = process.env.PORT || 3000;
hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine','hbs');
// app.use((req,res,next)=>{
//     res.render('maintance.hbs');
  
// });
app.use(express.static(__dirname +'/public'));
app.use((req,res,next) =>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (error)=>{
        if(error){
            console.log('Unable to append that file');
        }
    })
    next();
});


hbs.registerHelper('currentYear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
})
app.get('/',(req,res)=>{
    //res.send('<h1>Hello Express!</h1>');
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        purpose: `Build for emily`
    });
});




app.get('/about',(req,res)=>{
     res.render('about.hbs',{
         pageTitle: `Lei's Page`
     });
});

app.get('/bad',(req,res)=>{
    res.send({
        name: 'lei',
        wife: 'yue',
        daughter: 'emily'
    })
});

app.listen(port,()=>{
    console.log(`Server is up on port ${port}`);
});