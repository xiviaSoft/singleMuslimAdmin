import { useQuery } from "@tanstack/react-query";
import { CustomPagination, CustomTable } from "components";
import { ROUTES, USER_TABLE_DATA_COLUMNS } from "constant";
import { collection, getDocs } from "firebase/firestore";
import { db } from "libs";
import { useState } from "react";
import { calculateAge } from "utils";

interface UserTableProps {
    filterType: string;
    pageSize: number;
    sortBy: string;
}

const UserTable = ({ filterType, pageSize, sortBy }: UserTableProps) => {
    const [page, setPage] = useState(1);

    const { data: allUsers = [] } = useQuery({
        queryKey: ["users", sortBy, filterType],
        queryFn: async () => {
            const querySnapshot = await getDocs(collection(db, "users"));
            let users = querySnapshot.docs.map((doc) => {
                const user = doc.data();
                return {
                    id: doc.id,
                    fullName: `${user.firstName || ""} ${user.lastName || ""}`,
                    dob: String(calculateAge(user.dateOfBirth) || "N/A"),
                    email: user.email || "N/A",
                    phoneNumber: user.phoneNumber || "N/A",
                    gender: user.gender || "N/A",
                    maritalStatus: user.maritalStatus || "N/A",
                    education: user.educationInformation?.highestDegree || "N/A",
                    isActive: user.isActive,
                    isSuspended: user.isSuspended,
                    status: user.isActive
                        ? "Active"
                        : user.isSuspended
                            ? "Suspended"
                            : "UnSuspended",
                };
            });

            // ✅ Filter
            if (filterType === "Active Users") users = users.filter((u) => u.isActive);
            if (filterType === "Suspended Users") users = users.filter((u) => u.isSuspended);

            // ✅ Sort
            if (sortBy === "Name (A–Z)") users.sort((a, b) => a.fullName.localeCompare(b.fullName));
            if (sortBy === "Name (Z–A)") users.sort((a, b) => b.fullName.localeCompare(a.fullName));
            if (sortBy === "Newest") users.reverse();

            return users; // ✅ return full list (no slicing)
        },
    });

    // ✅ Local pagination
    const totalUsers = allUsers.length;
    const totalPages = Math.ceil(totalUsers / pageSize);
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedUsers = allUsers.slice(start, end);

    return (
        <>
            <CustomTable
                columns={USER_TABLE_DATA_COLUMNS}
                rows={paginatedUsers}
                navigateClick={ROUTES.USERS_Profile}
            />

            <CustomPagination
                page={page}
                count={totalPages}
                onChange={(_, value) => setPage(value)}
            />
        </>
    );
};

export default UserTable;
