import { Paper, Typography } from '@mui/material';

export default function CalendarCell() {
    return (
        <Paper sx={{ width: '100%', height: '100%', margin: 0, p: 1, borderRadius: 0 }} elevation={2}>
            <Typography variant="caption" color="initial">
                24
            </Typography>
        </Paper>
    );
}
