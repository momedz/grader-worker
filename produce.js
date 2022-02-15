var amqp = require('amqplib');

amqp.connect('amqp://localhost').then((connection) => {
  return connection.createChannel().then((channel) => {
    var exchange = 'grader.job.topic'
    // var queue = 'grader.job.queue';
    var msg = 'Hello World!';
    var ok = channel.assertExchange(exchange, 'topic', {durable: false});
    // var ok = channel.assertQueue(queue, {durable: false});

    return ok.then(() => {
      channel.publish(exchange, '', Buffer.from(msg))
      console.log(" [x] Sent %s:'%s'", '', msg);
      return channel.close();
    });
  }).finally(() => connection.close());
}).catch(console.warn);