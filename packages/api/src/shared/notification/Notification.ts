import { User } from "@models/User";

/**
 * Sendable Interface Object
 */
export interface ISendable {
    formatToSend(): string;
}

/**
 * Message Abstract Class
 * 
 * @implements ISendable
 */
export abstract class Message implements ISendable {
    subject?: string;
    content: string;
    to?: User;
    from?: User;

    constructor(subject: string, content: string, to: User, from?: User) {
        this.subject = subject;
        this.content = content;
        this.to = to;
        this.from = from;
    }

    abstract formatToSend(): string;
}

/**
 * Notification Class
 * 
 * @extends Message
 */
export class Notification extends Message {

    //========== Attributes 
    readonly APP_SENDER: string = 'BLOG_API';

    //========== Constructors 
    constructor(subject: string, content: string, to: User) {
        super(subject, content, to);
    }

    //========== Methods
    /**
     * Format a Notification to MQ String Message
     * @returns MQ string message formated
     */
    formatToSend(): string {
        return '@MSG_FROM_' + this.APP_SENDER + '#' + this.subject + '#' + this.content + '#' + this.to?.mail + '#'
    }
    
}

/*========== Example of usage
    const notification : Notification = new Notification("follow", "New Follow");
    NotificationService.sendNotification(notification)
                       .then(() => console.log("success"))
                       .catch((err: Error) => console.error(err))
==========*/

// @MSG_FROM_API#follow#Bonjour#