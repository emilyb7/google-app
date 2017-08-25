# Google app

Making a simple app with Google Apps script (GAPPS), Firebase and a call to a third party API.

## Setting up Firebase

I followed the instructions [here](https://firebase.google.com/docs/functions/get-started), but simplified the example function to omit any database functionality.

```js
exports.displayText = functions.https.onRequest((req, res) =>
  res.send(req.query.text)
);
```

My really simple function `displayText` can be found in `/functions/index.js`.

I've added the auto-generated `.firebaserc` file to a `.gitignore`.

I test this function by first running `firebase deploy`. The URL for my function is printed to the console. In order to see the result, I can append `?text=emily` to the end of the URL.

## Setting up Apps script

I followed these steps for getting up and running with Google Apps script.

- Go to the dashboard for my project in the [Google Developer Console](https://console.cloud.google.com)
- Click on 'Enable APIs and services', search for the Google Drive API and make sure it is enabled
- Go to 'Credentials' (check the lefthand menu of the console) and create new credentials for OAuth2
- Download the newly created credentials in json format (location of file is irrelevant, but I put mine in my root folder and added `secret.json` to my `.gitignore`)
- Return to the [NPM docs](https://www.npmjs.com/package/node-google-apps-script) and follow the points in step 2
- Create a new [standalone script](https://developers.google.com/apps-script/guides/standalone)
- Move onto step 3 in the NPM docs ("initialize your project")
- After running `gapps init` check that a `/src` directory has been created in your project's root. This is where you can write your google-apps-side code.

I've added the auto-generated `gapps.config.json` file to my `.gitignore` because I like to keep code separate from config but this is a preference rather than a security issue.

### Watch files

It's annoying to have to run `gapps upload` after every small change. So I've installed `npm-watch` and added the following config to my `package.json`:

```json
"watch": {
  "update": {
    "patterns": "src"
  }
}
```

As well as two new scripts like this:
```json
"scripts": {
  "update": "gapps upload",
  "watch": "npm-watch update"
}
```

## Things to do:

- [ ] Firebase app setup
- [ ] GAPPS project setup
- [ ] Create script that makes request to Firebase
- [ ] Figure out how to authenticate requests to Firebase
- [ ] Make the app do something
