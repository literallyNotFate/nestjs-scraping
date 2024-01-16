import { Module } from '@nestjs/common';
import { WebscraperService } from './webscraper.service';
import { WebscraperController } from './webscraper.controller';

@Module({
  controllers: [WebscraperController],
  providers: [WebscraperService],
})
export class WebscraperModule {}
