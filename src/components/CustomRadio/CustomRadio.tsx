import React from "react";
import { Controller, useFormContext, RegisterOptions } from "react-hook-form";
import {
  Box,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
} from "@mui/material";
import { COLORS } from "constant/color";

interface RadioOption {
  label: string;
  value: string;
}

interface CustomRadioProps {
  name: string;
  label?: string;
  options: RadioOption[];
  defaultValue?: string;
  rules?: RegisterOptions;
  row?: boolean; // to render horizontally
}

const CustomRadio: React.FC<CustomRadioProps> = ({
  name,
  label,
  options,
  defaultValue,
  rules,
  row = false,
}) => {
  const { control } = useFormContext();

  return (
    <Box>
      {label && (
        <Typography
          sx={{ fontSize: "12px", fontWeight: 700, color: COLORS.primary.hardDark ,m:'8px'}}
        >
          {label}
        </Typography>
      )}

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue || ""}
        rules={rules}
        render={({ field, fieldState }) => (
          <FormControl error={!!fieldState.error}>
            <RadioGroup
              {...field}
              row={row}
              onChange={(e) => field.onChange(e.target.value)}
              // sx={{display:'flex',bgcolor:'red'}}
            >
              {options.map((option) => (
                <FormControlLabel

                  key={option.value}
                  value={option.value}
                  // sx={{bgcolor:'red',display:'flex'}}
                  control={
                    <Radio
                      sx={{
                        color: COLORS.primary.hardDark, // unchecked
                        "&.Mui-checked": {
                          color: COLORS.primary.main, // checked
                        },
                      }}
                    />
                  }
                  label={option.label}
                />
              ))}
            </RadioGroup>
            {fieldState.error && (
              <Typography sx={{ fontSize: "10px", color: "red" }}>
                {fieldState.error.message}
              </Typography>
            )}
          </FormControl>
        )}
      />
    </Box>
  );
};

export default CustomRadio;
