#!/usr/bin/env node

const pm2Url = process.argv[2];
const appName = process.argv[3];

const state = {
  OK: 0,
  WARNING: 1,
  CRITICAL: 2,
  UNKNOWN: 3
};

function checkParams() {
  if (!pm2Url || !appName) {
    console.log("./checkPm2.js <pm2 url> <appName>");
    process.exit(state.UNKNOWN);
  }
}

function checkPm2(url) {
  return new Promise((resolve, reject) => {
    const isHttps = url.startsWith("https")
      ? require("https")
      : require("http");

    const request = isHttps.get(url, response => {
      if (response.statusCode < 200 || response.statusCode > 299) {
        reject(
          new Error("Failed to load page, status code: " + response.statusCode)
        );
      }
      const body = [];
      response.on("data", chunk => body.push(chunk));
      response.on("end", () => resolve(body.join("")));
    });
    request.on("error", err => reject(err));
  });
}

function parseJsonAndReturnState(json, appName) {
  let status;
  const appExist = json.filter(app => app.name == appName);

  if (appExist.length) {
    status = json[0].pm2_env.status;
  } else {
    process.stdout.write(`PM2 app:${appName} is UNKNOWN\n`);
    process.exit(state.UNKNOWN);
  }

  switch (status) {
    case "online":
      process.stdout.write(`PM2 app:${appName} is OK\n`);
      process.exit(state.OK);
      break;
    case "stopped":
      process.stdout.write(`PM2 app:${appName} is WARNING\n`);
      process.exit(state.WARNING);
      break;
    case "errored":
      process.stdout.write(`PM2 app:${appName} is CRITICAL\n`);
      process.exit(state.CRITICAL);
      break;
    default:
      process.stdout.write(`PM2 app:${appName} is UNKNOWN\n`);
      process.exit(state.UNKNOWN);
  }
}

checkParams();
checkPm2(pm2Url).then(response =>
  parseJsonAndReturnState(JSON.parse(response).processes, appName)
);
