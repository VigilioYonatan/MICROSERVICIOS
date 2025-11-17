import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { MathModule } from './math.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MathModule,
    // { transport: Transport.TCP, options: { host: '0.0.0.0', port: 3001 } },

    // ------ NATS -------
    // {
    //   transport: Transport.NATS,
    //   options: { servers: ['nats://localhost:4222'] },
    // },
    // ----- RMQ
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'math_queue',
        queueOptions: { durable: true },
        // prefetchCount: 1,
        // noAck: false,
      },
    },
  );
  await app.listen();
  console.log('Math micro-service is listening 3001');
}
bootstrap();
