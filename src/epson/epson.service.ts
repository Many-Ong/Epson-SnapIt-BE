import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PrintMode } from 'libs/types/epson';
import * as qs from 'qs';
import * as fs from 'fs';
import * as path from 'path';

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

  async getDevicePrintCapabilities(accessToken: string, subjectId: string, printMode: PrintMode) {
    const URL = `/api/1/printing/printers/${subjectId}/capability/${printMode}`;

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json;charset=utf-8',
    };

    try {
      const response = await this.axiosInstance.get(URL, { headers });
      console.log('Get Device Print Capabilities: --------------------------------------');
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error(`Error: ${error.response.status}: ${error.response.statusText}`);
      } else {
        console.error(`Error: ${error.message}`);
      }
      throw new Error('Failed to fetch device print capabilities');
    }
  }

  async printSetting(accessToken: string, subjectId: string, jobName = 'SampleJob1', printMode = 'document') {
    const JOB_URI = `/api/1/printing/printers/${subjectId}/jobs`;

    const data_param = {
      job_name: jobName,
      print_mode: printMode,
    };

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json;charset=utf-8',
    };

    try {
      const response = await this.axiosInstance.post(JOB_URI, data_param, { headers });
      console.log('2. Create print job: --------------------------------------');
      console.log(response.data);

      return response.data;
    } catch (error) {
      if (error.response) {
        console.error(`Error: ${error.response.status}: ${error.response.statusText}`);
        console.error(`Error data: ${error.response.data}`);
      } else {
        console.error(`Error: ${error.message}`);
      }
      throw new Error('Failed to create print job'); // Improved error handling
    }
  }

  async uploadPrintFile(uploadUri: string, file: Express.Multer.File) {
    const ext = path.extname(file.originalname);
    const fileName = `1${ext}`;
    const uploadUrl = `${uploadUri}&File=${fileName}`;

    const headers = {
      'Content-Length': file.size.toString(),
      'Content-Type': 'application/octet-stream',
    };

    console.log('Uploading to:', uploadUrl);
    console.log('File details:', {
      originalname: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
    });

    try {
      const response = await this.axiosInstance.post(uploadUrl, file.buffer, { headers });
      console.log('3. Upload print file: --------------------------------------');
      console.log(response.data);

      return response.data;
    } catch (error) {
      if (error.response) {
        console.error(`Error: ${error.response.status}: ${error.response.statusText}`);
        console.error(`Error data: ${error.response.data}`);
      } else {
        console.error(`Error: ${error.message}`);
      }
      throw new Error('Failed to upload print file');
    }
  }
}
