const express = require('express')
const app = express()
const port = process.env.PORT || 3001
const bp = require('body-parser')
const translate = require("deepl");

require('dotenv').config();


app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.get('/', (req, res) => {
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

app.listen(port, () => {
  console.log(`listening on *:${port}`);
})