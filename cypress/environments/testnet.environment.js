const baseurl = 'https://payments.testnet.zoksh.com';
const custAPIurl = 'https://api.testnet.zoksh.com'
const bearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzNlZGY2NmExYzI3MDQzNDk4Y2EzOTQiLCJuYW1lIjoiRGlrc2hhbnQgQWdhcndhbCIsImVtYWlsIjoiZGlrc2hhbnQuYWdhcndhbEBtb29wYXkubGl2ZSIsInZhbGlkVGlsbCI6MTY2NjAxOTE4NjcxMSwiaWF0IjoxNjY2MDE1NTg2fQ.qohciHVzC41sP7AheYH7cfZghBq-5eoxyOXSfgKcmJY'

const apiAuth = {
  key: '627b4a2836b59026e4d5cd6c',
  secret: 'sk_test_EM+cYhQ50tBO31PAVEifGw=='
}

const versions = {
  versionTwo: 'v1',
  versionOne: 'v2'
}

module.exports = {
  baseurl,
  apiAuth,
  versions,
  custAPIurl,
  bearerToken
}