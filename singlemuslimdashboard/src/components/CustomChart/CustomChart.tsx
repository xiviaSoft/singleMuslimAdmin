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

interface ChartDataTypes {
  title: string;
  data: any[];
  categories: string[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const total = payload.reduce((sum: number, p: any) => sum + (p.value || 0), 0);
    return (
      <Box
        sx={{
          background: "white",
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "10px",
          boxShadow: "0px 2px 6px rgba(0,0,0,0.15)",
        }}
      >
        <strong>{label}</strong>
        <br />
        {payload.map((p: any, i: number) => {
          const percent = total ? ((p.value / total) * 100).toFixed(1) : 0;
          return (
            <div key={i} style={{ color: p.fill }}>
              {p.name}: {p.value} ({percent}%)
            </div>
          );
        })}
      </Box>
    );
  }
  return null;
};

const CustomChart = ({ title, data, categories }: ChartDataTypes) => {
  if (!data || data.length === 0 || categories.length !== 2) return null;

  // Calculate total users
  const totalUsers = data.reduce(
    (sum, d) => sum + categories.reduce((s, key) => s + (d[key] || 0), 0),
    0
  );

  const colorMap: Record<string, string> = {
    [categories[0]]: COLORS.primary.thin,
    [categories[1]]: COLORS.error.orangeRed,
  };

  return (
    <Box
      height={"500px"}
      width={"100%"}
      sx={{ background: COLORS.white.main, borderRadius: "8px", padding: 3 }}
    >
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography fontWeight="bold" flex={1} textAlign="center">
          {title}
        </Typography>
        <Typography color={COLORS.gray.light}>2025</Typography>
      </Stack>

      <Stack direction="row" height="100%">
        <Box flex={1}>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis
                dataKey={data[0].name ? "name" : "month"}
                tick={{ fontSize: 12 }}
              />
              <YAxis type="number" tick={{ fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: COLORS.gray.lighter }} />
              <Legend
                layout="vertical"
                verticalAlign="bottom"
                align="center"
                fontSize={12}
                iconType="circle"
              />

              {/* Only 2 bars */}
              {categories.map((key, index) => (
                <Bar
                  key={key}
                  dataKey={key}
                  stackId="a"
                  fill={colorMap[key]}
                  barSize={40}
                  radius={index === categories.length - 1 ? [10, 10, 0, 0] : 0}
                  isAnimationActive={true}
                  animationBegin={200 * (index + 1)}
                  animationDuration={1000 + index * 300}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>

          {/* Total users below chart */}
          <Typography textAlign="center" mt={1} fontWeight="bold">
            Total Users: {totalUsers.toLocaleString()}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default CustomChart;
