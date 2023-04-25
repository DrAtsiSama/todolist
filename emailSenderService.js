class EmailSenderService {
    sendEmail(to, subject, message) {
      return new Promise((resolve, reject) => {
        const result = `E-mail envoyé à ${to} : ${subject} - ${message}`;
        resolve(result);
      });
    }
  }
  
  module.exports = EmailSenderService;