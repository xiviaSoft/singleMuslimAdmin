import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Box } from '@mui/material';
import PersonalInfo from '../PersonalInfo/PersonalInfo';
import AppearanceInfo from '../AppearanceInfo/AppearanceInfo';
import EducationInfo from '../EducationInfo/EducationInfo';
import LanguageInfo from '../LanguageInfo/LanguageInfo';
import { tabStyle } from 'utils';
import UserAccountInfo from '../UserAccountInfo/UserAccountInfo';


const UserDetailTab = () => {
    const [value, setValue] = React.useState('UserAccountInfo');

    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (<>
        <Box
            sx={{
                inlineSize: '100%',
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
                sx={tabStyle}
            >
                <Tab value="UserAccountInfo" label="User Account" />
                <Tab value="PersonalInformation" label="Personal Information" />
                <Tab value="AppearanceInformation" label="Appearance Information" />
                <Tab value="EducationInformation" label="Education Information" />
                <Tab value="LanguageInformation" label="Language" />
            </Tabs>
        </Box>
        {value === "UserAccountInfo" && <UserAccountInfo />}
        {value === "PersonalInformation" && <PersonalInfo />}
        {value === "AppearanceInformation" && <AppearanceInfo />}
        {value === "EducationInformation" && <EducationInfo />}
        {value === "LanguageInformation" && <LanguageInfo />}
    </>
    );
};



export default UserDetailTab
