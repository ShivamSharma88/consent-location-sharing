const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

let sharedLocations = [];

// POST endpoint to receive location data with explicit consent
app.post("/api/location", (req, res) => {
  const { userId, latitude, longitude, accuracy, consentGiven, consentTimestamp } = req.body;

  // Verify consent was given
  if (!consentGiven) {
    return res.status(400).json({ error: "Location sharing requires explicit consent." });
  }

  const record = {
    userId,
    latitude,
    longitude,
    accuracy,
    consentTimestamp,
    timestamp: new Date().toISOString()
  };

  sharedLocations.push(record);
  console.log("Saved location:", record);

  return res.json({ status: "ok", record });
});

// GET endpoint to retrieve location history for a user
app.get("/api/location/:userId", (req, res) => {
  const userId = req.params.userId;
  const records = sharedLocations.filter(item => item.userId === userId);
  res.json(records);
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Consent-based location app is running" });
});

app.listen(port, () => {
  console.log(`Consent-based location app running on http://localhost:${port}`);
});
