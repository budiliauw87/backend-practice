require('dotenv').config();
const amqp = require('amqplib');
const SongService = require('./SongService');
const MailSender = require('./MailSender');
const Listener = require('./Listener');

const init = async () => {
  const mailSender = new MailSender();
  const songService = new SongService();
  const listener = new Listener(songService, mailSender);
  const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
  const channel = await connection.createChannel();
  await channel.assertQueue('export:songs', {
    durable: true,
  });
  channel.consume('export:songs', listener.listen, { noAck: true });

};

init().catch(console.error);