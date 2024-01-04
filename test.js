const express = require('express')
const hbs = require('hbs')
const path = require('path')
const axios = require('axios');
const fs = require('fs')
const cheerio = require('cheerio');

const port = 80
const app = express()

app.set('view engine', 'hbs')
app.set('views',__dirname +'/views')

app.use(express.urlencoded({ extended: true }));


app.get('/',(req,res)=>{
  const user = {
    username:"Aditya",
    age:21
  }
  res.render('index',{user})
})


app.post('/submit', async (req,res)=>{
  const inputData = req.body.link
  console.log(` Received Data: -> ${inputData}`);
  
  try{
    const link = await axios.get(inputData);
    
    const $ = cheerio.load(link.data);
    const title = $('title').text();

    const filePath = path.join(__dirname, 'website', `${title}.html`);
    fs.writeFile(filePath, link.data,(err)=>{
      if (err){
        console.log(`ERROR OCCURRED: ${err}`)
      }
      else{
        res.sendFile(filePath);
      }
    })
    
  }
  catch(err){
    console.log(`ERROR OCCURRED: ${err}`)
    res.status(400).send('Bad Request');
  }  

  
})


app.listen(port,()=>{
  console.log(`server running on http://127.0.0.1:${port}`)
})