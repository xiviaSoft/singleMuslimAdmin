import { useQuery } from "@tanstack/react-query"
import { CustomTable } from "components"
import { ROUTES, USER_TABLE_DATA_COLUMNS, } from "constant"
import { collection, getDoc, getDocs } from "firebase/firestore"
import { auth, db } from "libs"




const UserTable = () => {
    // const fetchUsers = async () => {
    //     const usersCollection = collection(db, 'users');
    //     const usersSnapshot = await getDoc(usersCollection);
    //     return usersSnapshot.docs.map(doc => doc.data());
    // }
    const { data: allUsers = [] } = useQuery<any[]>({
        queryKey: ["users"],
        queryFn: async () => {
            const querySnapshot = await getDocs(collection(db, "users"));
            return querySnapshot.docs.map((doc) => {
                const user = doc.data();
                return {
                    id: doc.id,
                    fullName: `${user.firstName || ""} ${user.lastName || ""} `,
                    dob: user.dateOfBirth || "N/A",
                    email: user.email || "N/A",
                    phoneNumber: user.phoneNumber || "N/A",
                    gender: user.gender || "N/A",
                    maritalStatus: user.maritalStatus || "N/A",
                    education: user.educationInformation.highestDegree || "N/A",
                    status: user.isActive || user.isSuspended ? "Active" : "Suspended",
                };
            });
        },
    });





    console.log(allUsers, 'this is all users');

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
