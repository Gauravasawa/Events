import React, { useState } from "react";
import EventContext from "./eventContext";

const EventState = (props) => {
  const host = "http://localhost:8080";
  const state = [];

  const [intialState, setIntialState] = useState(state);

  //Get all Events
  const getEvents = async () => {
    const response = await fetch(`${host}/api/events/fetchallevents`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log("hii",json);
    setIntialState(json);
  };

  //add a Event
  const addEvent = async (eventName, eventDescription, eventDate) => {
    const response = await fetch(`${host}/api/events/addevents`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.getItem("token"),
      },

      body: JSON.stringify({ eventName, eventDescription, eventDate }),
    });
    const json = await response.json();
    console.log(json);
  
    setIntialState(intialState.concat(json));
  };

  //delete a Event
  const deleteEvent = async (id) => {
    const response = await fetch(`${host}/api/events/deleteevents/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    const NewEvent = intialState.filter((event) => {
      return event._id !== id;
    });
    setIntialState(NewEvent);
  };

  //edit a Event
  const editEvent = async (id, eventName, eventDescription, eventDate) => {
    const response = await fetch(`${host}/api/events/updateevents/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.getItem("token"),
      },

      body: JSON.stringify({ eventName, eventDescription, eventDate }),
    });
    const json = await response.json();

    let newEvent = JSON.parse(JSON.stringify(intialState));

    for (let index = 0; index < newEvent.length; index++) {
      const element = newEvent[index];
      if (element._id === id) {
        newEvent[index].eventName = eventName;
        newEvent[index].eventDescription = eventDescription;
        newEvent[index].eventDate = eventDate;
        break;
      }
    }
    setIntialState(newEvent);
    // getNotes();
  };

  return (
    <EventContext.Provider
      value={{ intialState, addEvent, editEvent, deleteEvent, getEvents }}
    >
      {props.children}
    </EventContext.Provider>
  );
};

export default EventState;
