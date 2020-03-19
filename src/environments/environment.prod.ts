const apiHost = '/docker/v1/api';

export const environment = {
  productitionon: true,
  env: 'prod',
  accountCreateEndpoint: `${apiHost}/account/new`,
  accountLoginEndpoint: `${apiHost}/account/login`,

  user: `${apiHost}/user`,
};



