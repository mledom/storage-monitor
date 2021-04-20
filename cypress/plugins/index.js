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
const dotenvPlugin = require('cypress-dotenv');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

module.exports = (on, config) => {
  config = dotenvPlugin(config);
  on('after:run', (results) => {
    const date = new Date().toISOString().slice(0, 10);
    results.runs[0].tests.forEach(t => {
      const filename = `${t.attempts[0].screenshots[0].path}`;
      var base = path.basename(filename);
      if (!base.includes(date)) {
          base = `${date}-${base}`;
      }
      fs.createReadStream(filename).pipe(fs.createWriteStream(`${process.env.DROPBOX_FOLDER}/${base}`));
    });
    return config;
  });
  on('task', {
    // deconstruct the individual properties
    email({ file }) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PWD,
        }
      });
      
      const mailOptions = {
        from: process.env.SMTP_USER,
        to: process.env.TO_EMAIL,
        subject: 'Automated Cold Storage Monitor',
        text: `Screenshot taken ${new Date().toLocaleString()}`,
        attachments: [{
          path: file
        }],
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log('Email failed: ' + error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      return null;
    }
  });
  return config;
}
