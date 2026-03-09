# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Environment Setup

This project requires environment variables for various services. Follow these steps:

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in the required values in `.env`:
   - `REACT_APP_GA4_MEASUREMENT_ID`: Your Google Analytics 4 Measurement ID
   - `REACT_APP_RECAPTCHA_SITE_KEY`: Your Google reCAPTCHA v3 site key
   - `REACT_APP_EMAILJS_SERVICE_ID`: Your EmailJS service ID
   - `REACT_APP_EMAILJS_TEMPLATE_ID`: Your EmailJS template ID
   - `REACT_APP_EMAILJS_PUBLIC_KEY`: Your EmailJS public key
   - `REACT_APP_CLARITY_PROJECT_ID`: (Optional) Your Microsoft Clarity project ID

### Getting API Keys

- **Google Analytics 4**: Create a property at [Google Analytics](https://analytics.google.com/)
- **reCAPTCHA v3**: Register at [Google reCAPTCHA](https://www.google.com/recaptcha/admin)
- **EmailJS**: Sign up at [EmailJS](https://www.emailjs.com/)
- **Microsoft Clarity**: Sign up at [Microsoft Clarity](https://clarity.microsoft.com/)

## Image Optimization

To optimize images for better performance:

```bash
npm run optimize-images
```

This script will create optimized WebP and compressed versions of images in `src/images/optimized/`.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
