import { Typography, Box, Stack, Grid, Paper, Divider } from "@mui/material";
import UserProfileDetail from "../UserProfileDetail/UserProfileDetail";
import { sections } from "constant";
import { COLORS } from "constant/color";

const PersonalInformation = () => {
  return (
    <Box
my={3}
    >
     
      <Typography
        variant="h5"
        fontWeight={600}
        sx={{ color: COLORS.primary.main, mb: 2 }}
      >
        User Information
      </Typography>
 

  
      <Stack spacing={2}>
        <Box display="flex" justifyContent="space-between" width={'350px'}>
          <Typography variant="body2" fontWeight="bold" sx={{ color: COLORS.black.main }}>
            Full Name:
          </Typography>
          <Typography variant="body2">Stacy Coral</Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" width={'350px'}>
          <Typography variant="body2" fontWeight="bold" sx={{ color: COLORS.black.main }}>
            Company Name:
          </Typography>
          <Typography variant="body2">Design Professional Admin</Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" width={'350px'}>
          <Typography variant="body2" fontWeight="bold" sx={{ color: COLORS.black.main }}>
            Registration Date:
          </Typography>
          <Typography variant="body2">05/12/1994</Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" width={'350px'}>
          <Typography variant="body2" fontWeight="bold" sx={{ color: COLORS.black.main }}>
            Last Login Date:
          </Typography>
          <Typography variant="body2">05/12/1994</Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" width={'350px'}>
          <Typography variant="body2" fontWeight="bold" sx={{ color: COLORS.black.main }}>
            Status:
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontWeight: 500 }}
          >
            Active
          </Typography>
        </Box>
      </Stack>

      {/* Extra Sections */}
      <Grid container spacing={2} mt={3}>
        {sections.map((section, index) => (
          <Grid size={{md:6,xs:12}} key={index}>
            <UserProfileDetail title={section.title} data={section.data} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PersonalInformation;
