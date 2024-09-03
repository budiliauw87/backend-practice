const nodemailer = require('nodemailer');

class MailSender {
  constructor(){
    this._transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      debug: true,
    });
  }

  sendEmail(targetEmail, content){
    const message = {
      from: `OpenMusic App <${process.env.SMTP_USER}>`,
      to: targetEmail,
      subject: `Ekspor Playlist ${Date.now()}`,
      text: 'Terlampir hasil dari ekspor playlist',
      attachments: [
        {
          filename: 'playlists.json',
          content,
        },
      ],
    };
    return this._transporter.sendMail(message);
  }
}

module.exports = MailSender;