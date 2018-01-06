const vpnName = "VPN_NAME"
const username = "USERNAME"
const password = "PASSWORD"
const authenticationMethod = "AUTHENTICATION_METHOD"
const token = "ACCESS_TOKEN"

var app = Application("System Events").applicationProcesses.byName("Cisco AnyConnect Secure Mobility Client")

while(!app.exists()) {
	Application("com.cisco.Cisco-AnyConnect-Secure-Mobility-Client").activate()
	delay(0.5)
}

var windows = app.windows
delay(2)
var vpnWindow = windows.byName("Cisco AnyConnect | " + vpnName)

var reTry = [0, 0, 0, 0]
while (!windows.at(1).buttons.byName("Disconnect").exists() && !(reTry[0] > 3 || reTry[1] > 3 || reTry[2] > 3 || reTry[3] > 3)) {
  if (vpnWindow.exists()) {
    if (vpnWindow.staticTexts.byName("UserName:").exists() && vpnWindow.staticTexts.byName("Password:").exists()) {
	  vpnWindow.textFields[0].value = username
	  vpnWindow.textFields[1].value = password
      vpnWindow.buttons.byName("OK").click()
      delay(2)
      reTry[0] += 1
	}
	if (vpnWindow.scrollAreas.at(0).textAreas.at(0).exists()) {
	  if (vpnWindow.scrollAreas.at(0).textAreas.at(0).value().includes("Please select your second authentication method [num]:")) {
	  	  vpnWindow.textFields.at(0).value = authenticationMethod
          vpnWindow.buttons.byName("Continue").click()
          delay(1)
          reTry[1] += 1
	  }
	  
	  if (vpnWindow.scrollAreas.at(0).textAreas.at(0).value().includes("Enter the code for ")) {
	  	 vpnWindow.textFields[0].value = token
		 vpnWindow.buttons.byName("Continue").click()
         reTry[2] += 1
	  }
	}
  } else {
	  windows.at(1).buttons.byName("Connect").click()
    reTry[3] += 1
  }
  delay(1)
}

windows[0].entireContents()