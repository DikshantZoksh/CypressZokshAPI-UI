const credentials = {
  testnet: {
    app_url: 'https://app.testnet.zoksh.com/',
    username: 'dikshant.agarwal@moopay.live',
    password: 'test@123',
  },
  development: {
    app_url: 'https://app.moopay.local/',
    username: 'dikshant.agarwal@moopay.live',
    password: 'test@123',
  },
};

module.exports = credentials['testnet'];
