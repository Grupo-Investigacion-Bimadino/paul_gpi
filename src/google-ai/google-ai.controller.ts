import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { GoogleAiService } from './google-ai.service';

@ApiTags('Google AI')
@Controller('google-ai')
export class GoogleAiController {
  constructor(private readonly googleAiService: GoogleAiService) {}

  @Post('resumir')
  @ApiOperation({ summary: 'Resumir un documento PDF' })
  @ApiBody({ description: 'Ruta al archivo PDF', type: String, required: true })
  @ApiResponse({ status: 201, description: 'El resumen del documento.' })
  async summarizeDocument(@Body('filePath') filePath: string) {
    const summary = await this.googleAiService.summarizeDocument(filePath);
    return { summary };
  }

  @Get('generar-texto/:text')
  @ApiOperation({ summary: 'Generar texto basado en un prompt' })
  @ApiParam({
    name: 'text',
    description: 'El texto de entrada para generar contenido',
    type: String,
  })
  @ApiResponse({ status: 200, description: 'El texto generado.' })
  async generateText(@Param('text') text: string): Promise<string> {
    return this.googleAiService.generateText(text);
  }
}
