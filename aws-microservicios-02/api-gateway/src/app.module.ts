import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MATH_SERVICE',
        // ---- TCP
        // transport: Transport.TCP,
        // options: { host: '127.0.0.1', port: 3001 },

        // ---- NATS
        // transport: Transport.NATS,
        // options: { servers: ['nats://localhost:4222'] },

        // ---- RABBITMQ
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'math_queue',
          queueOptions: { durable: true },
          // prefetchCount: 1,
          // noAck: false,
        },
      },
      {
        name: 'STRING_SERVICE',
        // transport: Transport.TCP,
        // options: { host: '127.0.0.1', port: 3002 },
        // ---NATS
        // transport: Transport.NATS,
        // options: { servers: ['nats://localhost:4222'] },
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'string_queue',
          queueOptions: { durable: true },
          // prefetchCount: 1,
          // noAck: false,
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
