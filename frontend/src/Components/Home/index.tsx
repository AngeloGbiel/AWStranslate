import * as Hi from "react-icons/hi";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import data from "../data/data.json";
import Icon from "../Assets/icon.svg";
import { Api } from "../Api";

const HomeStyled = styled.div`
  header {
    display: flex;
    align-items: center;
    gap: 1rem;
    border-bottom: 1px solid #9c9c9c;
    padding: 1rem 2rem 1rem 2rem;
    img {
      width: 3rem;
      cursor: pointer;
    }
    h2 {
      background: linear-gradient(
        90deg,
        #eb6060 0%,
        #c8569a 31.25%,
        #302096 69.27%,
        #d32a7b 100%
      );
      cursor: pointer;
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  .switch {
    font-size: 2rem;
    color: #575757;
    position: absolute;
    cursor: pointer;
    left: 50%;
    top: 20%;
    transform: translate(-50%, -50%);
  }
  .fields {
    display: flex;
    gap: 5%;
    margin: 4rem;
    div {
      width: 100%;
      .text{
        .length{
          position: absolute;
          left: 44%;
          top: 53%;
          transform: translate(-50%,-50%);
          color: #797979;
        }
      }
    }
  }
`;

const Home = () => {
  // Os states da minha aplicação
  const [SourceLanguageCode, setSourceLanguageCode] = useState<string>(
    JSON.parse(localStorage.getItem("SourceLanguageCode")!) || "auto"
  );
  const [TargetLanguageCode, setTargetLanguageCode] = useState<string>(
    JSON.parse(localStorage.getItem("TargetLanguageCode")!) ||
      data.idiomas[0].codigo
  );
  const [text, setText] = useState<string>("");
  const [translatedText, setTranslatedText] = useState<string>("");
  const [textLength,setTextLength] = useState<number>();
  const maxChar = 500

  useEffect(()=>{
    setTextLength(text.length)
  }, [text])

  // Função que chama a Api e traduz
  const translate = async () => {
    const translateParams = {
      SourceLanguageCode: SourceLanguageCode,
      TargetLanguageCode: TargetLanguageCode,
      Text: text,
    };
    await Api.post("/translate", translateParams)
      .then((value) => {
        setTranslatedText(value.data);
      })
      .catch((err) => {
        return err;
      });
  };

  // As funções de handle que vai mudar os states
  const handleSearceLanguage = (event: SelectChangeEvent) => {
    setSourceLanguageCode(event.target.value);
    localStorage.setItem(
      "SourceLanguageCode",
      JSON.stringify(event.target.value)
    );
  };
  const handleTargetLanguage = (event: SelectChangeEvent) => {
    setTargetLanguageCode(event.target.value);
    localStorage.setItem(
      "TargetLanguageCode",
      JSON.stringify(event.target.value)
    );
  };

  // Função de troca das lingauegns
  const switchLanguage = () => {
    if (SourceLanguageCode != "auto") {
      const currentLanguage = [SourceLanguageCode, TargetLanguageCode];
      const currentText = [text, translatedText];
      setTranslatedText(currentText[0])
      setText(currentText[1])
      setSourceLanguageCode(currentLanguage[1]);
      setTargetLanguageCode(currentLanguage[0]);
      localStorage.setItem(
        "SourceLanguageCode",
        JSON.stringify(currentLanguage[1])
      );
      localStorage.setItem(
        "TargetLanguageCode",
        JSON.stringify(currentLanguage[0])
      );
    } else return;
  };

  const addText = (e:ChangeEvent<HTMLInputElement>) =>{
    const newText: string = e.target.value;
    if(newText.length > maxChar)
      return
    setText(newText);
  }
  

  // Array contendo dois objetos para compôr o frontend
  const fieldLength = [
    {
      id: 1,
      state: SourceLanguageCode,
      handle: handleSearceLanguage,
      textField: "Digite aqui",
    },
    {
      id: 2,
      state: TargetLanguageCode,
      handle: handleTargetLanguage,
      textField: "Tradução",
    },
  ];

  return (
    <HomeStyled>
      <header>
        <img src={Icon} alt="" />
        <h2>Translate</h2>
      </header>
      <div className="switch" onClick={switchLanguage}>
        <Hi.HiOutlineSwitchHorizontal />
      </div>
      <main className="fields">
        {fieldLength.map((value, i) => {
          return (
            <div key={i}>
              <div>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Translate
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value.state}
                    label="translate"
                    onChange={value.handle}
                  >
                    {value.id == 1 && (
                      <MenuItem value="auto">
                        <em>Detectar idioma</em>
                      </MenuItem>
                    )}
                    {data.idiomas.map((value, i) => {
                      return (
                        <MenuItem key={i} value={value.codigo}>
                          {value.idioma}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
              {value.id == 1 ? (
                <div className="text" style={{ marginTop: "1.5rem" }}>
                  <p className="length">{textLength}/{maxChar}</p>
                  <TextField
                    id="outlined-multiline-static"
                    label={`${value.textField}`}
                    onChange={addText}
                    value={text}
                    multiline
                    rows={5}
                    fullWidth
                  />
                  {/* <button>asd</button> */}
                  <Button
                    variant="contained"
                    fullWidth
                    style={{ marginTop: "1rem" }}
                    onClick={translate}
                  >
                    Traduzir
                  </Button>
                </div>
              ) : (
                <div className="text" style={{ marginTop: "1.5rem" }}>
                  <TextField
                    aria-readonly
                    id="outlined-multiline-static"
                    label={`${value.textField}`}
                    value={translatedText}
                    multiline
                    rows={5}
                    fullWidth
                  />
                </div>
              )}
            </div>
          );
        })}
      </main>
    </HomeStyled>
  );
};

export default Home;
