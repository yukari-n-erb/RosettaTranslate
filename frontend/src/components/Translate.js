import React, { useState } from "react";

export const Translate = () => {
  const [originText, setOriginText] = useState("");
  const [translatedText, setTranslatedText] = useState("");


  const onInputChange = (e) => {
    setOriginText(e.currentTarget.value);
  }

  const submit = () => {
    setTranslatedText("loading...");
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
    .then((data) => setTranslatedText(data.message));
}

  return (
    <div className="Rosseta">
      <h1 className="Rosseta__title">Rosseta Translator</h1>
      <div>
        <button type="submit" className="translate__submit" onClick={submit} >Translate</button>
      </div>
      <div>
        <textarea className="originalText__input" type="text" value={originText} placeholder="Enter Text" onChange={onInputChange} />
        <textarea className="translatedText__input" type="text" value={translatedText}/>
      </div>
    </div>
  );
};

export default Translate;