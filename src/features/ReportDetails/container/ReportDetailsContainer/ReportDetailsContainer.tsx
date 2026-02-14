import { Stack, Typography, CircularProgress, Box } from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowBack, CustomButton } from "components";
import { COLORS } from "constant/color";
import { useToast } from "context";
import {
    Attachments,
    Response,
    CustomDateSentAndCategory,
    Description,
} from "features/ReportDetails/components";
import { doc, getDoc, Timestamp, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "libs";
import { useParams, useNavigate } from "react-router";

const ReportDetailsContainer = () => {
    const { id } = useParams();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { showToast } = useToast();

    // ✅ Fetch Report Data
    const {
        data: reportData,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["reportData", id],
        queryFn: async () => {
            if (!id) throw new Error("Invalid report ID");
            const reportRef = doc(db, "reports", id);
            const reportSnap = await getDoc(reportRef);
            if (!reportSnap.exists()) throw new Error("Report not found");
            return reportSnap.data();
        },
    });

    // ✅ Update Report Status
    const updateStatusMutation = useMutation({
        mutationFn: async (newStatus: string) => {
            if (!id) throw new Error("Invalid report ID");
            const reportRef = doc(db, "reports", id);
            await updateDoc(reportRef, { status: newStatus });
        },
        onSuccess: (_, newStatus) => {
            showToast(`Report marked as ${newStatus}`, "success");
            queryClient.invalidateQueries({ queryKey: ["reportData", id] });
        },
        onError: () => {
            showToast("Failed to update report status", "error");
        },
    });

    // ✅ Delete Report
    const deleteReportMutation = useMutation({
        mutationFn: async () => {
            if (!id) throw new Error("Invalid report ID");
            const reportRef = doc(db, "reports", id);
            await deleteDoc(reportRef);
        },
        onSuccess: () => {
            showToast("Report deleted successfully", "success");
            queryClient.invalidateQueries({ queryKey: ["safetyReports"] });
            navigate(-1);
        },
        onError: () => {
            showToast("Failed to delete report", "error");
        },
    });

    // ✅ Loading UI
    if (isLoading)
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "60vh",
                    flexDirection: "column",
                    gap: 2,
                }}
            >
                <CircularProgress size={50} sx={{ color: COLORS.primary.main }} />
                <Typography variant="h6" color="text.secondary">
                    Loading report details...
                </Typography>
            </Box>
        );

    // ✅ Error UI
    if (isError)
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "60vh",
                    flexDirection: "column",
                    gap: 2,
                }}
            >
                <Typography variant="h6" color={COLORS.error.dark}>
                     Failed to load report details
                </Typography>
                <Typography color="text.secondary">
                    Please check your connection or try again later.
                </Typography>
            </Box>
        );

    // ✅ Extract Data
    const { title, createdAt, reason, details } = reportData || {};

    const formattedDate =
        createdAt instanceof Timestamp
            ? createdAt.toDate().toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
            })
            : createdAt || "N/A";

    return (
        <Box sx={{ p: 2 }}>
            <ArrowBack title={title || "Report Details"} />

            <Stack direction="row" spacing={3} width="100%" justifyContent="space-between">
                <CustomDateSentAndCategory categoryTitle="Date Sent" title={formattedDate} />
                <CustomDateSentAndCategory categoryTitle="Reason" title={reason || "N/A"} />
            </Stack>

            <Stack spacing={2} mt={3}>
                <Description title={details} />
                <Attachments />
                <Response />
            </Stack>

            <Stack
                gap={2}
                direction="row"
                mt={5}
                justifyContent="flex-end"
                sx={{ flexWrap: "wrap" }}
            >
                <CustomButton
                    title="Mark as Solved"
                    loading={updateStatusMutation.isPending}
                    onClick={() => updateStatusMutation.mutate("Solved")}
                />
                <CustomButton
                    title="Mark as Pending"
                    variant="outlined"
                    loading={updateStatusMutation.isPending}
                    onClick={() => updateStatusMutation.mutate("Pending")}
                />
                <CustomButton
                    title="Delete Ticket"
                    variant="contained"
                    background={COLORS.error.dark}
                    loading={deleteReportMutation.isPending}
                    onClick={() => deleteReportMutation.mutate()}
                />
            </Stack>
        </Box>
    );
};

export default ReportDetailsContainer;
