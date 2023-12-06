"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_translate_1 = require("@aws-sdk/client-translate");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const accessKey = `${process.env.ACCESS_KEY}`;
const secretKey = `${process.env.SECRET_KEY}`;
const client = new client_translate_1.TranslateClient({
    region: "us-east-1",
    credentials: {
        accessKeyId: `${accessKey}`,
        secretAccessKey: `${secretKey}`,
    },
});
exports.default = client;
