import React, { useContext, useEffect, useState, useRef } from "react";
import EventContext from "../../context/events/eventContext";
import CreateEvent from "./CreateEvent";
import EventList from "./eventList";
import { useNavigate } from "react-router-dom";

const Event = (props) => {
  const events = useContext(EventContext);
  const { intialState, getEvents, editEvent } = events;
  const navigate = useNavigate();
  const [event, setEvent] = useState({
    id: "",
    editTitle: "",
    editDescription: "",
    editDate: "",
  });

  const ref = useRef(null);
  const refClose = useRef(null);

  const handelSubmit = (e) => {
    console.log(event);
    editEvent(event.id, event.editTitle, event.editDescription, event.editDate);
    refClose.current.click();
    props.showAlert("Updated Notes", "success");
  };

  const onChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getEvents();
    } else {
      navigate("/login");
    }
  }, []);

  const updateEvent = (currentEvent) => {
    ref.current.click();

    setEvent({
      id: currentEvent._id,
      eventName: currentEvent.editTitle,
      eventDescription: currentEvent.editDescription,
      eventDate: currentEvent.editDate,
    });
  };

  return (
    <div>
      <CreateEvent showAlert={props.showAlert} />

      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Event
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3 my-4 ">
                  <label htmlFor="editTitle" className="form-label">
                    <strong style={{ color: "tomato" }}>Enter Title</strong>
                  </label>
                  <input
                    type="text"
                    className="form-control text-input-css"
                    id="editTitle"
                    name="editTitle"
                    placeholder="e.g. Harry Potter"
                    aria-describedby="emailHelp"
                    value={event.editTitle}
                    onChange={onChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="editDescription" className="form-label">
                    <strong style={{ color: "tomato" }}>
                      Enter Description
                    </strong>
                  </label>
                  <textarea
                    type="text"
                    className="form-control text-input-css"
                    id="editDescription"
                    name="editDescription"
                    placeholder="e.g. Harray Potter Studied in Hogwards"
                    style={{ height: "100px" }}
                    value={event.editDescription}
                    onChange={onChange}
                  ></textarea>
                </div>

                <div className="mb-3 my-4">
                  <label htmlFor="editDate" className="form-label">
                    <strong style={{ color: "tomato" }}>Enter Tag</strong>
                  </label>
                  <input
                    type="text"
                    className="form-control text-input-css"
                    id="editDate"
                    name="editDate"
                    placeholder="e.g. Magical"
                    aria-describedby="emailHelp"
                    value={event.editDate}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="button-button mx-1"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="submit"
                className="button-button my-4 mx-2"
                onClick={handelSubmit}
              >
                Edit Event
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <h2>Your Events Details</h2>
      
      <hr />
      <div className="row">
        <p style={{ marginBottom: "20px", color: "tomato" }}>
          <strong>{intialState.length === 0 && "Please Add Event"}</strong>
        </p>
        {intialState && intialState.map((event) => (
          <EventList
            key={event._id}
            updateEvent={updateEvent}
            showAlert={props.showAlert}
            event={event}
          />
        ))}
      </div>
    </div>
  );
};

export default Event;
