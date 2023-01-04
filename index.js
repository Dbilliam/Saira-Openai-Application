// 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
const { Configuration, OpenAIApi} = require("openai");
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config();
const port = 8000

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true}));
app.use(bodyParser.json())
app.use(cors())


const configuration = new Configuration({
    organization: process.env.OPENAI_ORGANAZATION_KEY,
    apiKey: process.env.OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

   

// create a simple express api that calls the functions above

app.post('/', async (req, res) => {
    const { message , currentModel, tokens} = req.body;
    console.log(tokens)
    const response = await openai.createCompletion({
        model: `${currentModel}`,
        prompt: `${message}`,
        max_tokens: tokens,
        temperature: 0,
      });
      res.json({
        message:response.data.choices[0].text
      })
})



app.get('/models', async (req, res) => {
  const response = await openai.listModels()
  console.log(response.data.data)
  res.json({
    models: response.data.data
  })
})
app.listen(port, () => {
    console.log('Example app listening at http://localhost:5000/')
})