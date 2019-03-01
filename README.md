# checkPm2.js (Nagios Plugin to Check PM2 Processes)

## How to Install

**1.** Install **NVM (Node Version Manager):**

`wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash`

---

**2.** Install **Node.js** latest version:

`nvm install node`

**Note:** NVM does NOT share node installation to all users. An easy step is to copy the node binary installed by NVM to  `/usr/bin`

---

**3.** Download **checkPm2.js** to your **Nagios** server and `chmod +x` permission:

**Plugins default directory:** `cd /usr/lib64/nagios/plugins`

`wget https://raw.githubusercontent.com/barrosfilipe/checkPm2.js/master/checkPm2.js && chmod +x checkPm2.js`

---

## How to Use

**Usage:** `./checkPm2.js <pm2 web host> <app name>`

###### Command and Output Example:

```
$ ./checkPm2.js https://pm2.netflix.com:9615 movies-api
OK: PM2 app:movies-api is Online
```

**Note:** You have to enable **pm2 web api service** by running `pm2 web`. Default port is `9615`

---

## PM2 Status to Nagios Status

| PM2 Status             | NAGIOS CODE             |
| ---------------------- | ----------------------- |
| PM2 **Online** Status  | NAGIOS\_**OK**: 0       |
| PM2 **Stopped** Status | NAGIOS\_**WARNING**: 1  |
| PM2 **Errored** Status | NAGIOS\_**CRITICAL**: 2 |
| PM2 **Unknown** Status | NAGIOS\_**UNKNOWN**: 3  |

## Requirements:
> Node.js v6.0.0+

> No NPM needed
