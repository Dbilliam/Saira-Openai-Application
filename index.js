const { Configuration, OpenAIApi} = require("openai");
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
dotenv.config()

const port = 8000

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true}));
app.use(bodyParser.json())
app.use(cors())


const configuration = new Configuration({
    organization: "org-fnl47Qe3QUQIexfhZrt8d167",
    apiKey: `${process.env.OPENAI_KEY}`
});

const openai = new OpenAIApi(configuration);

   

// create a simple express api that calls the functions above

app.post('/', async (req, res) => {
    const { message , currentModel, tokens, temperature} = req.body;
    console.log(tokens)
    const response = await openai.createCompletion({
        model: `${currentModel}`,
        prompt: `${message}`,
        max_tokens: tokens,
        temperature: temperature,
      });
      res.json({
        message:response.data.choices[0].text,
      })

})



app.get('/models', async (req, res) => {
  const response = await openai.listModels()
  // console.log(response.data.data)
  res.json({
    models: response.data.data
  })
})
app.listen(port, () => {
    console.log('Example app listening at http://localhost:8000/')
})