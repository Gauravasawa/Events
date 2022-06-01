import React, { useContext } from "react";

import EventContext from "../../context/events/eventContext";

const EventList = (props) => {
  const events = useContext(EventContext);
  const { deleteEvent } = events;

  const { event, updateEvent } = props;
  return (
    <div className="col-md-4">
      <div className="card my-3 card-card">
        <div className="card-body">
          <h5 className="card-title">{event.eventName}</h5>
          <p className="card-text">
            <strong style={{ color: "grey" }}>{event.eventDescription}</strong>
          </p>
          <p>{event.eventDate}</p>
          <i
            className="fa-solid fa-pen-to-square mx-2"
            onClick={() => {
              updateEvent(event);
            }}
          ></i>
          <i
            className="fa-solid fa-trash-can mx-2"
            onClick={() => {
              deleteEvent(event._id);
              props.showAlert("Deleted", "danger");
            }}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default EventList;
