const express = require('express')
const cors = require('cors')

const app = express()
const {sql} = require ('./config/database')
const { v4: uuidv4 } = require('uuid')
const port = 4000

app.use(cors()) 
app.use(express.json())


app.get ('/categories', async (req, res)=> {
  const result = await sql `select * from allcategories`
  res.json (result)
})

 app.post('/categories', async (req, res) => {
  const id = uuidv4()
  const {name,color, icon} =req.body
  const result =  await sql`insert into allcategories (id, name, color, icon) values (${id}, ${name},${color}, ${icon})`
  res.sendStatus(204)
})

app.get ('/recordings', async (req, res)=> {
  const result = await sql `select * from recordsall`
  res.json (result)
})

 app.post('/recordings', async (req, res) => {
  const id = uuidv4()
  const {alltype, amount, category, date, time, payee, note} =req.body
  const result =  await sql`insert into recordsall (id, typesall, amount, category, date, time, payee, note) values (${id}, ${alltype},${amount}, ${category}, ${date}, ${time}, ${payee},${note})`
  res.sendStatus(204)
})

app.get ('/dashboard', async (req, res)=> {
  const {nowHour} = req.query
  
  const result = await sql `select * from recordsall ORDER BY date DESC, time DESC `
  res.json (result)
})

app.get ('/income', async (req, res)=> {
  const result = await sql `select SUM (amount) from recordsall GROUP BY typesall`
  res.json (result)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

