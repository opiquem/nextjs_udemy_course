interface IConfig {
  JWT_SECRET: Uint8Array;
  JWT_SESSION: string;
}

class Config implements IConfig {
  JWT_SECRET: Uint8Array;
  JWT_SESSION: string;

  constructor() {
    this.JWT_SECRET = new TextEncoder().encode('some-random-string');
    this.JWT_SESSION = process.env.JWT_SECRET;
  }
}

export const config = new Config();
