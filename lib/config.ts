interface IConfig {
  JWT_SECRET: Uint8Array;
  JWT_SESSION: string;
  JWT_DURATION: number;
  EXPIRATION_DATE: Date;
}

class Config implements IConfig {
  JWT_SECRET: Uint8Array;
  JWT_SESSION: string;
  JWT_DURATION: number;
  EXPIRATION_DATE: Date;

  constructor() {
    this.JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
    this.JWT_SESSION = 'token';
    this.JWT_DURATION = +process.env.JWT_DURATION;
    this.EXPIRATION_DATE = new Date(Date.now() + this.JWT_DURATION);
  }
}

export const config = new Config();
