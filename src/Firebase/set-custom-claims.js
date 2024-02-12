var admin = require("firebase-admin");

var serviceAccount = require("./vitafithub-df6eb-firebase-adminsdk-b1r9t-e316a1714f.json");

var uid = process.argv[2];
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://vitafithub-df6eb-default-rtdb.europe-west1.firebasedatabase.app",
});

admin
  .auth()
  .setCustomUserClaims(uid, { admin: true })
  .then(() => {
    console.log("custom claims set for users", uid);
    process.exit();
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
