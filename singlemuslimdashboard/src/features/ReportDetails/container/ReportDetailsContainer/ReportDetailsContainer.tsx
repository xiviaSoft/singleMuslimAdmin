import { Stack, TextField } from "@mui/material"
import { ArrowBack, CustomButton } from "components"
import { COLORS } from "constant/color"
import { Attachments, DateSentAndCategory, Reporter, Description, Response } from "features/ReportDetails/components"


const ReportDetailsContainer = () => {
    return (
        <div>
            <ArrowBack title="I found out he was not part of our team" />
            <DateSentAndCategory />
            <Reporter />
            <Description />
            <Attachments />
          
<Response />
            <Stack gap={2} direction={'row'} mt={3} justifyContent={'flex-end'}>
                <CustomButton title="Mark as solved" />
                <CustomButton title="Mark as pending" variant="outlined" />
                <CustomButton title="Delete ticket"  variant="contained" background={COLORS.error.dark}/>
            </Stack>
        </div>
    )
}

export default ReportDetailsContainer
