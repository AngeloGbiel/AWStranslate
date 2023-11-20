import { TranslateClient } from "@aws-sdk/client-translate";
import { config } from "dotenv";
config();

const accessKey = `${process.env.ACCESS_KEY}`;
const secretKey = `${process.env.SECRET_KEY}`;

const client = new TranslateClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: `${accessKey}`,
    secretAccessKey: `${secretKey}`,
  },
});

export default client