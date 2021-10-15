const express = require("express");
const router = express.Router();
const { sendEmail } = require("./services");

const { APP_NAME } = process.env;
const EMAIL_REGEX =
  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

router.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from serverless 2.0!",
  });
});

router.post("/mail", async (req, res, next) => {
  const { email, subject, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({ error: "email and message required" });
  }

  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ error: "invalid Email" });
  }

  const emailParams = {
    from: email,
    subject: subject ? `${subject} - ${APP_NAME}` : `no subject - ${APP_NAME}`,
    message,
  };

  try {
    await sendEmail(emailParams);
    return res.status(200).json(emailParams);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

module.exports = router;
