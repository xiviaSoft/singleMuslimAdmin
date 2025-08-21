import { Stack, TextField, Typography } from '@mui/material'
import { COLORS } from 'constant/color'


const Response = () => {
    return (
        <Stack gap={2} >
            <Typography sx={{ fontSize: '15px', fontWeight: 700, color: COLORS.black.dark }} >
                Response
            </Typography>
            <TextField
                multiline
                rows={7}
                fullWidth
                placeholder="Add response here"
                variant="outlined"
            
                sx={{
                    height: "160px",
                    border: "none",
                    outline: "none",
                    padding: '15px',
                    borderRadius: '15px',
                    boxShadow: "rgba(0, 0, 0, 0.25) 0px 4px 4px 0px",
                    "& .MuiOutlinedInput-root": {
                        padding: 0,
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                    },
                    "&:focus-within": {
                        outline: "none",
                    },
                }}
            />

        </Stack>
    )
}

export default Response
