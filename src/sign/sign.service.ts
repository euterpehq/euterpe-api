import { Injectable } from '@nestjs/common';
import { Wallet } from 'ethers';
import * as dotenv from 'dotenv';

dotenv.config();
@Injectable()
export class SignService {
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
    listenerId: string,
  ): Promise<{ proof: string; isEligible: boolean }> {
    const privateKey = process.env.PRIVATE_KEY;

    if (!privateKey) {
      throw new Error('Private key is not configured');
    }

    const isEligible = this.isSongFullyListened(songDuration, listenedDuration);

    if (!isEligible) {
      return { proof: '', isEligible };
    }
    const proofPayload = {
      listenerId,
      songId,
      timestamp: Date.now(),
    };
    const message = JSON.stringify(proofPayload);

    const wallet = new Wallet(privateKey);
    const proof = await wallet.signMessage(message);

    return { proof, isEligible };
  }
}
