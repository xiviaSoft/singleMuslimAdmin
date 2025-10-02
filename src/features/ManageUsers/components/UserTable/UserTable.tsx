import { useQuery } from "@tanstack/react-query"
import { CustomTable } from "components"
import { ROUTES, USER_TABLE_DATA_COLUMNS, } from "constant"
import { collection, getDoc, getDocs } from "firebase/firestore"
import { auth, db } from "libs"




const UserTable = () => {

    const { data: allUsers = [] } = useQuery<any[]>({
        queryKey: ["users"],
        queryFn: async () => {
            const querySnapshot = await getDocs(collection(db, "users"));
            console.log("Docs:", querySnapshot.docs); 
            return querySnapshot.docs.map((doc) => {
                console.log("Doc data:", doc.data());
                const user = doc.data();
                return {
                    id: doc.id,
                    fullName: `${user.firstName || ""} ${user.lastName || ""}`,
                    dob: user.dateOfBirth || "N/A",
                    email: user.email || "N/A",
                    phoneNumber: user.phoneNumber || "N/A",
                    gender: user.gender || "N/A",
                    maritalStatus: user.maritalStatus || "N/A",
                    education: user.educationInformation?.highestDegree || "N/A",
                    status: user.isActive
                        ? "Active"
                        : user.isSuspended
                            ? "Suspended"
                            : "N/A",
                };
            });
        },

    });







    return (
        <div>

            <CustomTable

                columns={USER_TABLE_DATA_COLUMNS}
                rows={allUsers}
                navigateClick={ROUTES.USERS_Profile}
            />

        </div>
    )
}

export default UserTable
