const apiHost = '/docker/v1/api';

export const environment = {
  production: false,
  env: 'docker',
  accountCreateEndpoint: `${apiHost}/account/new`,
  accountLoginEndpoint: `${apiHost}/account/login`,

  // ELK Stack
  elasticSearchEndpoint: ''

};
