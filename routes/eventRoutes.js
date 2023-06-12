const express = require("express");
const router = express.Router();
const eventsController = require("../controllers/eventsController");

router
  .route("/")
  .get(eventsController.getAllEvents)
  .post(eventsController.createEvent)
  .patch(eventsController.updateEvent)
  .delete(eventsController.deleteEvent);

  router.route("/single").get(eventsController.getEvent)

module.exports = router;
