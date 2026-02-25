const nodemailer = require("nodemailer");

// sendEmail: use Gmail when EMAIL_USER is set, otherwise create an Ethereal test account
// Returns an object { info, preview } where preview is an Ethereal URL if available
const sendEmail = async (to, subject, html) => {
  let transporter;
  let usedEthereal = false;

  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  } else {
    // Fall back to Ethereal for local development
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    usedEthereal = true;
  }

  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM || `"TaskFlow" <${process.env.EMAIL_USER || 'no-reply@taskflow.local'}>`,
    to,
    subject,
    html,
  });

  // Log the send result for debugging
  try {
    console.log('sendEmail: messageId=', info.messageId);
    if (info.envelope) console.log('sendEmail: envelope=', info.envelope);
    if (info.response) console.log('sendEmail: response=', info.response);
  } catch (e) {
    // ignore logging errors
  }

  const preview = usedEthereal ? nodemailer.getTestMessageUrl(info) : null;
  return { info, preview };
};

module.exports = sendEmail;
