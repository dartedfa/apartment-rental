const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendActivationEmail = (email = '', name = '', url = '') => {
  sgMail
    .send({
      templateId: process.env.SENDGRID_TEMPLATE_ID,
      to: email,
      from: 'davit.varamashvili@gmail.com',
      replyTo: 'davit.varamashvili@gmail.com',
      dynamic_template_data: {
        name: name,
        url: url,
      },
    })
    .catch(error => console.log(error))
}

module.exports = {
  sendActivationEmail,
}
