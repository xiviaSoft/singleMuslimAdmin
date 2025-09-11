

import { Edit } from "@mui/icons-material";
import { Typography, Box, Stack } from "@mui/material";
import { CustomButton } from "components";

const AccountInformation = ({ email, phoneNumber }
  : { email?: string, phoneNumber?: string }
) => {
  return (
    <Box my={3}>
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} mb={2}>
        <h2>Account Information</h2>
        <CustomButton title="Edit" startIcon={<Edit />} variant="outlined" />
      </Stack>
      <form>
        <Stack direction={'row'} gap={'100px'}>

          <Box>
            <Box component={'img'} src="/assets/images/adminProfile.png" sx={{ width: '150px', height: '150px' }} />
            {/* <Typography textAlign={'center'}>
              Name: Sahar Ali
            </Typography> */}
          </Box>
          <Stack gap={3}>
            <Box display="flex" gap={1} mt={2}>
              <Typography variant="body1" fontWeight="bold">
                Email:
              </Typography>
              <Typography variant="body1">
                {email}
              </Typography>
            </Box>

            {/* Password */}
            <Box display="flex" gap={1} mt={2}>
              <Typography variant="body1" fontWeight="bold">
                Password:
              </Typography>
              <Typography variant="body1">
                ********
              </Typography>
            </Box>

            {/* Phone */}
            <Box display="flex" gap={1} mt={2}>
              <Typography variant="body1" fontWeight="bold">
                Phone:
              </Typography>
              <Typography variant="body1">
                {phoneNumber || 'N/A'}
              </Typography>
            </Box>


          </Stack>
        </Stack>
      </form>
    </Box>
  );
};


export default AccountInformation
