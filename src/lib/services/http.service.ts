import { Injectable } from '@nestjs/common';

@Injectable()
export class HttpService {
  public async post(url: string, body: Record<string, any>): Promise<any> {
    const headers = {
      'Content-Type': 'application/json',
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`HTTP error ${response.status}: ${error}`);
      }

      return await response.json();
    } catch (error) {
      throw new Error(`Error making POST request: ${error.message}`);
    }
  }
}
