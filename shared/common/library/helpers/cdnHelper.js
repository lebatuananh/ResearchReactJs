const devBaseUrl = 'http://localhost:60000';
const stagingBaseUrl = 'http://cdn.efex.asia';
const prodBaseUrl = 'http://cdn.efex.asia';

// prettier-ignore
const baseUrl = process.env.REACT_APP_ENV === 'production'
  ? prodBaseUrl
  : process.env.REACT_APP_ENV === 'staging'
    ? stagingBaseUrl
    : devBaseUrl;

const cdnHelper = {
  baseUrl: baseUrl,
  flagUrl: `${baseUrl}/global/images/flags/`,
};

export default cdnHelper;
