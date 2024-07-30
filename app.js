require('dotenv').config();
const cron = require('node-cron');
const axios = require('axios');
const nodemailer = require('nodemailer');

// Charger les serveurs et le planning de la tâche depuis le fichier .env
const servers = process.env.SERVERS.split(',');
const cronSchedule = process.env.CRON_SCHEDULE;

// Configurer le transporteur d'e-mails
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_HOST,
  secure: false, // true pour 465, false pour les autres ports
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

// Fonction pour envoyer un e-mail
const sendEmail = (subject, text) => {
  const mailOptions = {
    from: process.env.MAIL_FROM_ADDRESS,
    to: process.env.MAIL_TO,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(`Error while sending email: ${error}`);
    }
    console.log(`Email sent: ${info.response}`);
  });
};

// Fonction pour vérifier l'état des serveurs
const checkServers = async () => {
  for (const server of servers) {
    try {
      const response = await axios.get(server);
      if (response.status === 200) {
        console.log(`${server} is up`);
      } else {
        console.log(`${server} is down (status code: ${response.status})`);
        sendEmail(`Server Down: ${server}`, `The server at ${server} returned status code ${response.status}.`);
      }
    } catch (error) {
      console.log(`${server} is down (error: ${error.message})`);
      sendEmail(`Server Down: ${server}`, `The server at ${server} is down. Error: ${error.message}`);
    }
  }
};

// Planifier la tâche cron pour vérifier selon le planning défini
cron.schedule(cronSchedule, () => {
  console.log('Checking servers...');
  checkServers();
});

// Démarrer la vérification au lancement du script
checkServers();
