import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as crypto from 'node:crypto';

@Injectable()
export class CipherService {
  readonly #algorithm: string;
  readonly #secretKey: string;
  readonly #ivLength: number;

  constructor(private readonly configService: ConfigService) {
    this.#algorithm = 'aes-256-ctr';
    this.#secretKey =
      this.configService.get<string>('ENCRYPTION_SECRET') ||
      'default_secret_key_32chars';
    this.#ivLength = 16;
  }

  async hashInput(input: string): Promise<string> {
    return bcrypt.hash(input, 10);
  }

  async verifyHash(input: { hash: string; candidate: string }) {
    return bcrypt.compare(input.candidate, input.hash);
  }

  encrypt(data: string): string {
    const iv = crypto.randomBytes(this.#ivLength);
    const cipher = crypto.createCipheriv(
      this.#algorithm,
      Buffer.from(this.#secretKey),
      iv,
    );

    const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);

    return Buffer.concat([iv, encrypted]).toString('base64');
  }

  decrypt(encryptedData: string): string {
    const input = Buffer.from(encryptedData, 'base64');

    const iv = input.subarray(0, this.#ivLength);
    const encryptedText = input.subarray(this.#ivLength);

    const decipher = crypto.createDecipheriv(
      this.#algorithm,
      Buffer.from(this.#secretKey),
      iv,
    );

    return Buffer.concat([
      decipher.update(encryptedText),
      decipher.final(),
    ]).toString();
  }
}
