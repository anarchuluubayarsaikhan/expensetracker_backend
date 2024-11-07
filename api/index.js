const express = require('express')
const cors = require('cors')

const app = express()
const { sql } = require('../config/database')
const { v4: uuidv4 } = require('uuid')
const port = 4000

app.use(cors())
app.use(express.json())


app.get('expense-backend-umber.vercel.app/categories', async (req, res) => {
  const result = await sql`select * from allcategories`
  res.json(result)
})

app.get('expense-backend-umber.vercel.app/categories', async (req, res) => {
  const result = await sql`select * from allcategories`
  res.json(result)
})

app.post('expense-backend-umber.vercel.app/categories', async (req, res) => {
  const id = uuidv4()
  const { name, color, icon } = req.body
  const result = await sql`insert into allcategories (id, name, color, icon) values (${id}, ${name},${color}, ${icon})`
  res.sendStatus(204)
})

app.get('expense-backend-umber.vercel.app/recordings', async (req, res) => {
  const result = await sql`select allsrecord.id, allsrecord.alltransactiontypes, allsrecord.amount, allsrecord.date, allsrecord.time, allsrecord.payee, allsrecord.note, allcategories.name, allcategories.icon, allcategories.color  from  allsrecord left join  allcategories  on allsrecord.categoryid = allcategories.id `
  res.json(result)

})

app.get('expense-backend-umber.vercel.app/types', async (req, res) => {
  const { typename, categoryname ,daterange} = req.query
  console.log(req.query)
  let result = sql`select allsrecord.id, allsrecord.alltransactiontypes, allsrecord.amount, allsrecord.date, allsrecord.time, allsrecord.payee, allsrecord.note, allcategories.name, allcategories.icon, allcategories.color  from  allsrecord left join  allcategories  on allsrecord.categoryid = allcategories.id where 1=1 `
  console.log(result)

  if (typename) {
    result = sql`${result} and allsrecord.alltransactiontypes=${typename}`
  }

  if (categoryname) {
    result = sql`${result} and allsrecord.categoryid=${categoryname}`
  }

  if (daterange) {
    result = sql`${result} and allsrecord.date>${daterange}`
    console.log(daterange)
  }
  const list = await result;
  res.json(list)
}

)

app.post('expense-backend-umber.vercel.app/recordings', async (req, res) => {
  const id = uuidv4()
  const { alltype, amount, category, date, time, payee, note } = req.body
  const result = await sql`insert into allsrecord (id, categoryid, alltransactiontypes, amount, date, time, payee, note) values (${id}, ${category},${alltype}, ${amount}, ${date}, ${time}, ${payee},${note})`
  res.sendStatus(204)
})

app.delete('expense-backend-umber.vercel.app/recordings/:id', async (req, res) => {
  const { id } = req.params
  const result = await sql`delete from allsrecord where id = ${id} `
  res.sendStatus(204)
})

app.put('expense-backend-umber.vercel.app/recordings/:id', async (req, res) => {
  const idedited = req.params.id
  const { alltype, category, amount, date, time, payee, note } = req.body
  const result = await sql`update  allsrecord set alltransactiontypes=${alltype},amount=${amount}, date=${date}, time=${time}, payee=${payee}, note=${note}, categoryid=${category} where id = ${idedited} `
  res.sendStatus(204)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

