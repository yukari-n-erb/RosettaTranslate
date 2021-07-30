const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bp = require('body-parser')
const translate = require("deepl");

require('dotenv').config();


app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/deepl', (req, res) => {
    res.send('Hello DeepL API!')
})

app.post('/deepl', (req, res, next) => {
    (async () => {
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
        res.send(translatedText);
    })().catch(next);
})

app.listen(port, () => {
  console.log(`listening on *:${port}`);
})