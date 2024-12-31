const createEmailTemplate = ({
  name = "",
  redirectUrl = "/login",
  linkText,
  description,
  subject,
  baseUrl = process.env.NEXT_PUBLIC_BASE_URL
}) => {
  return `
    <html>
      <body style="background-color: #ffffff; color: #24292e; font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji';">
        <div style="width: 480px; margin: 0 auto; padding: 20px 0 48px;">
          <img src="${baseUrl}/static/github.png" width="32" height="32" alt="Github" />
          
          <h1 style="font-size: 24px; line-height: 1.25;">${linkText}</h1>

          <div style="padding: 24px; border: solid 1px #dedede; border-radius: 5px; text-align: center;">
            <p style="margin: 0 0 10px 0; text-align: left;">
              Hey <strong>${name}</strong>!
            </p>
            <p style="margin: 0 0 10px 0; text-align: left;">
              ${description}
            </p>

            <a href="${baseUrl}/${redirectUrl}" 
               style="font-size: 14px; background-color: #28a745; color: #fff; line-height: 1.5; border-radius: 0.5em; padding: 0.75em 1.5em; text-decoration: none; display: inline-block;">
              ${linkText}
            </a>
          </div>

          <div style="text-align: center; margin-top: 20px;">
            <a href="/"><img src="${baseUrl}/static/slack-twitter.png" width="32" height="32" alt="Twitter" style="margin: 0 16px;" /></a>
            <a href="/"><img src="${baseUrl}/static/slack-facebook.png" width="32" height="32" alt="Facebook" style="margin: 0 16px;" /></a>
            <a href="/"><img src="${baseUrl}/static/slack-linkedin.png" width="32" height="32" alt="LinkedIn" style="margin: 0 16px;" /></a>
          </div>

          <div style="text-align: center; margin-top: 20px;">
            <a href="/" style="color: #0366d6; font-size: 12px; margin: 0 10px;">Your security audit log</a>
            <span style="color: #6a737d;">・</span>
            <a href="/" style="color: #0366d6; font-size: 12px; margin: 0 10px;">Contact support</a>
          </div>

          <p style="color: #6a737d; font-size: 12px; text-align: center; margin-top: 60px;">
            Auth System By JB, Inc. ・88 Colin P Kelly Jr Street ・San Francisco, CA 94107
          </p>
        </div>
      </body>
    </html>
  `;
};

export default createEmailTemplate;
