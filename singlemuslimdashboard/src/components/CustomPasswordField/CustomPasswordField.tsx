import React, { useState, useCallback } from "react";
import { Controller, useFormContext, RegisterOptions } from "react-hook-form";
import {
    Box,
    TextField,
    InputAdornment,
    Typography,
    IconButton
} from "@mui/material";
import { COLORS } from "constant/color";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface CustomPasswordFieldProps {
    name: string;
    label?: string;
    width?: string;
    height?: string;
    readOnly?: boolean;
    maxLength?: number;
    disabled?: boolean;
    placeholder: string;
    description?: string;
    defaultValue?: string;
    rules?: RegisterOptions;
    showHelperText?: boolean;
    onBlur?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => void;
    onFocus?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => void;
}

const CustomPasswordField: React.FC<CustomPasswordFieldProps> = ({
    name,
    rules,
    width,
    label,
    height,
    onBlur,
    onFocus,
    disabled,
    maxLength,
    placeholder,
    defaultValue,
    readOnly = false,
    showHelperText = true,
    ...props
}) => {
    const { control } = useFormContext();
    const [showPassword, setShowPassword] = useState(false);

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (maxLength && e.target.value.length > maxLength) {
                e.target.value = e.target.value.slice(0, maxLength);
            }
        },
        [maxLength]
    );

    return (
        <Box width={{ md: width, sm: width, xs: "100%" }}>
            {label && (
                <Typography sx={{ fontSize: "12px", fontWeight: 700, color: COLORS.primary.hardDark }}>
                    {label}
                </Typography>
            )}
            <Controller
                name={name}
                defaultValue={defaultValue}
                control={control}
                rules={rules}
                render={({ field, fieldState }) => (
                    <TextField
                        variant="outlined"
                        disabled={disabled}
                        {...field}
                        placeholder={placeholder || ""}
                        {...props}
                        fullWidth
                        error={!!fieldState.error}
                        type={showPassword ? "text" : "password"}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                            sx: {
                                width: width || "285px",
                                borderRadius: "50px",
                                backgroundColor: COLORS.gray.lighter,
                                border: "none",
                                height: height || "56px",
                                paddingRight: "8px",
                                "& fieldset": { border: "none" },
                            },
                        }}
                        inputProps={{
                            maxLength,
                            onInput: handleInputChange,
                            readOnly,
                        }}
                        onBlur={(event) => {
                            field.onBlur();
                            onBlur?.(event);
                        }}
                        onFocus={onFocus}
                    />
                )}
            />
        </Box>
    );
};

export default CustomPasswordField;
