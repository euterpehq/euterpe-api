import { Public } from '@/auth/decorators/public.decorator';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SignService } from './sign.service';

@Controller('sign')
export class SignController {
  constructor(private readonly signService: SignService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/generate')
  async generateRewardProof(
    @Body()
    body: {
      songId: string;
      songDuration: number;
      listenedDuration: number;
      listenerId: string;
    },
  ): Promise<{ signature: string; isEligible: boolean }> {
    const { songId, songDuration, listenedDuration } = body;
    return this.signService.verifyAndSignReward(
      songId,
      songDuration,
      listenedDuration,
    );
  }

  @Public()
  @Post('/verify')
  async verifySignature(
    @Body() input: { message: string; signature: string },
  ): Promise<string> {
    return this.signService.verifySignature(input.message, input.signature);
  }
}
