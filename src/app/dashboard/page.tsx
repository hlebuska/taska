"use client";
import { useEffect, useState } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, {
  Draggable as FCDraggable,
  DropArg,
} from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { EventSourceInput } from "@fullcalendar/core/index.js";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { DragDropContext, Droppable } from "@hello-pangea/dnd";

import ToDoTask from "@/components/ui/todo-task";
import { TaskMap, ITask, IListTaskMap } from "@/types";
import { reorderTasks } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import ToDoList from "@/components/ui/todo-list";
import { useDispatch, useSelector } from "react-redux";

export default function DashboardPage() {
  const dispatch = useDispatch();
а

  const updateTaskText = (id: string, text: string) => {
    const newTasksMap = { ...tasksMap };

    for (const listKey in tasksMap) {
      const taskIndex = newTasksMap[listKey].findIndex(
        (task: ITask) => task.id === id,
      );
      if (taskIndex != -1) {
        newTasksMap[listKey][taskIndex].text = text;
        // setTasks(newTasksMap); //!
      }
    }
  };

  const addTaskList = (listName: string) => {
    const newTasksMap = {
      ...tasksMap,
      [listName]: [
        { id: "51", value: "task1 1 11 11" },
        { id: "52", value: "task2" },
        { id: "53", value: "task3" },
      ],
    };
    // setTasks(newTasksMap);
  };

  const [events, setEvents] = useState([
    { title: "event 1", id: "1" },
    { title: "event 2", id: "2" },
    { title: "event 3", id: "3 " },
    { title: "event 4", id: "4" },
    { title: "event 5", id: "5" },
  ]);

  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [newEvent, setNewEvent] = useState<Event>({
    title: "",
    start: "",
    allDay: false,
    id: 0,
  });

  function handleDateClick(arg: { date: Date; allDay: boolean }) {
    setNewEvent({
      ...newEvent,
      start: arg.date,
      allDay: arg.allDay,
      id: new Date().getTime(),
    });
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

  useEffect(() => {
    //TO DO USE REF !!!
    let draggableEl = document.getElementById("draggable-el");

    if (draggableEl) {
      new FCDraggable(draggableEl, {
        itemSelector: ".fc-event",
        eventData: function (eventEl) {
          let title = eventEl.getAttribute("title");
          let id = eventEl.getAttribute("data");
          let start = eventEl.getAttribute("start");

          return { title, id, start };
        },
      });
    }
  }, []);

  return (
    <>
      <div className="mt-[56px] flex h-screen w-3/5 flex-col overflow-scroll bg-gradient-to-tr from-red-400 to-indigo-300 ">
        <div className="bg-white w-full h-24 border-b border-gray-300">
          <h6>Project Name</h6>
        </div>
        <div className="h-full w-full p-2">
          <DragDropContext
            // onDragStart={(start) => console.log(start)}
            onDragEnd={({ destination, source }) => {
              if (!destination) {
                return;
              }
              setTasks(reorderTasks(tasks, source, destination));
            }}
          >
            <div className="flex h-full gap-3">
              {Object.entries(tasks).map(([listID, listBody], index) => (
                <ToDoList
                  listID={listID}
                  listName={listBody.name}
                  listTasks={listBody.tasks}
                  key={index}
                  onUpdate={updateTaskText}
                />
              ))}
              <Button
                variant={"outline"}
                className="mt-2"
                onClick={() => addTaskList("list name test")}
              >
                <AddIcon /> Add list
              </Button>
            </div>
          </DragDropContext>
        </div>
      </div>
      {/* <div className="fixed right-0 top-14 flex h-[calc(100vh-56px)] w-2/5 flex-col border-l border-r border-gray-300 p-2">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "resourceTimelineWook, dayGridMonth,timeGridWeek",
          }}
          events={allEvents as EventSourceInput}
          nowIndicator={true}
          editable={true}
          droppable={true}
          selectable={true}
          selectMirror={true}
          dateClick={handleDateClick}
          drop={(data) => addEvent(data)}
          eventClick={(data) => console.log("event clicked, data:", data)}
          eventDragStart={(info) => console.log("Drag start", info)}
          height={"100%"}
        />
      </div> */}
    </>
  );
}
