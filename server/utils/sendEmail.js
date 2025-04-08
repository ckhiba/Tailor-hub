const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, text }) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // ✅ Verify connection config only once before sending
        await transporter.verify();
        console.log("✅ Email transporter verified");

        // ✅ Send email
        const mailOptions = {
            from: `"Tailoring App" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`📨 Email sent to: ${to} | Message ID: ${info.messageId}`);
    } catch (error) {
        console.error("❌ Email sending failed:", error.message);
        throw error;
    }
};

module.exports = sendEmail;
