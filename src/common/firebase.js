require("dotenv").config();

const {
  TYPE,
  PROJECT_ID,
  PRIVATE_KEY_ID,
  PRIVATE_KEY,
  CLIENT_EMAIL,
  CLIENT_ID,
  AUTH_URL,
  TOKEN_URL,
  AUTH_PROVIDER,
  CLIENT_X509_CERT,
  UNIVERSE_DOMAIN,
} = process.env;

const firebaseConfig = {
  type: TYPE,
  project_id: PROJECT_ID,
  private_key_id: PRIVATE_KEY_ID,
  private_key: PRIVATE_KEY.replace(/\\n/g, "\n"),
  client_email: CLIENT_EMAIL,
  client_id: CLIENT_ID,
  auth_uri: AUTH_URL,
  token_uri: TOKEN_URL,
  auth_provider_x509_cert_url: AUTH_PROVIDER,
  client_x509_cert_url: CLIENT_X509_CERT,
  universe_domain: UNIVERSE_DOMAIN,
};

module.exports = firebaseConfig;
