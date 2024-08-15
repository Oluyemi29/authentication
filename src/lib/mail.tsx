import nodemailer from "nodemailer";

const sendMail = async ({ mailMe, body }: any) => {
  const { SMTP_PASS, SMTP_USER } = process.env;

  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
  // send mail with defined transport object
  const info = await transport.sendMail({
    from: "adedokunoluyemi1@gmail.com", // sender address
    to: mailMe, // list of receivers
    subject: "SIgn up authentication", // Subject line
    html: body, // html body
  });

  console.log("Message sent: %s", info.messageId);
};

export default sendMail;
