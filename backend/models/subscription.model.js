const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
    email : {
        type : String,
        required: true
    }
})

const SubscriptionModel = mongoose.model("subscribers", subscriptionSchema);
module.exports = SubscriptionModel;