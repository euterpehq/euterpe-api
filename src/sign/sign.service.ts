import { Injectable } from '@nestjs/common';
import { Wallet, verifyMessage } from 'ethers';
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
  ): Promise<{ signature: string; isEligible: boolean }> {
    const privateKey = process.env.PRIVATE_KEY;

    if (!privateKey) {
      throw new Error('Private key is not configured');
    }

    const isEligible = this.isSongFullyListened(songDuration, listenedDuration);

    if (!isEligible) {
      return { signature: '', isEligible };
    }

    const message = 'WE ARE ALL GONNA MAKE IT';

    const wallet = new Wallet(privateKey);
    const signature = await wallet.signMessage(message);

    return { signature, isEligible };
  }

  async verifySignature(proofPayload: string, signature: string) {
    console.log('Message:', proofPayload); // Debugging line
    console.log('Signature:', signature); // Debugging line

    const signerAddress = verifyMessage(proofPayload, signature);
    return signerAddress;
  }
}
