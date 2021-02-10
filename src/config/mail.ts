interface IMailConfig {
  driver: 'ethereal' | 'mailgun';

  defaults: {
    from: {
      email: string;
      name: string;
    }
  }
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'Excited User <me@samples.mailgun.org',
      name: 'Gabriel FPSS'
    }
  }
} as IMailConfig;
