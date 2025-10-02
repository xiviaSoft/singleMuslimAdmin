import { Typography, Box, Stack, Grid, Paper, Divider, Container } from "@mui/material";
import { COLORS } from "constant/color";
import { DocumentData } from "firebase/firestore";
import TitleRow from "../TitleRow/TitleRow";
import CustomPersonalDetailCard from "../CustomPersonalDetailCard/CustomPersonalDetailCard";



interface PersonalInformationProps {
  data: DocumentData | null | undefined;
}

const PersonalInformation = ({ data }: PersonalInformationProps) => {

  console.log(data, 'this is personal info data');
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
          <Typography variant="body2">{data?.firstName} {data?.lastName}</Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" width={'350px'}>
          <Typography variant="body2" fontWeight="bold" sx={{ color: COLORS.black.main }}>
            Company Name:
          </Typography>
          {/* <Typography variant="body2">{data?.workExperience
            .companyName
          }</Typography> */}
        </Box>

        <Box display="flex" justifyContent="space-between" width={'350px'}>
          <Typography variant="body2" fontWeight="bold" sx={{ color: COLORS.black.main }}>
            Registration Date:
          </Typography>
          <Typography variant="body2">
            {data?.createdAt?.seconds
              ? new Date(data.createdAt.seconds * 1000).toLocaleDateString()
              : "N/A"}
          </Typography>


        </Box>

        <Box display="flex" justifyContent="space-between" width={'350px'}>
          <Typography variant="body2" fontWeight="bold" sx={{ color: COLORS.black.main }}>
            Last Login Date:
          </Typography>
          <Typography variant="body2">{data?.lastLogin?.seconds
            ? new Date(data.lastLogin.seconds * 1000).toLocaleDateString()
            : "N/A"}</Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" width={'350px'}>
          <Typography variant="body2" fontWeight="bold" sx={{ color: COLORS.black.main }}>
            Status:
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontWeight: 500 }}
          >
            {data?.isActive ? "Active" : "Suspended"}
          </Typography>
        </Box>
      </Stack>


      <Grid container spacing={2}>
        {/* Personal Details */}
        <Grid size={{ xs: 12, md: 6 }} key={`${data?.id}-personal`}>
          <CustomPersonalDetailCard title="Personal Details">
            <TitleRow
              label="Full Name"
              value={`${data?.firstName || ""} ${data?.lastName || ""}`}
            />
            <TitleRow label="Email" value={data?.email || "N/A"} />
            <TitleRow label="Phone Number" value={data?.phoneNumber || "N/A"} />
            <TitleRow label="Date of Birth" value={data?.dateOfBirth || "N/A"} />
            <TitleRow label="Marital Status" value={data?.maritalStatus || "N/A"} />
            <TitleRow label="Gender" value={data?.gender || "N/A"} />
          </CustomPersonalDetailCard>
        </Grid>

        {/* Work Experience */}
        {data?.workExperience && (
          <Grid size={{ xs: 12, md: 6 }} key={`${data?.id}-work`}>
            <CustomPersonalDetailCard title="Work Experiences">
              <TitleRow
                label="Company Name"
                value={data?.workExperience?.companyName || "N/A"}
              />
              <TitleRow
                label="Company Description"
                value={data?.workExperience?.description || "N/A"}
              />
              <TitleRow
                label="Currently Working"
                value={data?.workExperience?.isCurrent ? "Yes" : "No"}
              />
              <TitleRow
                label="Job Role"
                value={data?.workExperience?.role || "N/A"}
              />
              <TitleRow
                label="Start Date"
                value={data?.workExperience?.startDate || "N/A"}
              />
              <TitleRow
                label="End Date"
                value={data?.workExperience?.endDate || "N/A"}
              />
            </CustomPersonalDetailCard>
          </Grid>
        )}

        {/* Skills */}
        {data?.skills && (
          <Grid size={{ xs: 12, md: 6 }} key={`${data.id}-skills`}>
            <CustomPersonalDetailCard title="Skills Details">
              <TitleRow
                label="Technical Skills"
                value={data?.skills.technicalSkills?.join(", ") || "N/A"}
              />
              <TitleRow
                label="Soft Skills"
                value={data?.skills.softSkills?.join(", ") || "N/A"}
              />
              <TitleRow
                label="Languages"
                value={data?.skills.languages?.join(", ") || "N/A"}
              />
            </CustomPersonalDetailCard>
          </Grid>
        )}

        {/* Education */}
        {data?.educationInformation && (
          <Grid size={{ xs: 12, md: 6 }} key={`${data.id}-education`}>
            <CustomPersonalDetailCard title="Education Details">
              <TitleRow
                label="Field Of Study"
                value={data?.educationInformation.fieldOfStudy || "N/A"}
              />
              <TitleRow
                label="Highest Degree"
                value={data?.educationInformation.highestDegree || "N/A"}
              />
              <TitleRow
                label="Graduation Year"
                value={data?.educationInformation.graduationYear || "N/A"}
              />
              <TitleRow
                label="Institution Name"
                value={data?.educationInformation.institutionName || "N/A"}
              />
            </CustomPersonalDetailCard>
          </Grid>
        )}
      </Grid>


    </Box>
  );
};

export default PersonalInformation;
