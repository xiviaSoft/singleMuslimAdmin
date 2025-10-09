import { ErrorOutline } from "@mui/icons-material";
import {
    Box,
    CircularProgress,
    Stack,
    Typography,
    Button,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import {
 
    CustomPagination,
    CustomSort,
    CustomTable,
    PageHeader,
} from "components";
import { REPORT_TABLE_DATA, ROUTES } from "constant";

import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "libs";
import { useState, useMemo } from "react";
import { useParams } from "react-router";



// ✅ TypeScript types
interface Report {
    id: string;
    reportedUserId?: string;
    details?: string;
    reason?: string;
    status?: string;
}

interface MergedReport extends Report {
    userName: string;
}

interface UserData {
    firstName?: string;
    lastName?: string;
}

const ManageSafetyReportContainer = () => {
    const [showLogout, setShowLogout] = useState(false);
    const [sortBy, setSortBy] = useState("User Name");
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    const { id } = useParams();

    const handleLogout = () => {
        console.log("User logged out");
        setShowLogout(false);
    };

    // ✅ Fetch reports with user data
    const { data: reports = [], isLoading, isError, refetch } = useQuery<MergedReport[]>({
        queryKey: ["safetyReportsWithUsers"],
        queryFn: async () => {
            const reportSnapshot = await getDocs(collection(db, "reports"));

            const reportsData: Report[] = reportSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...(doc.data() as Omit<Report, "id">),
            }));

            const mergedReports = await Promise.all(
                reportsData.map(async (report) => {
                    let userName = "N/A";

                    if (report.reportedUserId) {
                        try {
                            const userRef = doc(db, "users", report.reportedUserId);
                            const userSnap = await getDoc(userRef);
                            if (userSnap.exists()) {
                                const user = userSnap.data() as UserData;
                                userName =
                                    `${user.firstName || ""} ${user.lastName || ""}`.trim() || "N/A";
                            }
                        } catch (error) {
                            console.error("Error fetching user:", error);
                        }
                    }

                    return {
                        id: report.id,
                        userName,
                        details: report.details || "N/A",
                        reason: report.reason || "N/A",
                        status: report.status || "Pending",
                    };
                })
            );

            return mergedReports;
        },
    });

    const sortKeyMap: Record<string, keyof MergedReport> = {
        "User Name": "userName",
        "Status": "status",
        "Reason": "reason",
    };

    const sortedReports = useMemo(() => {
        const sorted = [...reports];
        const key = sortKeyMap[sortBy];
        sorted.sort((a, b) => {
            const valueA = (a[key] ?? "").toString().toLowerCase();
            const valueB = (b[key] ?? "").toString().toLowerCase();
            return valueA.localeCompare(valueB);
        });
        return sorted;
    }, [reports, sortBy]);

    // ✅ Pagination logic
    const paginatedReports = useMemo(() => {
        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return sortedReports.slice(start, end);
    }, [sortedReports, currentPage]);

    const totalPages = Math.ceil(sortedReports.length / rowsPerPage);

    return (
        <Box>
            <PageHeader title="Safety Reports" />

    
            <Stack direction="row" justifyContent="flex-end" sx={{ mb: 3 }}>
                <CustomSort
                    value={sortBy}
                    onChange={(value) => {
                        setSortBy(value);
                        setCurrentPage(1);
                    }}
                    options={["User Name", "Status", "Reason"]}
                />
            </Stack>

    
            {isLoading && (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "60vh",
                        color: "text.secondary",
                    }}
                >
                    <CircularProgress size={48} thickness={4} />
                    <Typography variant="h6" sx={{ mt: 2 }}>
                        Getting safety reports...
                    </Typography>
                    <Typography variant="body2" color="text.disabled">
                        Please wait while we load the latest reports.
                    </Typography>
                </Box>
            )}

        
            {isError && (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "60vh",
                        textAlign: "center",
                        color: "error.main",
                    }}
                >
                    <ErrorOutline sx={{ fontSize: 60, mb: 1 }} />
                    <Typography variant="h6">Failed to load reports</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Something went wrong while fetching safety report data.
                    </Typography>
                    <Button variant="contained" color="error" onClick={() => refetch()}>
                        Try Again
                    </Button>
                </Box>
            )}

            {!isLoading && !isError && (
                <>
                    <CustomTable
                        columns={REPORT_TABLE_DATA}
                        rows={paginatedReports as any[]}
                        navigateClick={`${ROUTES.SAFETY_DETAILS}`}
                    />

                    <CustomPagination
                        page={currentPage}
                        count={totalPages}
                        onChange={(_, page) => setCurrentPage(page)}
                    />
                </>
            )}
        </Box>
    );
};

export default ManageSafetyReportContainer;
