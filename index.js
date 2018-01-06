const speakeasy = require('speakeasy')
const fs = require('fs')
const execSync = require('child_process').execSync

const setting = JSON.parse(fs.readFileSync('./setting.json'))
const clientName = "Application('com.cisco.Cisco-AnyConnect-Secure-Mobility-Client')"
const systemEvents = "Application('System Events')"

const token = speakeasy.time({
    secret: setting.secretKey, 
    encoding: 'base32', 
})

const template = fs.readFileSync('./template.js', { encoding: 'utf8' })
const script = template.replace(/VPN_NAME/g, setting.vpnName)
                        .replace(/USERNAME/g, setting.username)
                        .replace(/PASSWORD/g, setting.password)
                        .replace(/AUTHENTICATION_METHOD/g, setting.authenticationMethod)
                        .replace(/ACCESS_TOKEN/g, token)

console.log(execSync(`osascript -l JavaScript -e '${script}'`, { encoding: 'utf8' }))
