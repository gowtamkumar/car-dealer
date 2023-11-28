import { MailerModule } from '@nestjs-modules/mailer';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { MailController } from './controllers/mail.controller';
import { MailService } from './services/mail.service';
import { Environment } from '@common/enums/environment.enum';
import { UserModule } from '@admin/user/user.module';

@Module({
  imports: [
    UserModule,
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({


        transport: {
          // host: 'smtp.gmail.com',
          // port: 465,
          host: config.get('MAIL_HOST'),
          port: config.get('MAIL_PORT'),
          secure: true,
          auth: {
            user: config.get('MAIL_USERNAME'),
            pass: config.get('MAIL_PASSWORD'),
          },
          preview: process.env.NODE_ENV === Environment.Development,
        }

        // transport: {
        //   host: config.get('MAIL_HOST'),
        //   port: config.get('MAIL_PORT'),
        //   secure: true,
        //   auth: {
        //     user: config.get('MAIL_USERNAME'),
        //     pass: config.get('MAIL_PASSWORD'),
        //   },
        //   debug: true,
        // },
        // preview: process.env.NODE_ENV === Environment.Development,

        // template: {
        //   dir: join(__dirname, 'templates'), // process.cwd() + '/template/',
        //   adapter: new HandlebarsAdapter(),
        //   options: {
        //     strict: true,
        //   },
        // },

      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [MailController],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule { }
