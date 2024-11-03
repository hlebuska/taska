import { Paper, Typography, Box, TextField, FormControlLabel, Checkbox } from '@mui/material';
import PrioritySlider from '../PrioritySlider/PrioritySlider';
import { useEffect, useRef, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import './ToDoTask.scss';

interface IProps {
    text: string;
    id: string;
    index: number;
}

export default function ToDoTask({ text, id, index }: IProps) {
    const [priorityValue, setPriorityValue] = useState<number>(1);
    const [textValue, setTextValue] = useState<string>(text);
    const [completed, setCompleted] = useState<boolean>(false);
    const [edit, setEdit] = useState<boolean>(false);
    const [editPriority, setEditPriority] = useState<boolean>(false);

    const wrapperRef = useRef<HTMLElement | null>(null);
    const textFieldRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (edit) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }
    }, [edit]);

    function handleClickOutside(event: MouseEvent) {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
            setEdit(false);
            setEditPriority(false);
        }
    }

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

    const turnEdit = (): void => {
        setEdit(true);
        setTimeout(() => {
            if (textFieldRef.current) {
                textFieldRef.current.focus();
                const length = textValue.length;
                textFieldRef.current.setSelectionRange(length, length);
            }
        }, 50); // Adjust delay time as needed
    };

    const toggleEditPriority = (): void => {
        setEditPriority((prevValue) => !prevValue);
    };

    return (
        <Draggable key={id} draggableId={id} index={index}>
            {(dragProvided) => (
                <div {...dragProvided.dragHandleProps} {...dragProvided.draggableProps} ref={dragProvided.innerRef}>
                    <div>
                        <Paper
                            sx={{ p: 1, mt: 1, display: 'flex', gap: 1, alignItems: 'start' }}
                            elevation={3}
                            onClick={() => turnEdit()}
                            ref={wrapperRef}
                            className="hover fc-event"
                        >
                            <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 20 }, width: 20, height: 30 }} />
                            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 1 }}>
                                {!edit && (
                                    <Typography
                                        variant="body1"
                                        color="initial"
                                        sx={{ marginTop: '3px', marginBottom: '5px' }}
                                    >
                                        {textValue}
                                    </Typography>
                                )}
                                {edit && (
                                    <TextField
                                        inputRef={textFieldRef}
                                        id="standard-basic"
                                        multiline
                                        maxRows={8}
                                        defaultValue=""
                                        sx={{ p: 0, width: '100%' }}
                                        variant="standard"
                                        InputProps={{
                                            disableUnderline: true,
                                        }}
                                        value={textValue}
                                        onChange={(event) => setTextValue(event.target.value)}
                                    />
                                )}
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            border: '2px solid #eeeeee',
                                            p: '2px',
                                            px: '5px',
                                            borderRadius: '8px',
                                            color: 'primary.main',
                                            fontWeight: 500,
                                        }}
                                    >
                                        Tommorow
                                        {/* Tommorow:{' '}
                            <Typography sx={{ color: getPriorityColor() }} component="span">
                                {getPriorityText()}
                            </Typography> */}
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        sx={{
                                            border: `2px solid #eeeeee`,
                                            p: '2px',
                                            px: '5px',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => toggleEditPriority()}
                                    >
                                        Priority:{' '}
                                        <Typography variant="body2" sx={{ color: getPriorityColor() }} component="span">
                                            {getPriorityText()}
                                        </Typography>
                                    </Typography>
                                </Box>

                                {editPriority && edit && (
                                    <PrioritySlider onSliderChange={handlePriorityUpdate} initValue={priorityValue} />
                                )}
                            </Box>
                        </Paper>
                    </div>
                </div>
            )}
        </Draggable>
    );
}
