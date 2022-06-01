import React, { useContext, useState } from "react";
import EventContext from "../../context/events/eventContext";

const CreateEvent = (props) => {
  const context = useContext(EventContext);
  const { addEvent } = context;

  const [event, setEvent] = useState({ eventName: "", eventDescription: "", eventDate: "" });

  const handelSubmit = (e) => {
    e.preventDefault();
    addEvent(event.eventName, event.eventDescription, event.eventDate);
    setEvent({ eventName: "", eventDescription: "", eventDate: "" });
    props.showAlert("Added event Successfully", "success");
  };

  const onChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container my-5">
        <hr />
        <h1>Add Event</h1>

        <h6 style={{ marginTop: "40px" }}>Add Event Form</h6>
        <hr />
        <form>
          <div className="mb-3 my-4 ">
            <label htmlFor="eventName" className="form-label">
              <strong style={{ color: "tomato" }}>Event Name</strong>
            </label>
            <input
              type="text"
              className="form-control text-input-css"
              id="eventName"
              name="eventName"
              placeholder="e.g. Reception"
              aria-describedby="emailHelp"
              value={event.eventName}
              onChange={onChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="eventDescription" className="form-label">
              <strong style={{ color: "tomato" }}>Event Description</strong>
            </label>
            <textarea
              type="text"
              className="form-control text-input-css"
              id="eventDescription"
              name="eventDescription"
              placeholder="e.g. Reception Event of Ms.Dhoni"
              style={{ height: "100px" }}
              value={event.eventDescription}
              onChange={onChange}
            ></textarea>
          </div>

          <div className="mb-3 my-4">
            <label htmlFor="eventDate" className="form-label">
              <strong style={{ color: "tomato" }}>Event Date</strong>
            </label>
            <input
              type="text"
              className="form-control text-input-css"
              id="eventDate"
              name="eventDate"
              placeholder="e.g. 22/03/2022"
              aria-describedby="emailHelp"
              value={event.eventDate}
              onChange={onChange}
            />
          </div>

          <button
            type="submit"
            className="button-button my-4"
            style={{ backgroundColor: "black" }}
            onClick={handelSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateEvent;
