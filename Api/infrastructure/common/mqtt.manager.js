const mqtt = require("mqtt");
const error = require("./error.generator");

var client = null;

const clientNotInitializedError = "MQTT Client is not initialized.";
const clientNotConnectedError = "MQTT Client is not connected.";

const onClientConnect = () => console.log("MQTT Client connected successfully.");
const onClientError = (err) => console.log("Error while MQTT connecting: " + err);
const onClientMessage = (topic, payload) => console.log(`Received message: { topic: ${topic}, Payload: ${payload} }.`);

const connect = (url, options = {}) => {
    client = mqtt.connect(url, options);

    client.on("connect", onClientConnect);
    client.on("error", onClientError);
    client.on("message", onClientMessage);
};

const subscribe = (topic) => {
    if (!client) {
        throw error.internalServer(clientNotInitializedError);
    }

    if (!client.connected) {
        throw error.internalServer(clientNotConnectedError);
    }

    client.subscribe(topic);
    console.log(`MQTT Client has subscribe on topic "${topic}".`);
};

const publish = (topic, payload, options = {}) => {
    if (!client) {
        throw error.internalServer(clientNotInitializedError);
    }

    if (!client.connected) {
        throw error.internalServer(clientNotConnectedError);
    }

    client.publish(topic, payload, options);
    console.log(`MQTT Client has published message on topic "${topic}".`);
};

module.exports.connect = connect;
module.exports.subscribe = subscribe;
module.exports.publish = publish;