import { Pagination, Stack } from "@mui/material";
import { COLORS } from "constant/color"; // ✅ using your existing blue theme colors

interface CustomPaginationProps {
    page: number;
    count: number;
    onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const CustomPagination = ({ page, count, onChange }: CustomPaginationProps) => (
    <Stack alignItems="center" mt={3}>
        <Pagination
            count={count}
            page={page}
            onChange={onChange}
            shape="rounded"
            sx={{
                "& .MuiPagination-ul": {
                    gap: "6px",
                },
                "& .MuiPaginationItem-root": {
                    borderRadius: "12px",
                    fontFamily: "Satoshi, sans-serif",
                    fontWeight: 600,
                    fontSize: "13px",
                    color: COLORS.blue.main,
                    border: `1px solid ${COLORS.primary.main}`,
                    backgroundColor: "transparent",
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                        backgroundColor: COLORS.primary.thin,
                        color: "#fff",
                    },
                },
                "& .Mui-selected": {
                    backgroundColor: COLORS.primary.main,
                    color: "#fff",
                    "&:hover": {
                        backgroundColor: COLORS.primary.hardDark,
                    },
                },
            }}
        />
    </Stack>
);

export default CustomPagination;
