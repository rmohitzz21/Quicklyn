const forgotPasswordTemplate = ({ name, otp }) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset Request</title>
        <style>
            /* Basic Reset & Body Styles */
            body {
                margin: 0;
                padding: 0;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
                line-height: 1.6;
                color: #333333;
                background-color: #f4f4f4;
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
            }

            /* Container for the email content */
            .email-container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                padding: 30px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
                border: 1px solid #e0e0e0;
            }

            /* Header Section */
            .header {
                text-align: center;
                padding-bottom: 20px;
                border-bottom: 1px solid #eeeeee;
                margin-bottom: 20px;
            }
            .header img {
                max-width: 150px;
                height: auto;
            }
            .header h2 {
                color: #0056b3; /* A professional blue */
                margin-top: 10px;
                font-size: 24px;
            }

            /* Content Section */
            .content p {
                margin-bottom: 15px;
                font-size: 16px;
            }
            .content strong {
                color: #0056b3;
            }

            /* OTP Display */
            .otp-box {
                background-color: #e9f5ff; /* Light blue background for OTP */
                border: 1px solid #cce0ff;
                padding: 15px 20px;
                margin: 25px 0;
                text-align: center;
                font-size: 28px;
                font-weight: bold;
                color: #0056b3;
                letter-spacing: 3px;
                border-radius: 5px;
            }

            /* Call to Action Button */
            .button-container {
                text-align: center;
                margin: 30px 0;
            }
            .button {
                display: inline-block;
                padding: 12px 25px;
                background-color: #007bff; /* Primary button color */
                color: #ffffff;
                text-decoration: none;
                border-radius: 5px;
                font-weight: bold;
                font-size: 16px;
                transition: background-color 0.3s ease;
            }
            .button:hover {
                background-color: #0056b3; /* Darker blue on hover */
            }

            /* Footer Section */
            .footer {
                text-align: center;
                padding-top: 20px;
                margin-top: 20px;
                border-top: 1px solid #eeeeee;
                font-size: 12px;
                color: #777777;
            }
            .footer p {
                margin: 5px 0;
            }
            .footer a {
                color: #007bff;
                text-decoration: none;
            }

            /* Responsive Adjustments */
            @media only screen and (max-width: 600px) {
                .email-container {
                    padding: 20px;
                    margin: 10px;
                }
                .header h2 {
                    font-size: 20px;
                }
                .content p {
                    font-size: 14px;
                }
                .otp-box {
                    font-size: 24px;
                    padding: 12px 15px;
                }
                .button {
                    padding: 10px 20px;
                    font-size: 14px;
                }
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="header">
                <!-- Replace with your company logo URL -->
                <img src="https://placehold.co/150x50/007bff/ffffff?text=Your+Logo" alt="Company Logo">
                <h2>Password Reset Request</h2>
            </div>
            <div class="content">
                <p>Hello ${name},</p>
                <p>We received a request to reset the password for your account. Please use the One-Time Password (OTP) below to proceed:</p>

                <div class="otp-box">
                    ${otp}
                </div>

                <p>This OTP is valid for <strong>1 hour</strong>. For security reasons, please do not share this code with anyone.</p>

                <div class="button-container">
                    <!-- This button is optional if OTP is the primary method. You could link to a password reset page here. -->
                    <!-- <a href="YOUR_PASSWORD_RESET_LINK_HERE" class="button">Reset Your Password</a> -->
                </div>

                <p>If you did not request a password reset, please ignore this email. Your password will remain unchanged.</p>
                <p>Thank you,</p>
                <p>The [Your Company Name] Team</p>
            </div>
            <div class="footer">
                <p>&copy; ${new Date().getFullYear()} [Your Company Name]. All rights reserved.</p>
                <p><a href="YOUR_WEBSITE_LINK_HERE">Our Website</a> | <a href="YOUR_PRIVACY_POLICY_LINK_HERE">Privacy Policy</a></p>
            </div>
        </div>
    </body>
    </html>
    `;
};
export default forgotPasswordTemplate;