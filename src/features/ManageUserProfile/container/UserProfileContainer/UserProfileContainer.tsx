import { Stack } from "@mui/material"
import { ArrowBack, CustomButton } from "components"
import { COLORS } from "constant/color"
import { EditProfile, ProfileTabs } from "features/ManageUserProfile/components"


const UserProfileContainer = () => {
    return (
        <>
            <ArrowBack title="User Profile" />
            {/* <ProfileTabs /> */}
            <EditProfile />
            {/* <Stack direction={'row'} gap={2}>
                <CustomButton title="Suspend User" />
                <CustomButton title="Delete User" background={COLORS.error.dark} />
            </Stack> */}
        </>
    )
}

export default UserProfileContainer
