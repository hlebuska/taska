import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, {
  Draggable as FCDraggable,
  DropArg,
} from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { EventSourceInput } from "@fullcalendar/core/index.js";
import { useEffect, useState } from "react";

export default function Calendar() {
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
    <div className="fixed right-0 top-14 flex h-[calc(100vh-56px)] w-2/5 flex-col border-l border-r border-gray-300 p-2">
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
    </div>
  );
}
