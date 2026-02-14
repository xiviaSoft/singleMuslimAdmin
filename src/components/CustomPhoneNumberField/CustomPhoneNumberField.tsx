import 'react-phone-number-input/style.css';
import PhoneInput, { type Value } from 'react-phone-number-input';
import { Controller, useFormContext, RegisterOptions } from 'react-hook-form';
import { Box, Typography } from '@mui/material';
import { COLORS } from 'constant/color';
import { CountryCode } from 'libphonenumber-js';

interface CustomPhoneNumberFieldProps {
  name: string;
  label?: string;
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
  label,
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
      {label && (<Typography sx={{ fontSize: '12px', fontWeight: 700, color: COLORS.primary.hardDark, m: '8px' }}>
        {label}
      </Typography>)}
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field }) => (
          <PhoneInput
            {...field}
            defaultCountry={defaultCountry}
            placeholder={placeholder || 'Enter phone number'}
            disabled={disabled}
            readOnly={readOnly}
            className="custom-phone-input"
          />
        )}
      />

      <style>{`
        /* Wrap */
        .custom-phone-input {
          display: flex;
          align-items: center;
          width: 100%;
          background-color: ${COLORS.gray.lighter};
          border-radius: 50px;
          padding: 0 12px;
          height: ${height || '56px'};
        }

        /* Flag dropdown */
        .custom-phone-input .PhoneInputCountry {
          margin-right: 8px;
          display: flex;
          align-items: center;
        }

        /* The actual number input */
        .custom-phone-input input {
          flex: 1;
          border: none;
          outline: none;
          background: transparent;
          font-size: 16px;
        }
      `}</style>
    </Box>
  );
};

export default CustomPhoneNumberField;
