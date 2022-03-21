import { Notification } from "@shared/notification/Notification";
import client, {Connection, Channel, ConsumeMessage} from 'amqplib'

/**
 * Notification Service 
 * 
 * @constructor creates a new instance of the NotificationService
 */
export class NotificationService{

    //========== Attributes 
    static readonly SERVER = process.env.MQ_URL || "";
    static readonly QUEUE_NAME = process.env.MQ_NOTIFICATION_QUEUE || "";

    //========== Methods 
    /**
     * Connect to the Notification MQ Server
     * @param server MQ server URL
     * @param queueName Queue name
     * @returns Channel MQ
     */
    private static async connectToMQServer(server:string, queueName:string) : Promise<Channel> {
        //== Check if Notification Connection variables are defined
        if(!NotificationService.SERVER && !NotificationService.QUEUE_NAME)
            throw new Error("Notification Connection variables are not defined");

        //== Create a connection to the MQ server
        const connection: Connection = await client.connect(server);
        
        //== Create a channel
        const channel: Channel = await connection.createChannel()
        
        //== Makes the queue available to the client
        await channel.assertQueue(queueName)
        
        return channel;
    }

    /**
     * Send Notification to the server MQ
     * @param notificationToSend notification to send to the client
     */
    public static async sendNotification(notificationToSend:Notification):Promise<void> {
        //== Format notification to MQ format string
        const MQMessage = notificationToSend.formatToSend();

        //== Connect to MQ server
        const channel = await NotificationService.connectToMQServer(NotificationService.SERVER, 
                                                                    NotificationService.QUEUE_NAME);

        //== Send notification to client
        channel.sendToQueue(NotificationService.QUEUE_NAME, Buffer.from(MQMessage));
    }
}