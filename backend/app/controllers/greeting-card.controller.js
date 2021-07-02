const db = require("../models");
const GreetingCard = db.greetingCard;

// Create and Save a new Greeting card
exports.create = (req, res) => {
    // Validate request
    if (!req.body.cardName) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Greeting card
    const greetingCard = new GreetingCard({
        cardName: req.body.cardName,
        recipientName: req.body.recipientName,
        recipientEmail: req.body.recipientEmail
    });

    // Save card in the database
    greetingCard
        .save(greetingCard)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error occurred while creating the card."
            });
        });
};

// Enumerate all collections
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    GreetingCard.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving greeting cards."
            });
        });
};

// Find a single Greeting card with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    GreetingCard.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found greeting card with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving greeting card with id=" + id });
        });
};

// Update a Greeting card by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    // GreetingCard.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    GreetingCard.findByIdAndUpdate(id, 
        {$push: { "greetings": { senderName: req.body.senderName, greetingMessage: req.body.greetingMessage}}},
        {safe: true, new: true, useFindAndModify: true})
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update card with id=${id}. Greeting card was not found!`
                });
            } else res.send({ message: "Greeting card was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Greeting card with id=" + id
            });
        });
};
