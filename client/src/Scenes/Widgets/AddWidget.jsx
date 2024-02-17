import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AddWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create ADV</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advertisement"
        src={`${process.env.REACT_APP_BACKEND_URL}/assets/Add.png`}
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>Spider-Man</Typography>
        <Typography color={medium}>spiderman.co</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Marvels Spider-Man
      </Typography>
    </WidgetWrapper>
  );
};

export default AddWidget;
