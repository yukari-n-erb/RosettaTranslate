import React, { useState } from "react";
import {Button, TextField} from "@material-ui/core"

export const Translate = () => {
  const [originText, setOriginText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [googleTranslatedText, setGoogleTranslatedText] = useState("");


  const onInputChange = (e) => {
    setOriginText(e.currentTarget.value);
  }

  const submit = () => {
    setTranslatedText("loading...");
    setGoogleTranslatedText("loading...");
    console.log("submit");
    const data = {
        text: originText
    }
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch('/deepl', requestOptions)
    .then((res) => res.json())
    .then((data) => {
      console.log({data})
      setTranslatedText(data.message)
    });
    fetch('/google', requestOptions)
    .then((res) => res.json())
    .then((data) => {
      console.log({data})
      setGoogleTranslatedText(data.message)
    });
}

  return (
    <div className="Rosseta">
      <h1 className="Rosseta__title">Rosseta Translator</h1>
      <div>
        <Button variant="contained" onClick={submit}>Translate</Button>
      </div>
      <div>
        <TextField value={originText} placeholder="Enter Text" onChange={onInputChange} />
        <TextField value={translatedText} placeholder="DeepL Result"/>
        <TextField value={googleTranslatedText} placeholder="Google Result"/>
      </div>
    </div>
  );
};

export default Translate;