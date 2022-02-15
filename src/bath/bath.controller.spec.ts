import { Test, TestingModule } from '@nestjs/testing';
import { BathController } from './bath.controller';

describe('BathController', () => {
  let controller: BathController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BathController],
    }).compile();

    controller = module.get<BathController>(BathController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
