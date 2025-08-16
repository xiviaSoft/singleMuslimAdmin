import { Logout } from "@mui/icons-material"
import { PageHeader } from "components"
import { SettingsTabs } from "features/ManageSettings/components"


const ManageSettingsContainer = () => {
    return (
        <>
            <PageHeader title="Personal Settings" buttonTitle="Logout" leftComponent="button" buttonIcon={<Logout />} />
            <SettingsTabs />

        </>
    )
}

export default ManageSettingsContainer
