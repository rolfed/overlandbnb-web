const apiPort = 8080;
const apiHost = 'localhost';
const apiVersion = 'v1/api';

export const environment = {
  production: true,
  env: 'prod',
  accountCreateEndpoint: `${apiHost}:${apiPort}/${apiVersion}/account/new`,
  accountLoginEndpoint: `${apiHost}:${apiPort}/${apiVersion}/account/login`,

  // ELK Stack
  elasticSearchEndpoint: ''
};


