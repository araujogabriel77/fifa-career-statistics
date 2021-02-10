import nodemailer, { Transporter } from 'nodemailer';
import mailgunTransport from 'nodemailer-mailgun-transport';
import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';
import mailConfig from '@config/mail';

import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';
import { inject, injectable } from 'tsyringe';
interface IMessage {
  to: string;
  body: string;
}

@injectable()
export default class MailgunMailProvider implements IMailProvider {
  private client: Transporter;
  constructor(
    @inject('MailTemplateProvider')
    private emailTemplateProvider: IMailTemplateProvider
  ) {
    const auth = {
      auth: {
        api_key: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN
      }
    }

    this.client = nodemailer.createTransport(mailgunTransport(auth));
  }

  public async sendMail({ to, from, subject, templateData }: ISendMailDTO): Promise<void> {
    const { name, email } = mailConfig.defaults.from;

    await this.client.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email
      },
      to: {
        name: to.name,
        address: to.email
      },
      subject,
      html: await this.emailTemplateProvider.parse(templateData)
    }, (err, info) => {
      if (err) {
        console.log(`Error: ${err}`);
      }
    });
  }
}
