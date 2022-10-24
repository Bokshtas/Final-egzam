const express = require('express');
const mysql = require('mysql2/promise');
const { dbConfig } = require("../../config");
const Joi = require("joi");
const { author } = require("../../middlewares/author");
const router = express.Router();


router.get("/:id", author, async (req, res) => {
    let id = req.params.id


    try {

        const con = await mysql.createConnection(dbConfig);
        const [resp] = await con.query(`SELECT * FROM participants WHERE organiser_id = ${id}`)
        con.end();
        res.send(resp);
    } catch (error) {
        res.status(500).send({ error: error })
    }
});

const participantSchema = Joi.object({
    name: Joi.string().required(),
    surname: Joi.string().required(),
    organiser_id: Joi.number().required(),
    email: Joi.string().required(),
    birthday: Joi.string().required(),
    
});

router.post("/register" , async (req, res) => {
    let participant = req.body




    try {
        participant = await participantSchema.validateAsync(participant);
    } catch (err) {
        res.status(400).send(err.details[0].message);
        return;
    }

    try {
        const con = await mysql.createConnection(dbConfig);
        const [resp] = await con.query("INSERT INTO participants SET ?", [participant]);
        con.end();
        res.send(resp)
    } catch (error) {
        res.status(500).send({ error: error });
    };
});

router.patch("/change/:id", async (req, res) => {
    const id = req.params.id;


    let part = req.body;
    try {
        const con = await mysql.createConnection(dbConfig);
        const [resp] = await con.query("UPDATE participants SET name = ?, surname = ?, email = ?, birthday = ? WHERE id = ?", [part.name, part.surname, part.email, part.birthday, id]);
        con.end();
        res.send(resp)
    }catch(error) {
        res.status(500).send(error);
    }
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const con = await mysql.createConnection(dbConfig);
        const [resp] = await con.query("DELETE FROM participants WHERE id = ?", [id]);
        con.end();
        res.send(resp)
    }catch(error) {
        res.status(500).send(error);
    }
});


module.exports = router;