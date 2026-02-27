const Event = require("../models/Event");
const { uploadImage, deleteImage } = require("../config/s3");

// GET events
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE event
exports.createEvent = async (req, res) => {
  try {
    const { title, subtitle, date } = req.body;

    if (!title || !subtitle || !date) {
      return res.status(400).json({ error: "All fields required" });
    }

    let image = "";
    let imageKey = "";

    if (req.file) {
      const upload = await uploadImage(req.file, "events");
      image = upload.image;
      imageKey = upload.imageKey;
    }

    const event = new Event({
      title,
      subtitle,
      date,
      image,
      imageKey
    });

    await event.save();
    res.status(201).json(event);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// DELETE event
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.imageKey) {
      await deleteImage(event.imageKey);
    }

    await event.deleteOne();
    res.json({ message: "Event deleted" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// TOGGLE ACTIVE
exports.toggleevent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Not found" });

    event.isActive = !event.isActive;
    await event.save();

    res.json({ message: "Status updated", event });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};