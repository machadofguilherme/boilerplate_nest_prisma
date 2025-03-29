import { Test, TestingModule } from '@nestjs/testing';
import { Files } from './files.service';

describe('Files', () => {
  let provider: Files;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Files],
    }).compile();

    provider = module.get<Files>(Files);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
