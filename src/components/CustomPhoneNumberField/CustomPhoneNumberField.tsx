import 'react-phone-number-input/style.css';
import PhoneInput, { type Value } from 'react-phone-number-input';
import { Controller, useFormContext, RegisterOptions } from 'react-hook-form';
import { Box, InputAdornment } from '@mui/material';
import { COLORS } from 'constant/color';
import { CountryCode } from 'libphonenumber-js';

interface CustomPhoneNumberFieldProps {
  name: string;
  rules?: RegisterOptions;
  width?: string;
  height?: string;
  placeholder?: string;
  defaultValue?: Value;
  disabled?: boolean;
  readOnly?: boolean;
  defaultCountry?: CountryCode;
}

const CustomPhoneNumberField: React.FC<CustomPhoneNumberFieldProps> = ({
  name,
  rules,
  width,
  height,
  placeholder,
  defaultValue,
  disabled,
  readOnly = false,
  defaultCountry = 'PK',
}) => {
  const { control } = useFormContext();

  return (
    <Box width={{ md: width, sm: width, xs: '100%' }}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field, fieldState }) => (
          <PhoneInput
            {...field}
            defaultCountry={defaultCountry}
            placeholder={placeholder || 'Enter phone number'}
            disabled={disabled}
            readOnly={readOnly}
            numberInputProps={{
              style: {
                width: '100%',
                borderRadius: '50px',
                backgroundColor: COLORS.gray.lighter,
                border: 'none',
                height: height || '56px',
                paddingLeft: '48px', // space for flag+code
                paddingRight: '8px',
                outline: 'none',
                fontSize: '16px',
              },
            }}
            inputComponent={({ value, onChange, ...rest }: any) => (
              <Box sx={{ position: 'relative', width: '100%' }}>
                <InputAdornment
                  position="start"
                  sx={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  {/* This span is the built-in flag selector from react-phone-number-input */}
                  <span
                    className="PhoneInputCountry"
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    {/* react-phone-number-input automatically renders the flag + dial code */}
                  </span>
                </InputAdornment>

                <input
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  {...rest}
                  style={{
                    width: '100%',
                    borderRadius: '50px',
                    backgroundColor: COLORS.gray.lighter,
                    border: 'none',
                    height: height || '56px',
                    paddingLeft: '48px',
                    paddingRight: '8px',
                    outline: 'none',
                    fontSize: '16px',
                  }}
                  readOnly={readOnly}
                />
              </Box>
            )}
          />
        )}
      />
    </Box>
  );
};

export default CustomPhoneNumberField;
