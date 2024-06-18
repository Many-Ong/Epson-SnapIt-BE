import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PrintMode } from 'libs/types/epson';
import * as qs from 'qs';

@Injectable()
export class EpsonService {
  private axiosInstance: AxiosInstance;

  constructor() {
    const HOST = process.env.EPSON_HOST;
    this.axiosInstance = axios.create({ baseURL: `https://${HOST}` });
  }

  async authentication(refreshToken?: string) {
    const AUTH_URI = `/api/1/printing/oauth2/auth/token?subject=printer`;
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
      throw new Error('Authentication failed');
    }
  }

  async getDevicePrintCapabilities(accessToken: string, printMode: PrintMode) {
    const DEVICE_ID = process.env.EPSON_DEVICE;
    const URL = `/api/1/printing/printers/${DEVICE_ID}/capability/${printMode}`;

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json;charset=utf-8',
    };

    try {
      const response = await this.axiosInstance.get(URL, { headers });

      console.log(response.data);
    } catch (error) {
      if (error.response) {
        console.error(`Error: ${error.response.status}: ${error.response.statusText}`);
      } else {
        console.error(`Error: ${error.message}`);
      }
      throw new Error('Failed to fetch device print capabilities');
    }
  }
}
