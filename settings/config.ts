const got = require('got')

let configs: Object = {};

module.exports.init = async (url: any) => {
  const data:Object | null = await got.get(url).json();
  
  if(data)  
    configs = data;
};

module.exports.getData = () => {
  return configs;
}
