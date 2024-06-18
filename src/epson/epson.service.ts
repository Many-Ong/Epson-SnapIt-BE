import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import * as qs from 'qs';

@Injectable()
export class EpsonService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({});
  }

  async authentication(refreshToken?: string) {
    const HOST = process.env.EPSON_HOST;
    const AUTH_URI = `https://${HOST}/api/1/printing/oauth2/auth/token?subject=printer`;
    const CLIENT_ID = process.env.EPSON_CLIENT_ID;
    const SECRET = process.env.EPSON_SECRET;
    const DEVICE = process.env.EPSON_DEVICE;

    const query_param = !refreshToken
      ? {
          grant_type: 'password',
          username: DEVICE,
          password: '',
        }
      : {
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
        };

    const auth = Buffer.from(`${CLIENT_ID}:${SECRET}`).toString('base64');

    const headers = {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    };

    try {
      const response = await this.axiosInstance.post(AUTH_URI, qs.stringify(query_param), { headers });
      console.log('1. Authentication: --------------------------------------');
      console.log(qs.stringify(query_param));
      console.log(response.data);

      return response.data;
    } catch (error) {
      if (error.response) {
        console.error(`Error: ${error.response.status}: ${error.response.statusText}`);
      } else {
        console.error(`Error: ${error.message}`);
      }
      process.exit(1); // Consider handling this more gracefully in a real application
    }
  }
}
