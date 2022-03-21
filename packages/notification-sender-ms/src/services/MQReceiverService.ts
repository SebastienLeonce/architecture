import client, {Connection, Channel, ConsumeMessage} from 'amqplib'
import * as MailSenderService from './MailSenderService'
import { MQMessage } from '../data/MQMessage';
import { Email } from '../data/Email';

const rabbitMQURL = process.env.MQ_URL || ""

export async function consume(queueName: string){
  console.log("MQReceiverService - Consumer On " + queueName + " at " + rabbitMQURL);
  
  const consumer = (channel: Channel) => (msg: ConsumeMessage | null): void => {
    if (msg) {

      //== Parse of the message received from RabbitMQ server
      console.log(msg.content.toString())
      const message = new MQMessage(msg.content.toString());

      //== Check if the message is valid
      if (message.getAttributes()[0] !== '@MSG_FROM_BLOG_API')
        throw new Error("This message is not for us.")
      if (message.getAttributes().length !== 5)
        throw new Error("This message hasn't the correct format.");
      
      //== Create a Mail Message
      const subject = message.getAttributes()[1];
      const content = message.getAttributes()[2];
      const receiverMail = message.getAttributes()[3];
      const mailToSend : Email = {
        from: "no-reply@architecture.sleonce.dev",
        to: receiverMail,
        subject: subject,
        text: content
      };
      //

      //== Send this mail to the specified User Account
      MailSenderService.sendMessage(mailToSend)

      //== Ack to the MQ server
      channel.ack(msg)
    }
  };

  const connection: Connection = await client.connect(rabbitMQURL)
  const channel: Channel = await connection.createChannel()
  await channel.assertQueue(queueName)
  await channel.consume(queueName, consumer(channel))
}