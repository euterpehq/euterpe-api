import { Body, Controller, Post } from '@nestjs/common';
import { SignService } from './sign.service';

@Controller('sign')
export class SignController {
  constructor(private readonly signService: SignService) {}

  @Post('/verify')
  async verifyAndsignRewardProof(
    @Body()
    body: {
      songId: string;
      songDuration: number;
      listenedDuration: number;
      listenerId: string;
    },
  ) {
    const { songId, songDuration, listenedDuration, listenerId } = body;
    return this.signService.verifyAndSignReward(
      songId,
      songDuration,
      listenedDuration,
      listenerId,
    );
  }
}
