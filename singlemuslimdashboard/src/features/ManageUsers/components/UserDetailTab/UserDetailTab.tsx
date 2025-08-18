import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Box } from '@mui/material';
import { COLORS } from 'constant/color';
import PersonalInfo from '../PersonalInfo/PersonalInfo';
import AppearanceInfo from '../AppearanceInfo/AppearanceInfo';
import EducationInfo from '../EducationInfo/EducationInfo';
import LanguageInfo from '../LanguageInfo/LanguageInfo';

const UserDetailTab = () => {
    const [value, setValue] = React.useState('PersonalInformation');

    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (<>
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
                        bgcolor: COLORS.primary.light,
                        color: '#000',
                    },
                }}
            >
                <Tab value="PersonalInformation" label="Personal Information" />
                <Tab value="AppearanceInformation" label="Appearance Information" />
                <Tab value="EducationInformation" label="Education Information" />
                <Tab value="LanguageInformation" label="Language" />
            </Tabs>
        </Box>
        {value === "PersonalInformation" && <PersonalInfo />}
        {value === "AppearanceInformation" && <AppearanceInfo />}
        {value === "EducationInformation" && <EducationInfo />}
        {value === "LanguageInformation" && <LanguageInfo />}
    </>
    );
};



export default UserDetailTab
