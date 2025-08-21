import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Box } from '@mui/material';
import { COLORS } from 'constant/color';
import PhoneNumberTab from '../PhoneNumberTab/PhoneNumberTab';
import AccountInfoTab from '../AccountInfoTab/AccountInfoTab';
import EmailTab from '../EmailTab/EmailTab';
import PasswordTab from '../PasswordTab/PasswordTab';

const SettingsTabs = () => {
    const [value, setValue] = React.useState('AccountInformation');

    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <>
            <Box
                sx={{
                    width: '100%',
                    overflowX: 'auto',
                    display: 'flex',
                    justifyContent: 'center',
                    py: 1,
                }}
            >
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    allowScrollButtonsMobile
                    TabIndicatorProps={{ style: { display: 'none' } }}
                    sx={{
                        bgcolor: COLORS.primary.thin,
                        borderRadius: '12px',
                        my: '40px',
                        p: '3px',
                        '& .MuiTab-root': {
                            textTransform: 'none',
                            color: COLORS.black.darkGray,
                            fontSize: '14px',
                            px: 3,
                            py: 1,
                            width: '250px',
                            transition: '0.3s',
                            whiteSpace: 'nowrap', // Required for scrollable
                        },
                        '& .Mui-selected': {
                            borderRadius: '12px',
                            bgcolor: COLORS.white.main,
                            color: '#000',
                        },
                    }}
                >
                    <Tab value="AccountInformation" label="Account Information" />
                    <Tab value="Email" label="Email" />
                    <Tab value="Password" label="Password" />
                    <Tab value="PhoneNumber" label="Phone Number" />
                </Tabs>
            </Box>
            {value === "AccountInformation" && <AccountInfoTab />}
            {value === "Email" && <EmailTab />}
            {value === "Password" && <PasswordTab />}
            {value === "PhoneNumber" && <PhoneNumberTab />}
        </>
    );
};


export default SettingsTabs
