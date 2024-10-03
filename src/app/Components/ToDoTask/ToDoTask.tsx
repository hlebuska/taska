import {
    Paper,
    Typography,
    Box,
    Divider,
    TextField,
    IconButton,
    FormControlLabel,
    Checkbox,
    CircularProgress,
} from '@mui/material';
import PrioritySlider from '../PrioritySlider/PrioritySlider';
import { useState } from 'react';
import CreateIcon from '@mui/icons-material/Create';

export default function ToDoTask() {
    const [priorityValue, setPriorityValue] = useState<number>(0);
    const [inProgress, setInProgress] = useState<boolean>(false);

    const handlePriorityUpdate = (value: number) => {
        setPriorityValue(value);
    };

    const getPriorityText = (): string => {
        switch (priorityValue) {
            case 1:
                return 'Low';
            case 2:
                return 'Medium';
            case 3:
                return 'High';
            default:
                return 'Low';
        }
    };
    const getPriorityColor = (): string => {
        switch (priorityValue) {
            case 1:
                return 'success.main';
            case 2:
                return 'warning.main';
            case 3:
                return 'error.main';
            default:
                return 'success.main';
        }
    };

    return (
        <Paper sx={{ p: 1, mt: 1, display: 'flex', flexDirection: 'column', gap: 1 }} elevation={3}>
            <Box>
                {' '}
                <FormControlLabel control={<Checkbox />} label="In progress" />
            </Box>

            <TextField
                id="outlined-multiline-static"
                multiline
                maxRows={8}
                defaultValue=""
                sx={{ p: 0 }}
                InputProps={{
                    sx: {
                        padding: '8px', // Custom inner padding
                    },
                }}
            />
            <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="body2">
                        Priority:{' '}
                        <Typography sx={{ color: getPriorityColor() }} component="span">
                            {getPriorityText()}
                        </Typography>
                    </Typography>
                    <IconButton aria-label="fingerprint">
                        <CreateIcon />
                    </IconButton>
                </Box>

                <PrioritySlider onSliderChange={handlePriorityUpdate} />
            </Box>
        </Paper>
    );
}
