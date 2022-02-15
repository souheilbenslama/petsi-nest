import { Test, TestingModule } from '@nestjs/testing';
import { BathService } from './bath.service';

describe('BathService', () => {
  let service: BathService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BathService],
    }).compile();

    service = module.get<BathService>(BathService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
