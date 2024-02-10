// color design tokens export
export const colorTokens = {
    grey: {
      0: "#FFFFFF",
      10: "#c4a3a3",
      50: "#baa4a4",
      100: "#877878",
      200: "#695d5d",
      300: "#755f5f",
      400: "#614e4e",
      500: "#5c4d4d",
      600: "#4d3c3c",
      700: "#473636",
      800: "#3d2b2b",
      900: "#2e1d1d",
      1000: "#000000",
    },
    primary: {
      50: "#e6fffa",
      100: "#9be0ca",
      200: "#77c7ae",
      300: "#5bab91",
      400: "#428f76",
      500: "#2d8065",
      600: "#1d6e54",
      700: "#12634a",
      800: "#084d37",
      900: "#03422e",
    },
  };
  
  // mui theme settings
  export const themeSettings = (mode) => {
    return {
      palette: {
        mode: mode,
        ...(mode === "dark"
          ? {
              // palette values for dark mode
              primary: {
                dark: colorTokens.primary[200],
                main: colorTokens.primary[500],
                light: colorTokens.primary[800],
              },
              neutral: {
                dark: colorTokens.grey[100],
                main: colorTokens.grey[200],
                mediumMain: colorTokens.grey[300],
                medium: colorTokens.grey[400],
                light: colorTokens.grey[700],
              },
              background: {
                default: colorTokens.grey[900],
                alt: colorTokens.grey[800],
              },
            }
          : {
              // palette values for light mode
              primary: {
                dark: colorTokens.primary[700],
                main: colorTokens.primary[500],
                light: colorTokens.primary[50],
              },
              neutral: {
                dark: colorTokens.grey[700],
                main: colorTokens.grey[500],
                mediumMain: colorTokens.grey[400],
                medium: colorTokens.grey[300],
                light: colorTokens.grey[50],
              },
              background: {
                default: colorTokens.grey[10],
                alt: colorTokens.grey[0],
              },
            }),
      },
      typography: {
        fontFamily: ["Rubik", "Raleway" ,"sans-serif"].join(","),
        fontSize: 12,
        h1: {
          fontFamily: ["Rubik", "Raleway" ,"sans-serif"].join(","),
          fontSize: 40,
        },
        h2: {
          fontFamily: ["Rubik", "Raleway" ,"sans-serif"].join(","),
          fontSize: 32,
        },
        h3: {
          fontFamily: ["Rubik", "Raleway" ,"sans-serif"].join(","),
          fontSize: 24,
        },
        h4: {
          fontFamily: ["Rubik", "Raleway" ,"sans-serif"].join(","),
          fontSize: 20,
        },
        h5: {
          fontFamily: ["Rubik", "sans-serif"].join(","),
          fontSize: 16,
        },
        h6: {
          fontFamily: ["Rubik", "sans-serif"].join(","),
          fontSize: 14,
        },
      },
    };
  };