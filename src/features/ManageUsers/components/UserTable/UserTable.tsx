import { CustomTable } from "components"
import { ROUTES, USER_TABLE_DATA, } from "constant"
import { auth } from "libs"
import React from "react"
import { useParams } from "react-router"


const UserTable = ({ icon }: { icon: React.ReactNode }) => {



    return (
        <div>
            <CustomTable movertIcon={icon} columns={USER_TABLE_DATA.columns} rows={USER_TABLE_DATA.rows} navigateClick={`${ROUTES.USERS_Profile}/${auth.currentUser?.uid} `} />
        </div>
    )
}

export default UserTable
