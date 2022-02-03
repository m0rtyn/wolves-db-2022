const express = require('express')
const app = express()
const dotenv = require('dotenv')
const { Counter } = require('./db/models')
dotenv.config()

const PORT = process.env.PORT ?? 3000

app.get('/', async (req, res) => {
  const [counter] = await Counter.findOrCreate({
      where: {},
      defaults: {
        counts: 0
      }
    })

  counter.counts += 1
  await counter.save()

  res.send(`OUR COUNTER, MATE: ${counter.counts}`)
})

app.listen(PORT, () => {
  console.log('BANG')
})