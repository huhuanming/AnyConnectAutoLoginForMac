const speakeasy = require('speakeasy')
const fs = require('fs')

const setting = JSON.parse(fs.readFileSync('./setting.json'))
const token = speakeasy.time({
    secret: setting.secretKey, 
    encoding: 'base32', 
})
console.log(token)