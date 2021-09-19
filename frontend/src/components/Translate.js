/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';

export const Translate = () => {
  const [originText, setOriginText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [googleTranslatedText, setGoogleTranslatedText] = useState('');

  const onInputChange = (e) => {
    setOriginText(e.currentTarget.value);
  };

  const submit = () => {
    setTranslatedText('loading...');
    setGoogleTranslatedText('loading...');
    const data = {
      text: originText,
    };
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    fetch('/deepl', requestOptions)
      .then((res) => res.json())
      .then((deeplData) => {
        setTranslatedText(deeplData.message);
      });
    fetch('/google', requestOptions)
      .then((res) => res.json())
      .then((googleData) => {
        setGoogleTranslatedText(googleData.message);
      });
  };

  return (
    <div className="Rosseta">
      <h1 className="Rosseta__title">Rosseta Translator</h1>
      <div>
        <Button variant="contained" onClick={submit}>Translate</Button>
      </div>
      <div>
        <TextField variant="outlined" value={originText} placeholder="Enter Text" onChange={onInputChange} />
        <TextField InputProps={{ readOnly: true }} variant="outlined" value={translatedText} placeholder="DeepL API Result" />
        <TextField InputProps={{ readOnly: true }} variant="outlined" value={googleTranslatedText} placeholder="Google Translation API Result" />
      </div>
    </div>
  );
};

export default Translate;
