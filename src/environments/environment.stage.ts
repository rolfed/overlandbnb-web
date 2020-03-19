const apiHost = 'staging-server-url'; // TODO need to add

export const environment = {
  production: false,
  env: 'docker',
  accountCreateEndpoint: `${apiHost}/account/new`,
  accountLoginEndpoint: `${apiHost}/account/login`,

  // ELK Stack
  elasticSearchEndpoint: ''

};
