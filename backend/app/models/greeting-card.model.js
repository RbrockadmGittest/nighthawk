module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            cardName: String,
            recipientName: String,
            recepientEmail: String,
            senderName: String,
            greetingMessage: String
        },
        { timestamps: true }
    );
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const GreetingCard = mongoose.model("greetingcard", schema);
    return GreetingCard;
};