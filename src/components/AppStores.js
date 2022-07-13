import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import LightAppStore from "../assets/svg/app-store-light.svg";
import DarkAppStore from "../assets/svg/app-store-dark.svg";
import GooglePlayStore from "../assets/images/google-play-badge.png";

const AppStores = (props) => {
  const theme = useTheme();

  const isDarkMode = theme.palette.mode === "dark";
  return (
    <Box {...props}>
      <Typography variant="h5">App Stores</Typography>
      <p>
        Wir werden bald in folgenden Stores Foodle hochladen und bereistellen.
      </p>
      <Box>
        <img
          src={isDarkMode ? LightAppStore : DarkAppStore}
          width="auto"
          height="75px"
          alt="App Store Badge"
          style={{ display: "inline-block" }}
        />

        <img
          src={GooglePlayStore}
          width="auto"
          height="75px"
          alt="Play Store Badge"
          style={{ display: "inline-block" }}
        />
      </Box>
    </Box>
  );
};

export default AppStores;
