import express from 'express';
import fetch from 'node-fetch';
import fs from 'fs';

const app = express();
const PORT=process.env.PORT ||  5000;

app.use(express.json());


// Welcome route
app.get('/', async (req, res) => {
    res.send('Welcome to Amazon Scraper API!');
});
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin" , "*");
    res.header("Access-Control-Allow-Headers" , "Origin , X-Requested-with , Content-Type, Accept");
    res.header("Access-Control-Allow-Methods" , 'PUT , POST,GET,DELETE,OPTIONS' );
    next();
  });

app.get('/dev', async (req, res) => {
    res.send('The Developer of this API is Akash Mane');
});
app.get('/link', async (req, res) => {
    const  link  = req.query.link
    const Name  =  req.query.Name
    
    try {
       
        async function download() {
            const response = await fetch(link);
            const buffer = await response.buffer();
            fs.writeFile(`./${Name}.jpg`, buffer, () => 
            res.send("finished Downloading"))

        }
          download()

    } catch (error) {
        res.json(error);
    }
});



app.listen(PORT , () => console.log(`Server is running on the server ${PORT}`))