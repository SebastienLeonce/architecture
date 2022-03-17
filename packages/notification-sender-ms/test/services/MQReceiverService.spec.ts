import * as MQReceiverService from '../../src/services/MQReceiverService'

describe('consume a MQ message', () => {
    console.log(process.env.NODE_ENV);
    
    it('Should Connect to MQ Server', done => {
        setTimeout(() => {
            MQReceiverService.consume(process.env.MQ_NOTIFICATION_QUEUE || "")
            .then(()=>{ done() })
            .catch(err => { done(err) })
        }, 10000)  
    })
})