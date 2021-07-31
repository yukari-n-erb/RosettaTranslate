const express = require('express')
const app = express()
const path = require('path');
const port = process.env.PORT || 3001
const bp = require('body-parser')
const translate = require("deepl");
// const fetch = require("node-fetch");

require('dotenv').config();


app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('/api', (req, res) => {
    res.send('Hello World!')
})

app.get('/deepl', (req, res) => {
    console.log("get deepl");
    // res.send('Hello DeepL API!')
    res.json({ message: "Hello DeepL API!" });
})

app.post('/deepl', (req, res, next) => {
    (async () => {
        console.log("post deepl");
        console.log(req.body);

        const originalText = req.body.text;

        const translatedText = await translate({
            free_api: true,
            text: originalText,
            target_lang: 'JA',
            auth_key: process.env.DEEPLKEY,
        })
        .then(result => {
            return result.data.translations[0].text;
        })
        .catch(error => {
            console.error(error)
        });
        console.log(originalText);
        console.log(translatedText);
        // res.send(translatedText);
        res.json({ message: translatedText });
    })().catch(next);
})

// app.post('/google', (req, res, next) => {
//     (async () => {
//         console.log("post google");
//         console.log(req.body);

//         const originalText = req.body.text;

//         const data = {
//             p: originalText,
//             source: "ja",
//             target: "en",
//             format: "text"
//         }
//         const requestOptions = {
//             method: 'POST',
//             headers: {
//                 'Authorization': `Bearer ${process.env.GOOGLEKEY}`,
//                 'Content-Type': 'application/json; charset=utf-8'
//             },
//             body: JSON.stringify(data)
//         };
//         console.log(requestOptions.headers.Authorization);

//         const translatedText = fetch('https://translation.googleapis.com/language/translate/v2', requestOptions)
//         .then((res) => console.log(res))

//         console.log(originalText);
//         // console.log(translatedText);
//         // res.send(translatedText);
//         res.json({ message: translatedText });
//     })().catch(next);
// })




app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'../frontend/build/index.html'));
});

app.listen(port, () => {
  console.log(`listening on *:${port}`);
})