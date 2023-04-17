import express, { json } from "express";
import { EngagespotClient } from "@engagespot/node";
import { config } from "dotenv";
import { CronJob } from "cron";
import axios from "axios";

config();

const ENGAGESPOT_API_KEY = process.env.API_KEY;
const ENGAGESPOT_API_SECRET = process.env.API_SECRET;
const API_NINJAS_API_KEY = process.env.API_NINJAS_API_KEY;

const app = express();

const client = EngagespotClient({
  apiKey: ENGAGESPOT_API_KEY,
  apiSecret: ENGAGESPOT_API_SECRET,
});

app.use(json());

const emails = new Set();

app.post("/subscribe", (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).send("Email is required");
  }

  try {
    client.createOrUpdateUser("identifier", {
      email: email,
    });
    emails.add(email);
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
  res.status(200).send("OK");
});

app.listen(3000, async () => {
  console.log("Server is running on port 3000");
});

new CronJob("0 6 * * *", async () => {
  const { data } = await axios.get(
    "https://api.api-ninjas.com/v1/quotes?category=happiness",
    {
      headers: {
        "X-Api-Key": API_NINJAS_API_KEY,
      },
    }
  );
  await client.send({
    notification: {
      templateId: 8506,
    },
    data: {
      quote: data[0].quote,
    },
    recipients: Array.from(emails),
  });
}).start();
