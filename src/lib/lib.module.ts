import { Global, Module } from '@nestjs/common';
import { CipherService } from '@/lib/services/crypto.service';

@Global()
@Module({
  providers: [CipherService],
  exports: [CipherService],
})
export class LibModule {}
