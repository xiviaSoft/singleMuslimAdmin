import { CustomTable } from "components"
import { USER_TABLE_DATA, } from "constant"


const UserTable = () => {


    return (
        <div>
            <CustomTable columns={USER_TABLE_DATA.columns} rows={USER_TABLE_DATA.rows} />
        </div>
    )
}

export default UserTable
