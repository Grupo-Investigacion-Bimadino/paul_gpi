import { Injectable } from '@nestjs/common';
import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleAIFileManager } from '@google/generative-ai/server';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleAiService {
  private genAI: GoogleGenerativeAI;
  private fileManager: GoogleAIFileManager;
  private model: GenerativeModel;

  constructor(private configService: ConfigService) {
    // Cargar configuracion
    // Inicializa GoogleGenerativeAI y GoogleAIFileManager con tu API_KEY
    this.genAI = new GoogleGenerativeAI(
      this.configService.get<string>('API_KEY'),
    );
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    this.fileManager = new GoogleAIFileManager(
      this.configService.get<string>('API_KEY'),
    );
  }

  async summarizeDocument(filePath: string): Promise<string> {
    const model = this.genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
    });

    const uploadResponse = await this.fileManager.uploadFile(filePath, {
      mimeType: 'application/pdf',
      displayName: 'Gemini 1.5 PDF',
    });

    const result = await model.generateContent([
      {
        fileData: {
          mimeType: uploadResponse.file.mimeType,
          fileUri: uploadResponse.file.uri,
        },
      },
      { text: 'Can you summarize this document as a bulleted list?' },
    ]);

    return result.response.text();
  }

  async generateText(prompt: string): Promise<string> {
    const result = await this.model.generateContent(prompt);
    return result.response.text();
  }
}
