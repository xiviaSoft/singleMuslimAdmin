import { Grid } from "@mui/material"
import { CustomChart, PageHeader } from "components"
import { APP_INSTALL_DATA, DATAING_USER_DATA } from "constant"



const ManageAnalyticsContainer = () => {
    return (
        <>
            <PageHeader title="Business Health" />
            <Grid container spacing={2}>
                <Grid size={12} padding={0}>
                    <CustomChart title={'App Installs'} data={APP_INSTALL_DATA} categories={['Android', 'iOS']} />
                </Grid>
                <Grid size={12} padding={0}>
                    <CustomChart
                        title="Dating Ratio"
                        data={DATAING_USER_DATA}
                        categories={['activeUsers', 'inactiveUsers']}
                    />
                </Grid>

            </Grid>
        </>
    )
}

export default ManageAnalyticsContainer
