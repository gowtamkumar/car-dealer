import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from '../services/mail.service';
import { RequestContext } from '@common/decorators/request-context.decorator';
import { RequestContextDto } from '@common/dtos/request-context.dto';
import { SendMailDto } from '../dtos/send-mail.dto';
import { ForgotPasswordDto } from '@admin/auth/dtos/forgot-password.dto';

@Controller('mail')
export class MailController {
  constructor(
    private readonly mailService: MailService,
  ) { }

  @Post('/forget-password')
  async sendForgotPaswordMail(@RequestContext() ctx: RequestContextDto, @Body() forgotPasswordDto: ForgotPasswordDto) {
    const result = await this.mailService.sendForgotPaswordMail(ctx, forgotPasswordDto);

    return {
      success: true,
      statusCode: '200',
      message: `Mail sent Successfully`,
      data: result,
    };
  }

}
