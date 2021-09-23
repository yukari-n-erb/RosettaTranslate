/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import {
  Typography, Button, Grid, Box, TextField,
} from '@material-ui/core';

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
    <div>
      <Typography variant="h3" component="div">
        Rosetta Translator
      </Typography>
      <Box pt={1} pb={2}>
        <Button variant="contained" size="medium" onClick={submit}>Translate</Button>
      </Box>
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
      >
        <Box
          sx={{
            width: 450,
            maxWidth: '100%',
          }}
        >
          <TextField fullWidth autoFocus variant="outlined" value={originText} label="Enter Original Text" multiline rows={18} onChange={onInputChange} />
        </Box>
        <Box
          sx={{
            width: 450,
            maxWidth: '100%',
          }}
        >
          <TextField fullWidth InputProps={{ readOnly: true }} variant="filled" multiline rows={18} value={translatedText} label="DeepL API Result" />
        </Box>
        <Box
          sx={{
            width: 450,
            maxWidth: '100%',
          }}
        >
          <TextField fullWidth InputProps={{ readOnly: true }} variant="filled" multiline rows={18} value={googleTranslatedText} label="Google Translation API Result" />
        </Box>
      </Grid>
    </div>
  );
};

export default Translate;
