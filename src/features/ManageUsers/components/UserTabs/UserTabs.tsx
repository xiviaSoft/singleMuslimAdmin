import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Box } from '@mui/material';
import { COLORS } from 'constant/color';

const UserTabs = () => {
    const [value, setValue] = React.useState('Active Users');

    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{
                width: '100%',
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
                <Tab value="Active Users" label="Active Users" />
                <Tab value="Suspended Users" label="Suspended Users" />
                <Tab value="UnSuspended Users" label="UnSuspended Users" />
            </Tabs>
        </Box>
    );
};

export default UserTabs;
