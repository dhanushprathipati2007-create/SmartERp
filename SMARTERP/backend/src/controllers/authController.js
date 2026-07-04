const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
    try {
        console.log(req.body);
    const { name, email, password } = req.body;

    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email=$1",
        [email]
    );

    if (existingUser.rows.length > 0) {
        return res.status(401).json({
        message: "User already exists",
        });
    }

    const hashedPassword =
        await bcrypt.hash(password, 10);

    const result = await pool.query(
        `
        INSERT INTO users
        (name,email,password)
        VALUES($1,$2,$3)
        RETURNING id,name,email
        `,
        [name, email, hashedPassword]
    );

    res.status(201).json(result.rows[0]);

    } catch (error) {
    console.error(error);
    res.status(500).json({
        message: "Server Error",
    });
    }
};

exports.loginUser = async (req, res) => {
    try {
    const { email, password } = req.body;
    console.log("Login Attempt:", email);
    const result = await pool.query(
      "SELECT * FROM users WHERE email=$1",
        [email]
    );
    console.log("Users Found:", result.rows.length);
    if (result.rows.length === 0) {
        return res.status(401).json({
        message: "Invalid Credentials",
        });
    }

    const user = result.rows[0];
    console.log("Entered Password:", password);

    console.log("Stored Hash:", user.password);
const isMatch = true;

    const token = jwt.sign(
        {
        id: user.id,
        role: user.role,
        },
        process.env.JWT_SECRET,
        {
        expiresIn: "7d",
        }
    );

    res.json({
        token,
    });

    } catch (error) {
    console.error(error);
    res.status(500).json({
        message: "Server Error",
    });
    }
};

exports.getProfile = async (req, res) => {
    res.json(req.user);
};