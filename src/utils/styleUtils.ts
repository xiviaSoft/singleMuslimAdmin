import { COLORS } from "constant/color";

export const tabStyle = {
  bgcolor: COLORS.primary.thin,
  borderRadius: "12px",
  "& .MuiTab-root": {
    textTransform: "none",
    color: COLORS.black.darkGray,
    fontSize: "14px",
    px: 3,
    py: 1,
    inlineSize: "250px",
    transition: "0.3s",
    whiteSpace: "nowrap", // Required for scrollable
  },
  "& .Mui-selected": {
    borderRadius: "12px",
    bgcolor: COLORS.primary.light,
    color: "#000",
  },
};
