import { Box, Paper, Stack, Typography } from "@mui/material";
import { COLORS } from "constant/color";

interface CustomPersonalDetailCardProps {
    title?: string;
    data?: { [key: string]: React.ReactNode };
}

const UserProfileDetail = ({
    title,
    data = {},
}: CustomPersonalDetailCardProps) => {
    return (
        <Stack
            component={Paper}
            sx={{
                padding: "20px",
                width: "100%",
                height: "100%",
                bgcolor: COLORS.white.thin,
                boxShadow: 'rgba(0, 0, 0, 0.25) 0px 4px 4px 0px',
            }}
        >
            <Box
                sx={{
                    paddingX: { sm: "16px", xs: 0 }
                }}
            >
                <Typography
                    variant="h2"
                    sx={{
                        fontWeight: "600",
                        color: COLORS.primary.main,
                        pb: "10px",
                        fontSize: '24px'
                    }}
                >
                    {title}
                </Typography>

                {Object.entries(data).map(([key, value]) => (
                    <Stack
                        key={key}
                        direction="row"
                        gap="30px"
                        pb="10px"
                    >
                        <Typography

                            color={COLORS.black.main} width="50%"
                        >
                            {key}
                        </Typography>
                        <Typography
                            color={COLORS.black.darkGray}
                        >
                            {value}
                        </Typography>
                    </Stack>
                ))}
            </Box>
        </Stack>
    );
};



export default UserProfileDetail;
