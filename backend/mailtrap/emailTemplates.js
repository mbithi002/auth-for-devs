export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to Auth for Devs</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        theme: {
          extend: {
            colors: {
              primary: "#a991f7",
              secondary: "#f6d860",
              accent: "#37cdbe",
              neutral: "#3d4451",
              "base-100": "#ffffff",
            },
          },
        },
        darkMode: "class",
      };
    </script>
  </head>
  <body class="font-sans bg-base-100 text-neutral max-w-xl mx-auto p-6">
    <div class="bg-primary text-white text-center py-6 rounded-t-lg">
      <h1 class="text-2xl font-bold">Welcome to Auth for Devs</h1>
    </div>
    <div class="bg-base-100 shadow-lg rounded-b-lg p-6">
      <p class="text-lg">Hello,</p>
      <p class="mt-2">
        Thank you for signing up with <strong>Auth for Devs</strong>! Your
        verification code is:
      </p>
      <div class="text-center my-6">
        <span class="text-3xl font-bold tracking-wider text-primary"
          >{verificationCode}</span
        >
      </div>
      <p class="mt-2">
        Enter this code on the verification page to complete your registration.
      </p>
      <p class="mt-2">
        This code will expire in 15 minutes for security reasons.
      </p>
      <p class="mt-4">
        If you didn't create an account with us, please ignore this email.
      </p>
      <p class="mt-6">
        Best regards,<br />The <strong>Auth for Devs</strong> Team
      </p>
      <p class="mt-6">
        <a href="https://github.com/mbithi002/Advanced-MERN-auth"></a>
      </p>
    </div>
    <div class="text-center text-sm text-gray-500 mt-6">
      <p>This is an automated message, please do not reply to this email.</p>
    </div>
  </body>
</html>

`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Password Reset Successful</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        theme: {
          extend: {
            colors: {
              primary: "#a991f7",
              secondary: "#f6d860",
              accent: "#37cdbe",
              neutral: "#3d4451",
              "base-100": "#ffffff",
            },
          },
        },
        darkMode: "class",
      };
    </script>
  </head>
  <body class="font-sans bg-base-100 text-neutral max-w-xl mx-auto p-6">
    <div class="bg-primary text-white text-center py-6 rounded-t-lg">
      <h1 class="text-2xl font-bold">Password Reset Successful</h1>
    </div>
    <div class="bg-base-100 shadow-lg rounded-b-lg p-6">
      <p class="text-lg">Hello,</p>
      <p class="mt-2">
        We're writing to confirm that your password has been successfully reset.
      </p>
      <div class="text-center my-6">
        <div
          class="bg-primary text-white w-12 h-12 leading-12 rounded-full inline-flex justify-center items-center text-3xl"
        >
          ✓
        </div>
      </div>
      <p class="mt-2">
        If you did not initiate this password reset, please contact our support
        team immediately.
      </p>
      <p class="mt-4">For security reasons, we recommend that you:</p>
      <ul class="list-disc list-inside space-y-1 mt-2">
        <li>Use a strong, unique password</li>
        <li>Enable two-factor authentication if available</li>
        <li>Avoid using the same password across multiple sites</li>
      </ul>
      <p class="mt-4">Thank you for helping us keep your account secure.</p>
      <p class="mt-6">Best regards,<br />Auth for Devs</p>
      <p class="mt-6">
        <a href="https://github.com/mbithi002/Advanced-MERN-auth">github</a>
      </p>
    </div>
    <div class="text-center text-xs text-blue-500 mt-6">
      <p>This is an automated message, please do not reply to this email.</p>
    </div>
  </body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Reset Your Password</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        theme: {
          extend: {
            colors: {
              primary: "#a991f7",
              secondary: "#f6d860",
              accent: "#37cdbe",
              neutral: "#3d4451",
              "base-100": "#ffffff",
            },
          },
        },
        darkMode: "class",
      };
    </script>
  </head>
  <body class="font-sans bg-base-100 text-neutral max-w-xl mx-auto p-6">
    <div class="bg-primary text-white text-center py-6 rounded-t-lg">
      <h1 class="text-2xl font-bold">Password Reset</h1>
    </div>
    <div class="bg-base-100 shadow-lg rounded-b-lg p-6">
      <p class="text-lg">Hello,</p>
      <p class="mt-2">
        We received a request to reset your password. If you didn't make this
        request, please ignore this email.
      </p>
      <p class="mt-4">To reset your password, click the button below:</p>
      <div class="text-center my-6">
        <a
          href="{resetURL}"
          class="bg-primary text-white px-6 py-3 rounded-md font-semibold shadow hover:bg-primary/90"
        >
          Reset Password
        </a>
      </div>
      <p>This link will expire in 1 hour for security reasons.</p>
      <p class="mt-6">Best regards,<br />Auth for Devs</p>      <p class="mt-6">
        <a href="https://github.com/mbithi002/Advanced-MERN-auth">github</a>
      </p>
    </div>
    <div class="text-center text-sm text-gray-500 mt-6">
      <p>This is an automated message, please do not reply to this email.</p>
    </div>
  </body>
</html>
`;

export const WELCOME_EMAIL_PEMPLATE = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to Auth for Devs</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        theme: {
          extend: {
            colors: {
              primary: "#a991f7",
              secondary: "#f6d860",
              accent: "#37cdbe",
              neutral: "#3d4451",
              "base-100": "#ffffff",
            },
          },
        },
        darkMode: "class",
      };
    </script>
  </head>
  <body class="font-sans bg-base-100 text-neutral max-w-xl mx-auto p-6">
    <div class="bg-primary text-white text-center py-6 rounded-t-lg">
      <h1 class="text-2xl font-bold">Welcome to Auth for Devs</h1>
    </div>
    <div class="bg-base-100 shadow-lg rounded-b-lg p-6">
      <p class="text-lg">Hello, {name}</p>
      <p class="mt-2">
        We're excited to have you join
        <span class="font-bold">Auth for Devs</span>, your one-stop solution for
        seamless and secure authentication in your applications.
      </p>
      <p class="mt-4">
        Here's what you can achieve with
        <span class="font-bold">Auth for Devs</span>:
      </p>
      <ul class="list-disc list-inside mt-2 space-y-2">
        <li>**Credential Verification** and Encryption</li>
        <li>Secure **Routing** with token-based mechanisms</li>
        <li>Integrated **Emailing** via Mailtrap</li>
        <li>Effortless **Credential Recovery**</li>
        <li>
          Scalable Authentication using **MongoDB, Express, Node, and React**
        </li>
      </ul>
      <div class="text-center my-6">
        <a
          href="{dashboardURL}"
          class="bg-primary text-white px-6 py-3 rounded-md font-semibold shadow hover:bg-primary/90"
        >
          Go to Your Dashboard
        </a>
      </div>
      <p class="mt-4">
        If you have any questions or need support, feel free to reach out to us.
      </p>
      <p class="mt-6">
        Welcome aboard,<br />The
        <span class="font-bold">Auth for Devs</span> Team
      </p>
    </div>
    <div class="text-center text-sm text-gray-500 mt-6">
      <p>This is an automated message, please do not reply to this email.</p>
    </div>
  </body>
</html>
`