import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Wallet, verifyMessage } from 'ethers';

import { ConfigService } from '@nestjs/config';
import { BaseService } from '@/common/service/base.service';

@Injectable()
export class SignService extends BaseService {
  constructor(private configService: ConfigService) {
    super();
  }

  private isSongFullyListened(
    songDuration: number,
    listenedDuration: number,
  ): boolean {
    const listeningThreshold = 0.9;
    return listenedDuration >= songDuration * listeningThreshold;
  }
  async verifyAndSignReward(
    songId: string,
    songDuration: number,
    listenedDuration: number,
  ): Promise<{ signature: string; isEligible: boolean }> {
    const privateKey = this.configService.get<string>('PRIVATE_KEY');

    if (!privateKey) {
      throw new InternalServerErrorException('Private key is not configured');
    }

    const isEligible = this.isSongFullyListened(songDuration, listenedDuration);

    if (!isEligible) {
      return { signature: '', isEligible };
    }

    const message = this.configService.get<string>('SIGNING_MESSAGE') || '';

    const wallet = new Wallet(privateKey);
    const signature = await wallet.signMessage(message);

    return { signature, isEligible };
  }

  async verifySignature(proofPayload: string, signature: string) {
    this.logger.debug('Message:', proofPayload); // Debugging line
    this.logger.debug('Signature:', signature); // Debugging line

    const signerAddress = verifyMessage(proofPayload, signature);
    return signerAddress;
  }
}
