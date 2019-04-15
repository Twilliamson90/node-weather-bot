const weather = require("./weather")
require('dotenv').config()

const event = null
const context = null

weather.handler(event, context, (err, result) => {
  if(err) {
    console.log('error')
    console.log(err)
  }
  console.log(result)
})