const speakeasy = require('speakeasy')
const fs = require('fs')
const execSync = require('child_process').execSync

const setting = JSON.parse(fs.readFileSync('./setting.json'))

const callAppleScript = command => execSync(`osascript -l JavaScript -e "${command}"`)
const sleepAWhile = (seconds) => execSync(`sleep ${seconds || Math.random() * 2}`)

// keycode 36 is ⏎
const pressEnterKey = () => callAppleScript(`${systemEvents}.keyCode(36)`)

const clientName = "Application('com.cisco.Cisco-AnyConnect-Secure-Mobility-Client')"
const systemEvents = "Application('System Events')"

callAppleScript(`${clientName}.activate()`)
sleepAWhile()

callAppleScript(`${systemEvents}.keystroke('${setting.vpnName}')`)
pressEnterKey()
sleepAWhile(2)

callAppleScript(`${systemEvents}.keystroke('${setting.password}')`)
sleepAWhile()
pressEnterKey()
sleepAWhile(2)

callAppleScript(`${systemEvents}.keystroke('${setting.authenticationMethod}')`)
sleepAWhile()
pressEnterKey()
sleepAWhile(2)

const token = speakeasy.time({
    secret: setting.secretKey, 
    encoding: 'base32', 
})
callAppleScript(`${systemEvents}.keystroke('${token}')`)
pressEnterKey()
