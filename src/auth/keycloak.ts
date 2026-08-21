import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'https://auth.binaryguard.ca',
  realm: 'binaryguard',
  clientId: 'binaryguard-website',
});

export default keycloak;