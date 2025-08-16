import { KeyboardArrowDown, Tune } from "@mui/icons-material";
import { Stack } from "@mui/material";
import { CustomButton, CustomSelect, PageHeader } from "components";
import { PROFESSION } from "constant";
import { GetSectionOptions, UserTable, UserTabs } from "features/ManageUsers/components";
import { FormProvider, useForm } from "react-hook-form";


const ManageUsersContainer = () => {
    const methods = useForm()


    return (
        <FormProvider {...methods}>

            <Stack gap={2}>
                <PageHeader title="Manage Users" />
                <UserTabs />
                <Stack direction={'row'} sx={{ justifyContent: 'end', gap: '10px' }}>
                    <CustomButton variant="outlined" title="Filter" endIcon={<Tune />} />
                    <CustomButton variant="contained" title="Sort By" endIcon={<KeyboardArrowDown />} />
                </Stack>
        <GetSectionOptions/>

              
                <UserTable />
            </Stack>
        </FormProvider>
    )
}

export default ManageUsersContainer
