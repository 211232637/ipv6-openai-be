import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAiDTO } from './dto/openai.dto'
import OpenAI from 'openai';

@Injectable()
export class OpenaiService {
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

  async explainResult(openAiDTO : OpenAiDTO): Promise<string> { 
    let messages;
    messages = [
      {
          role: "system", content: "You are a network engineer. Provide clear and direct explanations without any introductory phrases."
      },
      {
          role: "assistant", content: openAiDTO.currentAnswer
      },
      {
          role: "user", content: 'explain this: `' + openAiDTO.selectedText + '` in a very simple way. Please use newlines where necessary.'
      }
    ];

    const completion = await this.openai.chat.completions.create({
      model: "gpt-4o",
      temperature: 0,
      messages: messages,
    });

    return completion.choices[0].message.content;
  }

  async generateCompletion(openAiDTO : OpenAiDTO): Promise<string> {
    let messages;
    
    if (openAiDTO.type == 'tab-IPv4 to IPv6') {
      messages = [
        {
          role: "system", content: "You are a network engineer."
        },
        {
          role: "user", content: `
            Convert the following IPv4 configuration into a merged IPv4 and IPv6 configuration using a dual-stack strategy. Use the provided IPv6 block. Return only the converted configuration as a code block, without any explanatory text.
    
            IPv4 configuration:
            \`\`\`
            ${openAiDTO.ipv4}
            \`\`\`
    
            IPv6 block:
            \`\`\`
            ${openAiDTO.ipv6block}
            \`\`\`
          `
        }
      ];
    } else if (openAiDTO.type == 'tab-CLI to Ansible') {
      messages = [
        {
          role: "system", content: "You are a network engineer."
        },
        {
          role: "user", content: `
            Convert the following CLI configuration into an Ansible playbook. Assume that the device is either Cisco (switch, router, access point) or Debian (PC or server). Return only the converted configuration as a code block, without any explanatory text. Do not use Jinja2.
    
            CLI configuration:
            \`\`\`
            ${openAiDTO.ansible}
            \`\`\`
          `
        }
      ];
    }

    if (openAiDTO.specialRequest !== null) {
      messages.push({
        role: "user", content: openAiDTO.specialRequest
      });
    }

    const completion = await this.openai.chat.completions.create({
      model: "gpt-4o",
      temperature: 0,
      messages: messages,
    });

    return completion.choices[0].message.content.replace(/```/g, '').replace(/yaml\n/g, '');
  }
}