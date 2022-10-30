const custAPIurl = 'https://api.testnet.zoksh.com';
const custAPIep = '/api/v1/customers';
const bearerToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzNlZGY2NmExYzI3MDQzNDk4Y2EzOTQiLCJuYW1lIjoiRGlrc2hhbnQgQWdhcndhbCIsImVtYWlsIjoiZGlrc2hhbnQuYWdhcndhbEBtb29wYXkubGl2ZSIsInZhbGlkVGlsbCI6MTY2NzExMTE5OTQ3NywiaWF0IjoxNjY3MTA3NTk5fQ.dkKkLZD9xFyFZ2kXR9ST2HQ8U3rpZJWrP89OA9mEZlM';

const apiAuth = {
  key: '633edf66a1c27043498ca394',
  secret: 'sk_test_AM+dYhQ50tBO31PUEifGw==',
};

const versions = {
  versionTwo: 'v1',
  versionOne: 'v2',
};

module.exports = {
  apiAuth,
  versions,
  custAPIurl,
  bearerToken,
  custAPIep,
};
