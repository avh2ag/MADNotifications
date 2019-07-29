export const environment = {
  production: true,
  oktaUrl: 'https://dev-818614.okta.com',
  oktaConfig: {
    issuer: 'https://{yourOktaDomain}.com/oauth2/default',
    clientId: '{clientId}',
    redirectUri: 'http://localhost:{port}/implicit/callback'
  }
};
