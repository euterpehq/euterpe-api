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

  // message = 'Hello, Ethereum!';
  // signature =
  //   '0x020d671b80fbd20466d8cb65cef79a24e3bca3fdf82e9dd89d78e7a4c4c045bd72944c20bb1d839e76ee6bb69fed61f64376c37799598b40b8c49148f3cdd88a1b';

  async verifySignature(proofPayload: string, signature: string) {
    console.log('Message:', proofPayload); // Debugging line
    console.log('Signature:', signature); // Debugging line

    const signerAddress = verifyMessage(proofPayload, signature);
    return signerAddress;
  }
}
