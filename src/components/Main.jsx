import React, { useState } from "react";
import { Box, Typography, TextField, Grid, IconButton } from "@mui/material";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";

import { assets } from "../assets/assets";

const Main = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const generateImage = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.openai.com/v1/images/generations`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_KEY}`,
            "User-Agent": "Chrome",
          },
          body: JSON.stringify({
            prompt: prompt,
            n: 1,
            size: "512x512",
          }),
        }
      );
      const data = await response.json();
      console.log("DATA:::", data);
      //   setImage(data.image);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  const validatePrompt = () => {
    console.log("VALIDE");
    if (prompt.length !== 0) {
      generateImage();
    } else {
      return false;
    }
  };

  return (
    <>
      <Grid
        container
        spacing={4}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100vh" }}
      >
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Typography variant="h4" sx={{ color: "#f5f5f5" }} gutterBottom>
            Welcome to the
            <span
              style={{
                color: "#A91D3A",
                fontSize: "1.5em",
              }}
            >
              {" "}
              DALL-ify
            </span>
          </Typography>
        </Grid>
        <Grid item xs={12} justifyContent={"center"}>
          <img
            src={assets.ArtImage}
            style={{ width: "800px", height: "500px", objectFit: "contain" }}
            alt="Art Image"
          />
        </Grid>
      </Grid>
      <Box
        sx={{
          bottom: 40,
          position: "fixed",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          width: "100%",
        }}
      >
        <TextField
          placeholder="Write your prompt"
          sx={{
            width: "50%",
            backgroundColor: "#1d2e36",

            "& .MuiOutlinedInput-root": {
              color: "#f6f6f6",

              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#f6f6f6",
                borderWidth: "1px",
              },
            },

            "& .MuiInputLabel-outlined": {
              color: "#f6f6f6",
            },
          }}
          value={prompt}
          onChange={handlePromptChange}
        />
        <IconButton sx={{ color: "#f6f6f6" }} onClick={validatePrompt}>
          <ArrowCircleRightOutlinedIcon sx={{ fontSize: "40px" }} />
        </IconButton>
      </Box>
    </>
  );
};

export default Main;
