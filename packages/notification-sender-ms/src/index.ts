import express         from 'express'
import bodyParser      from 'body-parser'
import cors            from 'cors'
import * as MQReceiverService from './services/MQReceiverService'
// import * as MailSenderService from './services/MailSenderService'

const port   = process.env.PORT || 30011;

const app    = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

if (process.env.NODE_ENV != 'test') {
    app.listen(port, () => {
        const queueNotification = process.env.MQ_NOTIFICATION_QUEUE || ""
       console.log(`Server start on port ${port}`)
       console.log(queueNotification);
       setTimeout(() => {
            MQReceiverService.consume(queueNotification);
            // MailSenderService.sendEmail({
            //     from: "",
            //     to: "",
            //     subject: "",
            //     text: ""
            // })
       }, 10000);
       
    });
}


export default app;