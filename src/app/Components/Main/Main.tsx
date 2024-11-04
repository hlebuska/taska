'use client';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { Draggable as FCDraggable, DropArg } from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useEffect, useState } from 'react';
import { EventSourceInput } from '@fullcalendar/core/index.js';
import { AppBar, Box, Divider, Typography } from '@mui/material';
import ToDoTask from '../ToDoTask/ToDoTask';
import { TaskMap, ITask } from '../../types';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { reorderTasks } from '../../util';

export default function Main() {
    const [tasksMap, setTasksMap] = useState<TaskMap>({
        a: [
            { id: '1', value: 'task1 1 11 11' },
            { id: '2', value: 'task2' },
            { id: '3', value: 'task3' },
        ],
        b: [
            { id: '4', value: 'TASK 4' },
            { id: '5', value: 'task5' },
        ],
    });

    const updateTaskText = (id: string, text: string) => {
        const newTasksMap = { ...tasksMap };

        for (const listKey in tasksMap) {
            const taskIndex = newTasksMap[listKey].findIndex((task: ITask) => task.id === id);
            if (taskIndex != -1) {
                newTasksMap[listKey][taskIndex].value = text;
                setTasksMap(newTasksMap);
            }
        }
    };

    const [events, setEvents] = useState([
        { title: 'event 1', id: '1' },
        { title: 'event 2', id: '2' },
        { title: 'event 3', id: '3  ' },
        { title: 'event 4', id: '4' },
        { title: 'event 5', id: '5' },
    ]);

    const [allEvents, setAllEvents] = useState<Event[]>([]);
    const [newEvent, setNewEvent] = useState<Event>({
        title: '',
        start: '',
        allDay: false,
        id: 0,
    });

    useEffect(() => {
        let draggableEl = document.getElementById('draggable-el');

        if (draggableEl) {
            new FCDraggable(draggableEl, {
                itemSelector: '.fc-event',
                eventData: function (eventEl) {
                    let title = eventEl.getAttribute('title');
                    let id = eventEl.getAttribute('data');
                    let start = eventEl.getAttribute('start');
                    
                    return { title, id, start };
                },
            });
        }
    }, []);

    function handleDateClick(arg: { date: Date; allDay: boolean }) {
        setNewEvent({ ...newEvent, start: arg.date, allDay: arg.allDay, id: new Date().getTime() });
    }

    function addEvent(data: DropArg) {
        const event = {
            ...newEvent,
            start: data.date.toISOString(),
            title: data.draggedEl.innerText,
            allDay: data.allDay,
            id: new Date().getTime(),
        };
        setAllEvents([...allEvents, event]);

        const draggedEventTitle = data.draggedEl.title;
        setEvents(events.filter((e) => e.title !== draggedEventTitle));
        console.log(events.filter((e) => e.title !== draggedEventTitle));
    }

    return (
        <>
            <Box
                component="main"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginTop: '56px',

                    height: '100%',
                    width: '60%',
                }}
            >
                {/* Top Navigation */}
                <AppBar
                    position="static"
                    color="transparent"
                    elevation={0}
                    sx={{ marginBottom: 2, height: '12%', p: 2 }}
                >
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Project Name
                    </Typography>
                </AppBar>
                <Divider></Divider>
                {/* Tasks */}
                <Box
                    sx={{
                        borderRight: '1px solid #E0E0E0',
                        p: 2,
                        bgcolor: '#eeeeee',
                        height: '100%',
                    }}
                >
                    {/* <Grid container spacing={2} sx={{ p: 1 }} id="draggable-el">
                        <Grid item xs={4}>
                            {events.map((event, index) => (
                                <ToDoTask text={event.title} id={event.id} key={index} />
                            ))}
                        </Grid>
                    </Grid> */}
                    <DragDropContext
                        onDragEnd={({ destination, source }) => {
                            // // dropped outside the list
                            if (!destination) {
                                return;
                            }
                            setTasksMap(reorderTasks(tasksMap, source, destination));
                        }}
                    >
                        <Box sx={{ display: 'flex', gap: 3 }}>
                            {Object.entries(tasksMap).map(([listName, tasksList]) => (
                                <Droppable
                                    droppableId={listName}
                                    type={'Some'}
                                    direction="vertical"
                                    isCombineEnabled={false}
                                    key={listName}
                                >
                                    {(dropProvided) => (
                                        <div {...dropProvided.droppableProps} style={{}}>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    backgroundColor: 'gray',
                                                    minHeight: '100px',
                                                    minWidth: '100px',
                                                    padding: 1,
                                                }}
                                                ref={dropProvided.innerRef}
                                            >
                                                {tasksList.map((task: ITask, index) => {
                                                    return (
                                                        <ToDoTask
                                                            id={task.id}
                                                            text={task.value}
                                                            key={index}
                                                            index={index}
                                                            onUpdate={updateTaskText}
                                                        />
                                                    );
                                                })}
                                                {dropProvided.placeholder}
                                            </Box>
                                        </div>
                                    )}
                                </Droppable>
                            ))}
                        </Box>
                    </DragDropContext>
                </Box>
            </Box>
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
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'resourceTimelineWook, dayGridMonth,timeGridWeek',
                    }}
                    events={allEvents as EventSourceInput}
                    nowIndicator={true}
                    editable={true}
                    droppable={true}
                    selectable={true}
                    selectMirror={true}
                    dateClick={handleDateClick}
                    drop={(data) => addEvent(data)}
                    eventClick={(data) => console.log('event clicked, data:', data)}
                    eventDragStart={(info) => console.log('Drag start', info)}
                    height={'100%'}
                />
            </Box>
        </>
    );
}
