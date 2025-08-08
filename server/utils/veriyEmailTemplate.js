const verifyEmailTemplate = ({ name, url }) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Email - Blinkyt</title>
        <style>
            /* Basic Reset & Body Styles */
            body {
                margin: 0;
                padding: 0;
                font-family: 'Inter', sans-serif;
                background-color: #f4f4f4;
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
                width: 100% !important;
            }

            /* Container Table */
            .email-container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
            }

            /* Header */
            .header {
                background-color: #007bff; /* A nice blue */
                padding: 20px;
                text-align: center;
                color: #ffffff;
                border-top-left-radius: 8px;
                border-top-right-radius: 8px;
            }
            .header h1 {
                margin: 0;
                font-size: 24px;
                font-weight: bold;
            }

            /* Content Area */
            .content {
                padding: 30px;
                color: #333333;
                line-height: 1.6;
            }
            .content p {
                margin-bottom: 15px;
                font-size: 16px;
            }

            /* Button Styling */
            .button-wrapper {
                text-align: center;
                margin: 30px 0;
            }
            .button {
                display: inline-block;
                padding: 12px 25px;
                background-color: #007bff; /* Match header blue */
                color: #ffffff;
                text-decoration: none;
                border-radius: 5px;
                font-size: 18px;
                font-weight: bold;
                transition: background-color 0.3s ease;
            }
            .button:hover {
                background-color: #0056b3; /* Darker blue on hover */
            }

            /* Footer */
            .footer {
                background-color: #f0f0f0;
                padding: 20px;
                text-align: center;
                font-size: 12px;
                color: #777777;
                border-bottom-left-radius: 8px;
                border-bottom-right-radius: 8px;
            }
            .footer p {
                margin: 5px 0;
            }
            .footer a {
                color: #007bff;
                text-decoration: none;
            }

            /* Responsive adjustments */
            @media only screen and (max-width: 600px) {
                .email-container {
                    width: 100% !important;
                    margin: 0;
                    border-radius: 0;
                    box-shadow: none;
                }
                .content {
                    padding: 20px;
                }
                .button {
                    width: 90%;
                    box-sizing: border-box;
                }
            }
        </style>
    </head>
    <body>
        <table role="presentation" class="email-container" cellspacing="0" cellpadding="0" border="0" align="center">
            <tr>
                <td class="header">
                    <h1>Blinkyt</h1>
                </td>
            </tr>
            <tr>
                <td class="content">
                    <h3>Dear ${name},</h3>
                    <p>Thank you for registering with Blinkyt! We're excited to have you on board.</p>
                    <p>To complete your registration and activate your account, please verify your email address by clicking the button below:</p>
                    <div class="button-wrapper">
                        <a href="${url}" class="button">Verify Email Address</a>
                    </div>
                    <p>This verification link is valid for a limited time. If the link expires, you can request a new one from our website.</p>
                    <p>If you did not sign up for a Blinkyt account, please disregard this email.</p>
                    <p>Thanks,<br>The Blinkyt Team</p>
                </td>
            </tr>
            <tr>
                <td class="footer">
                    <p>&copy; ${new Date().getFullYear()} Blinkyt. All rights reserved.</p>
                    <p><a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a></p>
                </td>
            </tr>
        </table>
    </body>
    </html>
  `;
};

export default verifyEmailTemplate;
