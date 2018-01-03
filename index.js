const speakeasy = require('speakeasy')
const fs = require('fs')
const execSync = require('child_process').execSync

const setting = JSON.parse(fs.readFileSync('./setting.json'))
const clientName = "Application('com.cisco.Cisco-AnyConnect-Secure-Mobility-Client')"
const systemEvents = "Application('System Events')"

const execScript = command => execSync(`osascript -l JavaScript -e "${command}"`)
const sleep = (seconds) => execSync(`sleep ${seconds || Math.random() * 2}`)
// keycode 36 is ⏎
const pressEnterKey = () => execScript(`${systemEvents}.keyCode(36)`)

const isCiscoExsit = () => 
    execScript(
        `${systemEvents}.processes().filter(process => process.name() === 'Cisco AnyConnect Secure Mobility Client')`
    ).toString('utf8').length > 10

while(isCiscoExsit()) {
  try {
    execScript(`${clientName}.quit()`)
  } catch (error) {
    sleep(4)
  }
}

execScript(`${clientName}.activate()`)
sleep()

execScript(`${systemEvents}.keystroke('${setting.vpnName}')`)
pressEnterKey()
sleep(2)

execScript(`${systemEvents}.keystroke('${setting.password}')`)
pressEnterKey()
sleep(2)

execScript(`${systemEvents}.keystroke('${setting.authenticationMethod}')`)
pressEnterKey()
sleep(2)

const token = speakeasy.time({
    secret: setting.secretKey, 
    encoding: 'base32', 
})
execScript(`${systemEvents}.keystroke('${token}')`)
pressEnterKey()
