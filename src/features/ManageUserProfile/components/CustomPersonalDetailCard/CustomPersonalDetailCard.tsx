
import { Box, Paper, Stack, Typography } from "@mui/material";
import { COLORS } from "constant/color";

interface CustomPersonalDetailCardProps {
    title?: string;
    children?: React.ReactNode;
}

// helper: handle firestore Timestamp

const CustomPersonalDetailCard = ({ title, children }: CustomPersonalDetailCardProps) => {
    // const { uid, isSuspended, bio, createdAt, dateOfBirth, email, firstName, lastName, gender, highestDegree, isActive, maritalStatus, lastLogin, likes, socialLinks, visits,
    //   workExperience, phoneNumber, languages, Skills, updatedAt, religion, ...allData } = data || {};
    return (
        <Stack
            component={Paper}
            sx={{
                padding: "20px", width: "100%", height: "100%", mt: '20px', bgcolor: COLORS.white.thin
                , boxShadow:
                    "rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px",
                borderRadius: "12px",
            }}
        >
            <Box sx={{ paddingX: { sm: "16px", xs: 0 } }}>
                {title && (
                    <Typography
                        variant="h2"
                        sx={{ fontWeight: 500, color: COLORS.primary.main, pb: "10px", fontSize: '28px', mb: '20px' }}
                    >
                        {title}
                    </Typography>
                )}
                <Box>
                    {children}
                </Box>


            </Box>
        </Stack>
    );
};

export default CustomPersonalDetailCard;
