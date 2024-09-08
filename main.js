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
  const result = await sql `select allsrecord.id, allsrecord.alltransactiontypes, allsrecord.amount, allsrecord.date, allsrecord.time, allsrecord.payee, allsrecord.note, allcategories.name, allcategories.icon, allcategories.color  from  allsrecord left join  allcategories  on allsrecord.categoryid = allcategories.id `
  res.json (result)

})

app.get ('/types/:typename/:categoryname', async (req, res)=> {
  const typename = req.params.typename
  const categoryname = req.params.categoryname
  let result = sql `select allsrecord.id, allsrecord.alltransactiontypes, allsrecord.amount, allsrecord.date, allsrecord.time, allsrecord.payee, allsrecord.note, allcategories.name, allcategories.icon, allcategories.color  from  allsrecord left join  allcategories  on allsrecord.categoryid = allcategories.id where 1=1 `
  if (typename) {
     result = `${result} and allsrecord.alltransactiontypes=${typename}`
  }
  if (categoryname) {
    result = `${result} and allsrecord.categoryid=${categoryname}`
 }
 const list = await result
 console.log(list)
  res.json (list)
 
})

// app.get ('/types/:typename', async (req, res)=> {
//   const typename = req.params.typename
//   const result = await sql `select allsrecord.id, allsrecord.alltransactiontypes, allsrecord.amount, allsrecord.date, allsrecord.time, allsrecord.payee, allsrecord.note, allcategories.name, allcategories.icon, allcategories.color  from  allsrecord left join  allcategories  on allsrecord.categoryid = allcategories.id where  allsrecord.alltransactiontypes = ${typename} `
//   res.json (result)
// })

 app.post('/recordings', async (req, res) => {
  const id = uuidv4()
  const {alltype, amount, category, date, time, payee, note} =req.body
  const result =  await sql`insert into allsrecord (id, categoryid, alltransactiontypes, amount, date, time, payee, note) values (${id}, ${category},${alltype}, ${amount}, ${date}, ${time}, ${payee},${note})`
  res.sendStatus(204)
})

app.delete('/recordings/:id', async (req, res) => {
  const {id} =req.params
  console.log (req.params)
  const result =  await sql`delete from allsrecord where id = ${id} `
  res.sendStatus(204)
})

app.put ('/recordings/:id', async (req, res) => {
  const idedited =req.params.id
  const {alltype, category, amount,date,time,payee,note} =req.body
  console.log(idedited, alltype,category,amount,date,time,payee,note)
  const result =  await sql`update  allsrecord set alltransactiontypes=${alltype},amount=${amount}, date=${date}, time=${time}, payee=${payee}, note=${note}, categoryid=${category} where id = ${idedited} `
  res.sendStatus(204)
})

// app.get ('/income', async (req, res)=> {
//   const result = await sql `select SUM (amount) from allsrecord GROUP BY typesall`
//   res.json (result)
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

