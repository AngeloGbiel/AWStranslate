import express, { Request, Response } from "express";
import {
  TranslateClient,
  TranslateTextCommand,
} from "@aws-sdk/client-translate";
import client from "./credentials";
const router = express.Router();


router.post("/translate", async (req: Request, res: Response) => {
  const { Text, SourceLanguageCode, TargetLanguageCode } = req.body;
  if (!Text || !SourceLanguageCode || !TargetLanguageCode)
    return res.status(422).json({ message: "Preencha todos os campos" });

  const translateParams = {
    SourceLanguageCode: SourceLanguageCode,
    TargetLanguageCode: TargetLanguageCode, 
    Text: Text,
  };


  try {
    const data = await client
      .send(new TranslateTextCommand(translateParams))
      .then((value) => {
        console.log(value)
        return res.send(value.TranslatedText)
      })
      .catch((err) => {
        return err;
      });
  } catch (error) {
    return error
  }
});

export default router;
