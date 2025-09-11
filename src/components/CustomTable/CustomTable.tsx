import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
} from '@mui/material';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { COLORS } from 'constant/color';
import { useNavigate } from 'react-router';


type Column = {
    label: string;
    field: string;
};

type Row = {
    [key: string]: string;

};

interface CustomTableProps {
    columns: Column[];
    rows: Row[];
    // movertIcon?: any;
    navigateClick: string;
}



const CustomTable: React.FC<CustomTableProps> = ({ columns, rows, navigateClick }) => {
    const navigate = useNavigate()
    return (
        <TableContainer

            sx={{
                borderRadius: 2,
                bgcolor: 'transparent',
                border: 'none',
                overflowX: 'auto'
            }}
        >
            <Table
                sx={{
                    borderCollapse: 'separate',
                    borderSpacing: '0 16px',
                    minWidth: '100%',

                }}
            >
                <TableHead>
                    <TableRow
                        sx={{
                            '& th': {
                                borderBottom: 'none',
                                fontWeight: 700,
                                color: COLORS.blue.main,
                                fontFamily: 'Satoshi, sans-serif',
                                fontSize: '12px',
                                padding: '8px 16px',

                            },
                        }}
                    >
                        {columns.map((col, idx) => (
                            <TableCell key={idx} align='left' sx={{ whiteSpace: 'nowrap' }}>{col.label}</TableCell>
                        ))}
                        <TableCell />
                        <TableCell />
                    </TableRow>
                </TableHead>

                <TableBody>
                    {rows.map((row, rowIndex) => (
                        <TableRow

                            key={rowIndex}
                            sx={{
                                // backgroundColor: COLORS.error.main,


                                borderRadius: '12px',
                                boxShadow: 'rgba(0, 0, 0, 0.25) 0px 4px 4px 0px',

                                '& td': {
                                    fontFamily: 'Satoshi, sans-serif',
                                    fontSize: '12px',
                                    color: COLORS.blue.main,
                                    padding: ' 0',
                                    borderBottom: 'none',
                                    // bgcolor:'red',
                                    fontWeight: 700,
                                    whiteSpace: 'nowrap'
                                },
                                '& td:first-of-type': {
                                    padding: '5px 32px',
                                },

                            }}
                        >
                            {columns.map((col, colIndex) => (
                                <TableCell key={colIndex} >
                                    {row[col.field]}
                                </TableCell>
                            ))}

                            {/* <TableCell >
                                {movertIcon}
                            </TableCell> */}
                            <TableCell>
                                <IconButton onClick={() => navigate(`${navigateClick}/${row.id}`)}>
                                    <ChevronRightIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer >
    );
};

export default CustomTable;
