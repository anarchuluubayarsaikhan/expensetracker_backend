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
  const result = await sql `select allsrecord.id, allsrecord.alltransactiontypes, allsrecord.amount, allsrecord.date, allsrecord.time, allsrecord.payee, allsrecord.note, allcategories.name, allcategories.icon, allcategories.color, allcategories.id  from allcategories left join  allsrecord on allsrecord.categoryid = allcategories.id `
  res.json (result)
  console.log (result)
})

 app.post('/recordings', async (req, res) => {
  const id = uuidv4()
  const {alltype, amount, category, date, time, payee, note} =req.body
  const result =  await sql`insert into allsrecord (id, categoryid, alltransactiontypes, amount, date, time, payee, note) values (${id}, ${category},${alltype}, ${amount}, ${date}, ${time}, ${payee},${note})`
  res.sendStatus(204)
})

// app.get ('/dashboard', async (req, res)=> {
//   const {nowHour} = req.query
  
//   const result = await sql `select * from allsrecord ORDER BY date DESC, time DESC `
//   res.json (result)
// })

app.get ('/income', async (req, res)=> {
  const result = await sql `select SUM (amount) from allsrecord GROUP BY typesall`
  res.json (result)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

