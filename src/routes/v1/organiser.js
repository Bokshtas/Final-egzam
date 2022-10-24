const express = require('express');
const mysql = require('mysql2/promise');
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const { dbConfig, jwtSecret } = require("../../config");
const bcrypt = require("bcryptjs");
const router = express.Router();
const organiserRegLog = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().required()
})

router.post("/register", async (req, res) => {
    var newOrganiser = req.body




    try {
        newOrganiser = await organiserRegLog.validateAsync(newOrganiser);
    } catch (err) {
        res.status(400).send(err.details[0].message);
        return;
    }

    try {
        const hashPassword = bcrypt.hashSync(newOrganiser.password);
        newOrganiser.password = hashPassword;

        const con = await mysql.createConnection(dbConfig);


        const [resp] = await con.query("INSERT INTO organiser SET ?", [newOrganiser]);
        con.end();
        res.send(resp)
    } catch (error) {
        res.status(500).send({ error: error });
    };
});

router.post('/login', async (req, res) => {
    var OrganiserLogin = req.body;

    try {
        OrganiserLogin = await organiserRegLog.validateAsync(OrganiserLogin);

    } catch (err) {
        res.status(500).send(err.details[0].message);

        return;
    }

    try {
        const con = await mysql.createConnection(dbConfig);
        
        const [resp] = await con.query("SELECT id, password FROM organiser WHERE name = ?", [OrganiserLogin.name]);


        con.end();
         if(!resp.length) {
            return res.status(400).send({error:"Invalid Name or Password."});
        }

        const pCheck = bcrypt.compareSync(OrganiserLogin.password, resp[0].password);
        if (!pCheck) {
            return res.status(400).send({ error:"Invalid Name or Password."});
        }
       
        const Token = jwt.sign({ organiserID: resp[0].id }, jwtSecret);
        res.send({ Token, organiserID: resp[0].id });
    } catch (error) {
        res.status(500).send({ error: error });
    }
});



module.exports = router;