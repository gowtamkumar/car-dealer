import { ForgotPasswordDto } from '@admin/auth/dtos/forgot-password.dto';
import { SendMailDto } from './../dtos/send-mail.dto';
import { RequestContextDto } from '@common/dtos/request-context.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from '@admin/user/services/user.service';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) { }

  async sendForgotPaswordMail(ctx: RequestContextDto, forgotPasswordDto: ForgotPasswordDto) {
    console.log(`${this.sendForgotPaswordMail.name}`);
    const { otp, username } = forgotPasswordDto

    const user = await this.userService.findUserByUsername(username)

    if (!user) {
      throw new NotFoundException(`User ${username} not found`)
    }

    delete user.password

    const mailFromName = this.configService.get('MAIL_FROM_NAME');
    const mailFromAddress = this.configService.get('MAIL_FROM_ADDRESS');

    const mailOptions = {
      to: forgotPasswordDto.email,
      from: `${mailFromName} <${mailFromAddress}>`,
      subject: `Forgot password`,
      text: 'this is testing gmail',
      html: `<h2>Code: ${otp}</h2>`
    };

    try {
      await this.mailerService.sendMail(mailOptions);

      return user;
    } catch (error) {
      throw new InternalServerErrorException(`Mail sending failed`);
    }
  }
}
