import { CustomTable } from "components"
import { ROUTES, USER_TABLE_DATA, } from "constant"
import React from "react"


const UserTable = ({ icon }: { icon: React.ReactNode }) => {


    return (
        <div>
            <CustomTable movertIcon={icon} columns={USER_TABLE_DATA.columns} rows={USER_TABLE_DATA.rows} navigateClick={ROUTES.USERS_Profile} />
        </div>
    )
}

export default UserTable
