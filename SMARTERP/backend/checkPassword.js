const bcrypt = require("bcryptjs");

async function check() {

  const enteredPassword = "admin123";

  const storedHash =
    "$2b$10$L9gl0mJznzLsqLeHxaNV5uxurvoorhXOGSYwu1NcVIamMi89ZUoU6";

  const result =
    await bcrypt.compare(
      enteredPassword,
      storedHash
    );

  console.log(result);
}

check();