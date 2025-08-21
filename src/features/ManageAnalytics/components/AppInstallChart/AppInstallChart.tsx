import { Box, Stack, Typography } from "@mui/material";
import { COLORS } from "constant/color";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", Android: 4000, iOS: 2400, amt: 12000 },
  { name: "Feb", Android: 3000, iOS: 1398, amt: 25000 },
  { name: "Mar", Android: 2000, iOS: 9800, amt: 60000 },
  { name: "Apr", Android: 2780, iOS: 3908, amt: 45000 },
  { name: "May", Android: 1890, iOS: 4800, amt: 18000 },
  { name: "Jun", Android: 2390, iOS: 3800, amt: 30000 },
  { name: "Jul", Android: 3490, iOS: 4300, amt: 52000 },
  { name: "Aug", Android: 4200, iOS: 5100, amt: 34000 },
  { name: "Sep", Android: 3100, iOS: 2900, amt: 27000 },
  { name: "Oct", Android: 3700, iOS: 4600, amt: 41000 },
  { name: "Nov", Android: 4500, iOS: 5200, amt: 56000 },
  { name: "Dec", Android: 5000, iOS: 6000, amt: 60000 },
];

// 🎨 Custom tooltip with % values
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const android =
      payload.find((p: any) => p.dataKey === "Android")?.value || 0;
    const ios = payload.find((p: any) => p.dataKey === "iOS")?.value || 0;
    const total = android + ios;

    const androidPercent = total ? ((android / total) * 100).toFixed(1) : 0;
    const iosPercent = total ? ((ios / total) * 100).toFixed(1) : 0;

    return (
      <Box
        sx={{
          background: "white",
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "10px",
          boxShadow: "0px 2px 6px rgba(0,0,0,0.15)",
          width:'100%'
        }}
      >
        <strong>{label}</strong>
        <br />
        <span style={{ color: COLORS.error.orangeRed }}>
          iOS: {iosPercent}%
        </span>
        <br />
        <span style={{ color: COLORS.primary.thin }}>
          Android: {androidPercent}%
        </span>
      </Box>
    );
  }
  return null;
};

const AppInstallChart = () => {
  // calculate totals
  const totalAndroid = data.reduce((sum, d) => sum + d.Android, 0);
  const totalIOS = data.reduce((sum, d) => sum + d.iOS, 0);
  const totalInstalls = totalAndroid + totalIOS;

  return (
    <Box
      height={"500px"}
      width={"100%"}
      sx={{ background: COLORS.white.main, borderRadius: "8px", padding: 3 }}
    >
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography fontWeight="bold" flex={1} textAlign="center">
          App Installs
        </Typography>
        <Typography color={COLORS.gray.light}>2025</Typography>
      </Stack>

      <Stack direction="row" height="100%">
        {/* Chart */}
        <Box flex={1}>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              {/* X Axis (Months) */}
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12 }}
              />
              {/* Y Axis (Amount) */}
              <YAxis
                type="number"
                tick={{ fontSize: 12 }}
              />

              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: COLORS.gray.lighter }}
              />

              {/* iOS on bottom */}
              <Bar
                dataKey="iOS"
                stackId="a"
                fill={COLORS.error.orangeRed}
                barSize={40} // ⬅ Wider column
                isAnimationActive={true}
                animationBegin={200}
                animationDuration={1200}
              />

              {/* Android on top */}
              <Bar
                dataKey="Android"
                stackId="a"
                fill={COLORS.primary.thin}
                radius={[10, 10, 0, 0]}
                barSize={40} // ⬅ Wider column
                isAnimationActive={true}
                animationBegin={600}
                animationDuration={1500}
              />
            </BarChart>
          </ResponsiveContainer>

          <Typography textAlign="center" mt={1} fontWeight="bold">
            Total Installs: {totalInstalls.toLocaleString()}
          </Typography>
        </Box>

        {/* Right side legend */}
        <Legend
          layout="vertical"
          verticalAlign="middle"
          align="right"
          fontSize={12}
          iconType="circle"
        />
      </Stack>
    </Box>
  );
};

export default AppInstallChart;
