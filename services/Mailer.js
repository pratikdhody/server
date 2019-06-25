const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
    constructor({ subject, recipients}, content) {
        super();

        this.sgAPI = sendgrid(keys.sendGridKey);
        this.from_email = new helper.Email('no-reply@emaily.com');
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        this.recipients = this.formatAddresses(recipients);

        this.addContent(this.body);
        this.addclickTracking();
        this.addRecipients();
    }

    formatAddresses(recipients) {
        return recipients.map(({ email }) => {
            return new helper.Email(email);
        });
    }

    addclickTracking() {
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);
        tracking.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }

    addRecipients() {
        const personalize = new helper.Personalization();

        this.recipients.forEach(recipient => {
            personalize.addTo(this.recipient);
        });
        this.addPersonalization(personalize);
    }

    async send() {
        const request = this.sgAPI.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON()
        });

        // finally send the email
        const response = this.sgAPI.API(request);
        return response;
    }
}

module.exports = Mailer;