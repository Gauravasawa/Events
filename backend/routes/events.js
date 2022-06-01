const express = require("express");
const { models } = require("mongoose");
const router = express.Router();
const fetchuser = require("../middleware/fetchUser");
const Events = require("../models/Event");
const { body, validationResult } = require("express-validator");

//Route 1: Fetch All Events using: GET '/api/events/fetchallevents' . Login Required
router.get("/fetchallevents", fetchuser, async (req, resp) => {
  try {
    const events = await Events.find({ user: req.user.id });
    resp.json(events);
  } catch (error) {
    console.error(error.message);
    resp.status(500).send("Internal Server Error");
  }
});

//Route 2: Create Events using: POST '/api/events/addevents'. Login Required
router.post(
  "/addevents",
  fetchuser,
  [
    body("eventName", "Enter a valid Title").isLength({ min: 5 }),
    body("eventDescription", "Enter a valid Description").isLength({ min: 5 }),
    body("eventDate", "Enter a valid Description").isLength({min: 3}),
  ],
  async (req, resp) => {
    try {
      const { eventName, eventDescription, eventDate } = req.body;
      //if error found return bad req and error
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return resp.status(400).json({ errors: errors.array() });
      }
      const events = new Events({
        eventName,
        eventDescription,
        eventDate,
        user: req.user.id,
      });
      const savedEvents = await events.save();
      resp.json(savedEvents);
    } catch (error) {
      console.error(error.message);
      resp.status(500).send("Internal Server Error");
    }
  }
);

//Route 3: Update Events using: PUT '/api/events/updateevents'. Login Required
router.put("/updateevents/:id", fetchuser, async (req, resp) => {
  try {
    const { eventName, eventDescription, eventDate } = req.body;

    //Create a newEvents object
    const newEvents = {};
    if (eventName) {
      newEvents.eventName = eventName;
    }
    if (eventDescription) {
      newEvents.eventDescription = eventDescription;
    }
    if (eventDate) {
      newEvents.eventDate = eventDate;
    }

    //find the events to be updated and update it
    let event = await Events.findById(req.params.id);

    if (!event) {
      return resp.status(404).send("Not Found");
    }

    if (event.user.toString() !== req.user.id) {
      return resp.status(401).send("Not Allowed");
    }

    event = await Events.findByIdAndUpdate(
      req.params.id,
      { $set: newEvents },
      { new: true }
    );
    resp.json(event);
  } catch (error) {
    console.error(error.message);
    resp.status(500).send("Internal Server Error");
  }
});

//Route 4: Delete Events using: DELETE '/api/events/deleteevents'. Login Required
router.delete("/deleteevents/:id", fetchuser, async (req, resp) => {
  try {
    //find the events to be deleted and delete it
    let events = await Events.findById(req.params.id);

    if (!events) {
      return resp.status(404).send("Not Found");
    }

    //Allow if User & Users events Match else "Not Allowed"
    if (events.user.toString() !== req.user.id) {
      return resp.status(401).send("Not Allowed");
    }

    events = await Events.findByIdAndDelete(req.params.id);
    resp.json({ Success: "Event has Been Deleted", events });
  } catch (error) {
    console.error(error.message);
    resp.status(500).send("Internal Server Error");
  }
});

module.exports = router;
