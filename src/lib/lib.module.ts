import { Global, Module } from '@nestjs/common';
import { CipherService } from '@/lib/services/crypto.service';
import { HttpService } from '@/lib/services/http.service';

@Global()
@Module({
  providers: [CipherService, HttpService],
  exports: [CipherService, HttpService],
})
export class LibModule {}
