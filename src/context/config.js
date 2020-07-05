const launchAPI_URL = 'https://launchlibrary.net/1.4/';

// Endpoints
const rocketsEndpoint = `${launchAPI_URL}rocket/`;
const familyRocketsEndpoint = `${launchAPI_URL}rocketfamily/`;
const launchStatusEndpoint = `${launchAPI_URL}launchstatus/`;
const nextLaunchesEndpoint = `${launchAPI_URL}launch/next/`;
const agenciesEndpoint = `${launchAPI_URL}agency/`;

// Store keys
const keysStore = {
  families: 'rocketFamilies',
  rockets: 'rockets',
  status: 'launchStatus',
};

export {
  rocketsEndpoint,
  familyRocketsEndpoint,
  launchStatusEndpoint,
  nextLaunchesEndpoint,
  agenciesEndpoint,
  keysStore,
};
