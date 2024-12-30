const redis = require('redis');
const config = require('../../utils/config');

class CacheService {

  constructor(){
    this._client = redis.createClient({
      host: config.redis.host,
    }).on('error', (error)=>console.log(error));
    this._client.connect();
  }

  async set(key, value, expirationInSecond = 3600){
    try {
      await this._client.set(key, value, {
        EX: expirationInSecond,
      });
    } catch (error) {
      console.log(`error set cache :  ${error}`);
    }
  }

  async get(key){
    try {
      const cacheData = await this._client.get(key);
      return JSON.parse(cacheData);
    } catch (error) {
      console.log(`error cache :  ${error}`);
      return null;
    }
  }

  async delete(key){
    try {
      await this._client.del(key);
    } catch (error) {
      console.log(`error delete cache :  ${error}`);
    }
  }

}

module.exports = CacheService;