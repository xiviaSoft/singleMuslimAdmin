import React, { useState, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  Box,
  Typography,
  MenuItem,
  Select,
  InputAdornment
} from "@mui/material";
import { COLORS } from "constant/color";
import SearchIcon from "@mui/icons-material/Search";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  name: string;
  label?: string;
  options: Option[];
  dependsOn?: string;
  width?: string;
  height?: string;
  iconColor?: string;
  labelOutside?: boolean;
  showSearchIcon?: boolean;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  name,
  label,
  options,
  dependsOn,
  width,
  height,
  iconColor = COLORS.blue.main,
  labelOutside = false,
  showSearchIcon = false,
  onChange,
  disabled: disabledProp = false,
}) => {
  const { control, watch } = useFormContext();
  const dependencyValue = dependsOn ? watch(dependsOn) : null;
  const [disabled, setDisabled] = useState(disabledProp || !!dependsOn);

  useEffect(() => {
    if (dependsOn && dependencyValue) {
      setDisabled(false);
    }
  }, [dependsOn, dependencyValue]);

  return (
    <Box width={{ md: width, sm: width, xs: "100%" }}>
      {label && (
        <Typography
          sx={{
            fontSize: "12px",
            fontWeight: 700,
            color: COLORS.primary.hardDark,
            mb: 0.5
          }}
        >
          {label}
        </Typography>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            displayEmpty
            onChange={(e) => {
              field.onChange(e.target.value);
              onChange?.(e.target.value);
            }}
            disabled={disabled}
            IconComponent={(props) => (
              <Box
                component="svg"
                {...props}
                viewBox="0 0 24 24"
                width="24px"
                mt={-0.5}
              >
                <path
                  d="M7 10l5 5 5-5"
                  fill="none"
                  stroke={iconColor}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Box>
            )}
            renderValue={(selected) =>
              !selected ? (
                <em>Select any</em>
              ) : (
                options.find((opt) => opt.value === selected)?.label
              )
            }
            sx={{
              width: width || "285px",
              borderRadius: "50px",
              backgroundColor: COLORS.gray.lighter,
              height: height || "56px",
              "& fieldset": { border: "none" },
              px: 1,
            }}
            startAdornment={
              showSearchIcon && (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "gray" }} />
                </InputAdornment>
              )
            }
            MenuProps={{
              PaperProps: {
                sx: {
                  maxHeight: 300,
                  borderRadius: "20px",
                  overflowY: "auto",
                  "&::-webkit-scrollbar": { width: 0 },
                },
              },
            }}
          >
            {options.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
                sx={{
                  py: "10px",
                  borderBottom: `1px solid ${COLORS.gray.lighter}`,
                  "&:last-of-type": { border: "none" },
                  "&:hover": { bgcolor: COLORS.gray.main },
                  "&.Mui-selected": {
                    bgcolor: COLORS.primary.hardDark,
                    color: COLORS.white.main,
                    "&:hover": {
                      bgcolor: COLORS.gray.main,
                      color: COLORS.black.main,
                    },
                  },
                  fontSize: "13px",
                }}
              >
                {option.label}
              </MenuItem>
            ))}

            {options.length === 0 && (
              <MenuItem disabled>
                <Typography variant="body2" color="text.secondary">
                  No options found
                </Typography>
              </MenuItem>
            )}
          </Select>
        )}
      />
    </Box>
  );
};

export default CustomSelect;
