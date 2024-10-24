import nodemailer from 'nodemailer';
const { EMAIL_HOST, EMAIL_PORT, EMAIL_USERNAME, EMAIL_PASSWORD  } = process.env;

const transport = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    auth: {
        user: EMAIL_USERNAME,
        pass: EMAIL_PASSWORD
    }
});


async function main({ to, subject, text, html }) {
    try {
        await transport.sendMail({
            from: EMAIL_USERNAME,
            to,
            subject,
            text,
            html
        });
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email: ", error);
    }
}

export default main;