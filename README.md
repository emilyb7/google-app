# Google app

Making a simple app with Google Apps script (GAPPS), Firebase and a call to a third party API.

This project demonstrates one way to set up a project with the above setup. I'll be using it as a boilerplate for future projects.

## Setting up Firebase

To get stated, I followed the instructions [here](https://firebase.google.com/docs/functions/get-started), but simplified the example function to omit any database functionality.

```js
exports.displayText = functions.https.onRequest((req, res) =>
  res.send(req.query.text)
);
```

My really simple function `displayText` can be found in `/functions/index.js`.

I've added the auto-generated `.firebaserc` file to a `.gitignore`.

I test this function by first running `firebase deploy`. The URL for my function is printed to the console. In order to see the result, I can append `?text=emilyb7` to the end of the URL.

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

## Spreadsheet

I've set up a spreadsheet with 2 columns. I've entered just 2 column name: 'post code' and 'constituency'. My plan is to manually populate the post code column with UK post codes. My app will automatically return the political constituency using the [postcodes.io](http://postcodes.io/) API.

![spreadsheet_image](/images/spreadsheet.png)

## Apps script

I've created a new folder in my root directory, `/scripts`.

- `scripts/index.js` contains the main body of the script that I wish to execute
- `scripts/config.js` contains a few variable declarations that are very much just config and specific to my app.

For reference, my `config.js` file currently looks like this:

```js
var SHEET_ID = <GOOGLE_SPREADSHEET_ID>;
var SHEET_NAME = <NAME_OF_SHEET>;
var URL = <URL_OF_MY_FIREBASE_FUNCTION>
```

To start with, I'm making a very simple `GET` request to the `displayText` function that currently lives in Firebase.

```js
function myFunction() {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var s1 = ss.getSheetByName(SHEET_NAME);
  var rows = ss.getLastRow();
  var data = s1.getRange(2, 1, rows - 1, 2).getValues();
  var code = data[0][0].toLowerCase().replace(" ", "");
  var getUrl = URL + "?text=" + code;
  var response = UrlFetchApp.fetch(getUrl, {
    method: "get"
  });
  Logger.log(response);
}
```

This will log the first entry in the post codes column to the Google Apps Script console (in the scripts UI). Via Firebase. A ridiculously complicated way of doing something very simple.

Let's do something better.

### Updating the live script

Now my scripts are in `/scripts` but the `gapps upload` command looks for files in `/src`.

I've added a utility function `scripts.js` which concatenates both `config.js` and `index.js` and outputs them to `/src/Code.js`. And I've also amended my `watch` script so that NPM is watching the files in my `scripts` folder. `src/Code.js` is no longer in source control, as we don't need it.

So my NPM scripts now look like this:

```json
"update": "node lib/scripts && gapps upload",
"watch": "npm-watch update"
```

### Functions and tests

I've added a new postcode function and deployed it to firebase.

I've also written some tests for my functions and endpoints using the `tape` module. Tests are in `/tests`.

Things to note: any NPM modules that need to be used by firebase need to be added as dependencies in `functions/package.json`.


### Testing the app

I've updated my script now so that it calls the `/postcode` function and outputs the results to my spreadsheet.

I can test it by running the script from the Google Scripts UI and checking the results in the spreadsheet.

## Things to do:

- [x] Firebase app setup
- [x] GAPPS project setup
- [x] Create script that makes request to Firebase
- [ ] Figure out how to authenticate requests to Firebase
- [x] Make the app do something
