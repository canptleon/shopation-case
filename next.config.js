// next.config.js

const webpack = require('webpack');
const withImages = require('next-images');
const routesData = require('./routes.json');

let hostConfig;

switch (process.env.APP_ENV) {
  case 'development':
    hostConfig = {
      SHOPATION_SITE: JSON.stringify('http://127.0.0.1:3001/'),
    };
    break;
  case 'production':
    hostConfig = {
      SHOPATION_SITE: JSON.stringify('http://127.0.0.1:3001/'),
    };
    break;
  default:
    throw new Error('Unknown environment');
}

hostConfig.APP_ENV = JSON.stringify(process.env.APP_ENV);
console.log({ hostConfig });

const routingConfig = [...routesData];

module.exports = withImages({
  async rewrites() {
    return routingConfig.map(({ source, destination }) => ({
      source,
      destination,
    }));
  },
  images: {
    domains: ['*'],
  },
  optimizeFonts: false,
  trailingSlash: true,
  onDemandEntries: {
    maxInactiveAge: 86400000,
    pagesBufferLength: 50,
  },
  webpack(config){
    config.plugins.push(new webpack.DefinePlugin(hostConfig));
    return config;
  }
});

const removeUndefined = obj => {
  let newObj = {};
  Object.keys(obj).forEach(key => {
    if (obj[key] === Object(obj[key])) newObj[key] = removeUndefined(obj[key]);
    else if (obj[key] !== undefined) newObj[key] = obj[key];
  });
  return newObj;
};

const next = require("next/dist/lib/is-serializable-props");
const isSerializableProps = next.isSerializableProps;
next.isSerializableProps = (page, method, input) =>
  isSerializableProps(page, method, removeUndefined(input));