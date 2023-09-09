require("dotenv").config()
const express = require("express")
const OpenAI = require("openai")
const bodyParser = require("body-parser")

app = express()

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.post("/impacts", async (req, res) => {
	const product = req.body.product
	const response = await openai.chat.completions.create({
		model: "gpt-3.5-turbo",
		messages: [
			{
				role: "user",
				content: `What are the environmental impacts of ${product}, but keep it brief`,
			},
		],
		temperature: 0.8,
		max_tokens: 256,
	})
	console.log(response.choices[0].message)
	console.log(response)
	res.status(200)
	res.send(response.choices[0].message.content)
})

app.get("/alternatives", async (req, res) => {
	const product = req.body.product
	const response = await openai.chat.completions.create({
		model: "gpt-3.5-turbo",
		messages: [
			{
				role: "user",
				content: `What are environmental friendly alternatives of ${product}, list in sequence and keep it brief`,
			},
		],
		temperature: 0.8,
		max_tokens: 256,
	})
	console.log(response.choices[0].message)
	console.log(response)
	res.status(200)
	res.send(response.choices[0].message.content)
})

app.listen(process.env.PORT, () => {
	console.log("Server started at " + process.env.PORT)
})
