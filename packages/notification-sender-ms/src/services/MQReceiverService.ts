import client, {Connection, Channel, ConsumeMessage} from 'amqplib'

const rabbitMQURL = process.env.MQ_URL || ""

export async function consume(queueName: string){
  console.log("MQReceiverService - Consumer On " + queueName + " at " + rabbitMQURL);
  
  const consumer = (channel: Channel) => (msg: ConsumeMessage | null): void => {
    if (msg) {
      console.log(msg.content.toString())
      channel.ack(msg)
    }
  };

  const connection: Connection = await client.connect(rabbitMQURL)
  const channel: Channel = await connection.createChannel()
  await channel.assertQueue(queueName)
  await channel.consume(queueName, consumer(channel))
}