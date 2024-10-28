import { Box, Grid, Paper, Typography } from '@mui/material';
import CalendarCell from '../CalendarCell/CalendarCell';

export default function Calendar() {
    return (
        <Box
            sx={{
                borderRight: '1px solid #E0E0E0',
                p: 2,
                position: 'fixed',
                top: '56px',
                height: 'calc(100vh - 56px)',
                right: 0,
                width: '40%',
                borderLeft: '1px solid #E0E0E0',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Box sx={{}}>
                <Typography variant="h4" color="initial">
                    Calendar
                </Typography>
            </Box>
            <Grid container spacing={0} columns={7} rows={5} sx={{ width: '100%', height: '100%', bgcolor: '#eeeeee' }}>
                <Grid item xs={1} sx={{}}>
                    <CalendarCell />
                </Grid>
                <Grid item xs={1} sx={{}}>
                    <CalendarCell />
                </Grid>
                <Grid item xs={1} sx={{}}>
                    <CalendarCell />
                </Grid>
                <Grid item xs={1} sx={{}}>
                    <CalendarCell />
                </Grid>
                <Grid item xs={1} sx={{}}>
                    <CalendarCell />
                </Grid>
                <Grid item xs={1} sx={{}}>
                    <CalendarCell />
                </Grid>
                <Grid item xs={1} sx={{}}>
                    <CalendarCell />
                </Grid>
                <Grid item xs={1} sx={{}}>
                    <CalendarCell />
                </Grid>
                <Grid item xs={1} sx={{}}>
                    <CalendarCell />
                </Grid>
                <Grid item xs={1} sx={{}}>
                    <CalendarCell />
                </Grid>
                <Grid item xs={1} sx={{}}>
                    <CalendarCell />
                </Grid>
                <Grid item xs={1} sx={{}}>
                    <CalendarCell />
                </Grid>
                <Grid item xs={1} sx={{}}>
                    <CalendarCell />
                </Grid>
                <Grid item xs={1} sx={{}}>
                    <CalendarCell />
                </Grid>
                <Grid item xs={1} sx={{}}>
                    <CalendarCell />
                </Grid>
                <Grid item xs={1} sx={{}}>
                    <CalendarCell />
                </Grid>
                <Grid item xs={1} sx={{}}>
                    <CalendarCell />
                </Grid>
                <Grid item xs={1} sx={{}}>
                    <CalendarCell />
                </Grid>
                <Grid item xs={1} sx={{}}>
                    <CalendarCell />
                </Grid>
                <Grid item xs={1} sx={{}}>
                    <CalendarCell />
                </Grid>
                <Grid item xs={1} sx={{}}>
                    <CalendarCell />
                </Grid>
                <Grid item xs={1} sx={{}}>
                    <CalendarCell />
                </Grid>
                <Grid item xs={1} sx={{}}>
                    <CalendarCell />
                </Grid>
                <Grid item xs={1} sx={{}}>
                    <CalendarCell />
                </Grid>
                <Grid item xs={1} sx={{}}>
                    <CalendarCell />
                </Grid>
                <Grid item xs={1} sx={{}}>
                    <CalendarCell />
                </Grid>
                <Grid item xs={1} sx={{}}>
                    <CalendarCell />
                </Grid>
                <Grid item xs={1} sx={{}}>
                    <CalendarCell />
                </Grid>
                <Grid item xs={1} sx={{}}>
                    <CalendarCell />
                </Grid>
                <Grid item xs={1} sx={{}}>
                    <CalendarCell />
                </Grid>
                <Grid item xs={1} sx={{}}>
                    <CalendarCell />
                </Grid>
                <Grid item xs={1} sx={{}}>
                    <CalendarCell />
                </Grid>
                <Grid item xs={1} sx={{}}>
                    <CalendarCell />
                </Grid>
                <Grid item xs={1} sx={{}}>
                    <CalendarCell />
                </Grid>
                <Grid item xs={1} sx={{}}>
                    <CalendarCell />
                </Grid>
            </Grid>
        </Box>
    );
}
