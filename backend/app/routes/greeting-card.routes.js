module.exports = app => {
    const greetingCard = require("../controllers/greeting-card.controller.js");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", greetingCard.create);

    // Retrieve all Tutorials
    router.get("/", greetingCard.findAll);

    // Retrieve a single Tutorial with id
    router.get("/:id", greetingCard.findOne);

    // Update a Tutorial with id
    router.put("/:id", greetingCard.update);

    app.use('/api/greeting-card', router);
};