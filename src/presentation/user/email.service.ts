import nodemailer, { Transporter } from 'nodemailer';

interface Attachment {
  fileName: string;
  path: string;
}

interface SendMailOption {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
}

interface EmailOptions {
  mailerServise: string;
  mailerEmail: string;
  mailerSecretKey: string;
}

export class EmailService {
  private transporter: Transporter;

  constructor(
    emailOptions: EmailOptions,
    private readonly postToProvider: boolean,
  ) {
    const { mailerEmail, mailerSecretKey, mailerServise } = emailOptions;

    this.transporter = nodemailer.createTransport({
      service: mailerServise,
      auth: {
        user: mailerEmail,
        pass: mailerSecretKey,
      },
    });
  }

  async sendEmail(options: SendMailOption): Promise<boolean> {
    const { to, subject, htmlBody, attachments } = options;

    try {
      if (!this.postToProvider) return true;

      await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments,
      });

      return true;
    } catch (error) {
      console.log(`Error sending email: ${error}`);
      return false;
    }
  }
}
