const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**
 * Get all of the items on the shelf
 */
router.get("/", (req, res) => {
  const sqlText = `SELECT * FROM "item";`;
  pool
    .query(sqlText)
    .then((result) => {
      res.send(result.rows);
      // console.log(result.rows);
    })
    .catch((err) => {
      console.log("error getting all:", err);
      res.sendStatus(500);
    });
});

/**
 * Add an item for the logged in user to the shelf
 */
router.post("/", rejectUnauthenticated, (req, res) => {
  const sqlText = `INSERT INTO "item" ("description", "image_url", "user_id")
  VALUES ($1, $2, $3)`;
  //remember to use 'req.user.id' instead of req.body.user_id
  const sqlParams = [req.body.description, req.body.image_url, req.user.id];

  pool
    .query(sqlText, sqlParams)
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

/**
 * Delete an item if it's something the logged in user added
 */
router.delete("/:id", rejectUnauthenticated, (req, res) => {
  // console.log(`Req.body is:`, req.body);
  // console.log(`is authenticated:`, req.isAuthenticated());
  // console.log(`User is:`, req.user);
  // console.log(`req.params.id?`, req.params.id);
  // console.log(`/:id = `, req.params.id);

  let sqlQuery = 'DELETE FROM "item" WHERE (id=$1 AND user_id=$2)';
  let sqlParams = [req.params.id, req.user.id];

  pool
    .query(sqlQuery, sqlParams)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(`Error with DELETE item`, error);
      res.sendStatus(500);
    });
});

/**
 * Update an item if it's something the logged in user added
 */
router.put("/:id", (req, res) => {
  // endpoint functionality
});

/**
 * Return all users along with the total number of items
 * they have added to the shelf
 */
router.get("/count", (req, res) => {
  // endpoint functionality
});

/**
 * Return a specific item by id
 */
router.get("/:id", (req, res) => {
  // endpoint functionality
});

module.exports = router;
