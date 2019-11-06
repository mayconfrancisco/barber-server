import Redis from 'ioredis';

class Cache {
  constructor() {
    this.redis = new Redis({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      keyPrefix: 'cache:',
    });
  }

  // async/await nao eh preciso quando da um return direto
  // EX - expire in - valor em segundos
  set(key, value) {
    return this.redis.set(key, JSON.stringify(value), 'EX', 60 * 60 * 24);
  }

  async get(key) {
    const cached = await this.redis.get(key);

    return cached ? JSON.parse(cached) : null;
  }

  invalidate(key) {
    return this.redis.del(key);
  }

  /**
   * Invalida passando um prefixo
   * Ex: user:2:page4
   */
  async invalidatePrefix(prefix) {
    // adicionei o cache: por conta de um problema no ioredis - nao considera o keyPrefix no .keys #1
    const keys = await this.redis.keys(`cache:${prefix}:*`);

    const keysWithoutPrefix = keys.map(key => key.replace('cache:', ''));

    // #1 mas considera o prefix no .del
    return this.redis.del(keysWithoutPrefix);
  }
}

export default new Cache();
