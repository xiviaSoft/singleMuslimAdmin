
import { Box, Paper } from '@mui/material';
import { COLORS } from 'constant/color';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

type TooltipPayload = ReadonlyArray<any>;

type Coordinate = {
    x: number;
    y: number;
};

type PieSectorData = {
    percent?: number;
    name?: string | number;
    midAngle?: number;
    middleRadius?: number;
    tooltipPosition?: Coordinate;
    value?: number;
    paddingAngle?: number;
    dataKey?: string;
    payload?: any;
    tooltipPayload?: ReadonlyArray<TooltipPayload>;
};

type GeometrySector = {
    cx: number;
    cy: number;
    innerRadius: number;
    outerRadius: number;
    startAngle: number;
    endAngle: number;
};

type PieLabelProps = PieSectorData &
    GeometrySector & {
        tooltipPayload?: any;
    };

const data = [

    { name: 'Completed', value: 900 },
    { name: 'Remaining', value: 200 },

];

const RADIAN = Math.PI / 180;
// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: PieLabelProps) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
    const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${((percent ?? 1) * 100).toFixed(0)}%`}
        </text>
    );
};

const AnalyticsChart = () => {
    return (
        <Box component={Paper} sx={{ backgroundColor: COLORS.white.thin, width: '388px', height: '388px', boxShadow: 'rgba(0, 0, 0, 0.25) 0px 4px 4px 0px', padding: '24px' }}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart width={400} height={400}>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={'80%'}

                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${entry.name}`} fill={index === 0 ? COLORS.error.light : COLORS.primary.lighter} />
                        ))}
                    </Pie>
                    
                </PieChart>
            </ResponsiveContainer>
        </Box>
    );
}




export default AnalyticsChart
