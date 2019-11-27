const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');


// GET
router.get('/', (req, res) => {
    pool.query(`SELECT * FROM "koalas" ORDER BY "id" ASC;`)
    .then((response) => {
        res.send(response.rows);
    })
    .catch((err) => {
        res.sendStatus(500);
    });
});


// POST
router.post('/', (req, res) => {
    const newKoala = req.body;
    console.log(newKoala);
    const queryString = `INSERT INTO "koalas" ("name", "gender", "age", "ready_to_transfer", "notes") VALUES
    ('${newKoala.name}', '${newKoala.gender}', '${newKoala.age}', '${newKoala.ready_to_transfer}', '${newKoala.notes}');`;

    pool.query(queryString)
    .then((response) => {
        res.sendStatus(201);
    })
    .catch((err) => {
        res.sendStatus(500);
    })
});


// PUT
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const transfer = req.body.transfer;

    let queryString = `UPDATE "koalas" SET "ready_to_transfer"='${transfer}' WHERE "id" = $1;`;
    console.log(queryString);
    pool.query(queryString, [id])
        .then ((response) => {
            res.sendStatus(201);
        })
        .catch((err) => {
           console.log(err);
            res.sendStatus(500);
        })
});



// DELETE

module.exports = router;