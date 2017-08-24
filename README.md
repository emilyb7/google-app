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

## Things to do:

- [ ] Firebase app setup
- [ ] GAPPS project setup
- [ ] Create script that makes request to Firebase
- [ ] Figure out how to authenticate requests to Firebase
- [ ] Make the app do something
