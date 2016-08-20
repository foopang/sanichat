var Queue = require('firebase-queue'),
    firebase = require('firebase'),
    Filter = require('bad-words');

firebase.initializeApp({
    apiKey: "AIzaSyCrQYWZ1yqx0mKtztAU4Rp63HAmFq5mDzI",
    databaseURL: "https://sanichat-3abb4.firebaseio.com",
});

var queueRef = firebase.database().ref('queue');
var messagesRef = firebase.database().ref('messages');

var filter = new Filter();

var queue = new Queue(queueRef, function(data, progress, resolve, reject) {
  data.message = filter.clean(data.message);
  console.log(data);
  messagesRef.push(data, function(err){
    if (err) {
        reject(err);
    } else {
        resolve(data);
    }
  });
});
