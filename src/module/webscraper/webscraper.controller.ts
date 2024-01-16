import { Controller } from '@nestjs/common';
import { WebscraperService } from './webscraper.service';

@Controller()
export class WebscraperController {
  constructor(private readonly webscraperService: WebscraperService) {}
}
