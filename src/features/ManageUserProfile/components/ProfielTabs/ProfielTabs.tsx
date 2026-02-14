import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Box, Divider, Stack, Typography } from '@mui/material';
import { COLORS } from 'constant/color';
import AccountInformation from '../AccountInformation/AccountInformation';
import PersonalInformation from '../PersonalInformation/PersonalInformation';
import IndividualAnalytics from '../IndividualAnalytics/IndividualAnalytics';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { doc, getDoc } from 'firebase/firestore';
import { db } from 'libs';


const ProfileTabs = () => {
    const [value, setValue] = React.useState('UserProfile');
    const { id } = useParams()
    const fetchUserData = async () => {
        if (!id) return null;
        const userDoc = doc(db, 'users', id);
        const userDetail = await getDoc(userDoc);
        return userDetail.data();
    }
    const { data } = useQuery({
        queryKey: ['user', id],
        queryFn: fetchUserData,
    })

    console.log(data, 'this is user data')
    console.log(id, 'this is the user id')


    const { email, phoneNumber } = data || {}
    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <>
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
                    <Tab value="UserProfile" label="User Profile" />
                    <Tab value="Activity" label="Activity" />

                </Tabs>
            </Box>
            {value === 'UserProfile' && (
                <Stack>

                    <AccountInformation email={email} phoneNumber={phoneNumber} />
                    <Divider />
                    <PersonalInformation data={data} />
                </Stack>

            )
            }
            {value === 'Activity' && <IndividualAnalytics />
            }
        </>
    );
};



export default ProfileTabs
