import { Box, Stack } from "@mui/material"
import AsideBar from "layout/AsideBar/AsideBar"


const AppLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Stack gap={'20px'} >
            <AsideBar />
            <Box sx={{ ml: { md: '110px', sm: '65px', xs: 0 }, px: { md: '96px', sm: '50px', xs: '20px' } }}>
                {children}
            </Box>

        </Stack>
    )
}

export default AppLayout
