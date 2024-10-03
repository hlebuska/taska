import { Box, Paper, Slider } from '@mui/material';
import { useState } from 'react';

import './PrioritySlider.scss';

interface IProps {
    onSliderChange: (value: number) => void;
}

export default function PrioritySlider({ onSliderChange }: IProps) {
    const [value, setValue] = useState<number>(1);
    const colors: string[] = ['success.light', 'warning.light', 'error.light'];
    const thumbColors = ['success.dark', 'warning.dark', 'error.dark'];
    const bgColors = ['success.main', 'warning.main', 'error.main'];

    const handleValueChange = (event) => {
        setValue(event.target.value);
        onSliderChange(event.target.value);
    };

    return (
        <Paper
            sx={{
                height: '16px',
                display: 'flex',
                alignItems: 'center',
                bgcolor: colors[value - 1],
                border: `2px solid ${thumbColors[value - 1]}`,
                paddingLeft: '33%',
                position: 'relative',
            }}
        >
            <Box
                sx={{
                    width: [33.3333 * value] + '%',
                    position: 'absolute',
                    bgcolor: bgColors[value - 1],
                    height: '100%',
                    left: '0',
                    borderRadius: '2px',
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                }}
            ></Box>
            {/* Mark #1 */}
            <Box
                sx={{
                    width: '2px',
                    position: 'absolute',
                    bgcolor: '#00000032',
                    height: '100%',
                    left: '33.333%',
                    opacity: value === 1 ? 0 : 100,
                }}
            ></Box>

            {/* Mark #2 */}
            <Box
                sx={{
                    width: '2px',
                    position: 'absolute',
                    bgcolor: '#00000032',
                    height: '100%',
                    left: '66.666%',
                    opacity: value === 2 ? 0 : 100,
                }}
            ></Box>
            <Slider
                aria-label="Temperature"
                value={value}
                defaultValue={1}
                valueLabelDisplay="auto"
                shiftStep={1}
                step={1}
                min={1}
                max={3}
                onChange={handleValueChange}
                sx={{
                    '& .MuiSlider-mark': {},
                    '& .MuiSlider-thumb': {
                        width: value === 2 ? '3.5px' : '3px', // Adjust width
                        height: '20px', // Adjust height
                        borderRadius: 0,
                        bgcolor: thumbColors[value - 1], // Color of the thumb
                    },
                    '& .MuiSlider-track': {
                        opacity: 0,
                    },
                    '& .MuiSlider-rail': {
                        opacity: 0, // Customize rail color
                    },
                }}
            />
        </Paper>
    );
}
