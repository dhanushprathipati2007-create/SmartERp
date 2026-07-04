const bcrypt = require("bcryptjs");
// generateHash.js
//const bcrypt = require("bcryptjs");

bcrypt.hash("admin123", 10)
  .then(hash => console.log(hash));
/*async function run() {
  const hash = await bcrypt.hash("admin123", 10);
  console.log(hash);
}

run();*/