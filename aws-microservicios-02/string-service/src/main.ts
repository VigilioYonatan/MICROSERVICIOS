import { NestFactory } from '@nestjs/core';
import { StringModule } from './string.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    StringModule,
    // { transport: Transport.TCP, options: { host: '0.0.0.0', port: 3002 } },
    // {
    //   transport: Transport.NATS,
    //   options: { servers: ['nats://localhost:4222'] },
    // },
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'string_queue',
        queueOptions: { durable: true },
        // prefetchCount: 1,
        // noAck: false,
      },
    },
  );
  await app.listen();
  console.log('Corriendo servidor en puerto 3002');
}
bootstrap();
