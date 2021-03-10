/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// module.exports = (on, config) => {
//   // `on` is used to hook into various events Cypress emits
//   // `config` is the resolved Cypress config
// }

const nodeoutlook = require('nodejs-nodemailer-outlook');

module.exports = (on, config) => {
  on('task', {
    // deconstruct the individual properties
    email({ file }) {
      const mailOptions = {
        from: 'april.ledom@iresearchatlanta.com',
        to: ['mledom.accounts@gmail.com'],
        subject: 'Automated Cold Storage Monitor',
        text: 'Screenshot taken',
        attachments: [{
          path: file
        }],
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PWD,
        },
        onError: (e) => console.log(`Error: ${e}`),
        onSuccess: (i) => console.log(`Success ${i}`)
      };
      nodeoutlook.sendEmail(mailOptions);
      return null;
    }
  })
}