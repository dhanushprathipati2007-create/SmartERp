const express = require("express");

const router = express.Router();

const authMiddleware =
    require("../middleware/authMiddleware");

const {
    createCompany,
    assignCompany,
    getMyCompanies,
    updateCompany,
    deleteCompany,
    selectCompany,
} = require("../controllers/companyController");

router.post(
    "/",
    authMiddleware,
    createCompany
);
router.post(
    "/assign",
    authMiddleware,
    assignCompany
);

router.get(
    "/my-companies",
    authMiddleware,
    getMyCompanies
);

router.post(
    "/select",
    authMiddleware,
    selectCompany
);

router.put(
    "/:id",
    authMiddleware,
    updateCompany
);

router.delete(
    "/:id",
    authMiddleware,
    deleteCompany
);

router.get("/", async (req, res) => {
    const pool = require("../config/db");

    try {

        const result = await pool.query(
            "SELECT * FROM companies ORDER BY company_name"
        );

        res.json(result.rows);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Server Error"
        });

    }
});
module.exports = router;