var amqp = require('amqplib');

amqp.connect('amqp://localhost').then((connection) => {
    process.once('SIGINT', () => { connection.close(); });

    return connection.createChannel().then((channel) => {
        var exchange = 'grader.job.topic'
        var queue = 'grader.job.queue';

        var ok = channel.assertExchange(exchange, 'topic', { durable: false })
        // var ok = channel.assertQueue(queue, { durable: false });
        ok = ok.then(() => channel.assertQueue(queue, {exclusive: true}));

        ok = ok.then((qok) => {
            var q = qok.queue;
            channel.bindQueue(q, exchange, '')
            return q;
        });

        ok = ok.then((queue) => {

        return channel.consume(queue, (msg) => {
            console.log(" [x] Received '%s'", msg.content.toString());
        }, {
            noAck: true
        });
        });

        return ok.then((_consumeOk) => {
            console.log(' [*] Waiting for messages. To exit press CTRL+C');
        });
    });
}).catch(console.warn);