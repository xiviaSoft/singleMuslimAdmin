import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Box } from '@mui/material';

import { tabStyle } from 'utils';

const UserTabs = () => {
    const [value, setValue] = React.useState('Active Users');

    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{
                inlineSize: '100%',
                overflowX: 'auto', // allow horizontal scroll if needed
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
                <Tab value="Active Users" label="Active Users" />
                <Tab value="Suspended Users" label="Suspended Users" />
                <Tab value="UnSuspended Users" label="UnSuspended Users" />
            </Tabs>
        </Box>
    );
};

export default UserTabs;
