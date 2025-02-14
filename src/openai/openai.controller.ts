// In your controller
import { Body, Controller, Post } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { OpenAiDTO } from './dto/openai.dto'

@Controller('api')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Post('generate')
  async getGeneratedText(@Body() openAiDTO : OpenAiDTO) {
    return await this.openaiService.generateCompletion(openAiDTO);
  }

  @Post('explanation')
  async getExplanation(@Body() openAiDTO : OpenAiDTO) {
    return await this.openaiService.explainResult(openAiDTO);
  }
}