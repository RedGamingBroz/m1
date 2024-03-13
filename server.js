const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000; // You can change this port number as needed

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route to handle form submission
app.post('/scheduleAppointment', (req, res) => {
    const { name, email, doctor, date, time } = req.body;

    // Create a nodemailer transporter
    let transporter = nodemailer.createTransport({
        service: 'Gmail', // Change to your email service
        auth: {
            user: 'your_email@gmail.com', // Your email address
            pass: 'your_password' // Your email password or app password
        }
    });

    // Email content
    let mailOptions = {
        from: 'your_email@gmail.com', // Your email address
        to: 'doctor@example.com', // Doctor's email address
        subject: 'Appointment Scheduled',
        text: `Dear Doctor,\n\nYou have a new appointment scheduled:\n\nName: ${name}\nEmail: ${email}\nDoctor: ${doctor}\nDate: ${date}\nTime: ${time}\n\nSincerely,\nThe Appointment Scheduler`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error:', error);
            res.status(500).send({ message: 'Failed to schedule appointment' });
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send({ message: 'Appointment scheduled successfully' });
        }
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
