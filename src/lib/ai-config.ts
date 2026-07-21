/**
 * AI Model Configuration & System Prompt Module
 * 
 * This module isolates all LLM model parameters, system prompts, 
 * and streaming configurations for the portfolio qualification assistant.
 */

export interface SystemConfig {
  model: string;
  temperature: number;
  maxTokens: number;
  systemPrompt: string;
}

export const DEFAULT_AI_CONFIG: SystemConfig = {
  model: 'claude-3-5-sonnet-20241022',
  temperature: 0.7,
  maxTokens: 1024,
  systemPrompt: `You are Akshith Reddy's AI Portfolio & Technical Qualification Assistant.
Your goal is to answer technical questions from Senior Tech Leads, recruiters, and hiring managers about Akshith's software engineering background.

Akshith's Core Claim:
"I engineer production-grade, WCAG 2.1 AA compliant React and Next.js components backed by automated Vitest test suites."

Tone & Style Guidelines:
- Direct, technical, plainspoken, pragmatic, zero buzzwords, evidence-first.
- Keep answers concise and focused on verified engineering proof (React 19, Next.js App Router, TypeScript, Vitest, a11y focus traps).
- If asked to schedule an interview, direct the user to Akshith's 15-minute Calendly link.`,
};

/**
 * Creates a simulated Server-Sent Event (SSE) ReadableStream for local testing 
 * when ANTHROPIC_API_KEY is not set in environment variables.
 */
export function createMockStreamResponse(_promptMessage: string): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  
  const mockResponses: Record<string, string> = {
    default: `I am Akshith Reddy's AI Qualification Assistant. Akshith builds production-grade, WCAG 2.1 AA compliant React and Next.js applications backed by automated Vitest test suites. 

His flagship work includes:
1. **Production React Settings Form**: Features client regex validation, dynamic \`aria-invalid\` and \`aria-describedby\` error bindings, submit loading locks (\`disabled={isLoading}\`), and an 8-test Vitest suite executing in 280ms.
2. **Custom ARIA Focus Trap System**: Engineered keyboard focus traps (\`Tab\`/\`Shift+Tab\` loop, \`Escape\` key close) with comparative audits against \`@base-ui/react\` primitives.
3. **Automated Pre-Commit Pipeline**: Established \`oxlint\` static analysis running in under 2 seconds.

Would you like to schedule a 15-minute technical code review interview with Akshith?`,
  };

  const textToStream = mockResponses.default;
  const words = textToStream.split(' ');

  return new ReadableStream({
    async start(controller) {
      // Simulate initial thinking delay (500ms) for smooth handoff transition
      await new Promise((resolve) => setTimeout(resolve, 500));

      for (const word of words) {
        // Format as SSE data chunk
        const chunk = `data: ${JSON.stringify({ text: word + ' ' })}\n\n`;
        controller.enqueue(encoder.encode(chunk));
        // Token streaming delay (40ms per word chunk)
        await new Promise((resolve) => setTimeout(resolve, 40));
      }

      controller.enqueue(encoder.encode('data: [DONE]\n\n'));
      controller.close();
    },
  });
}
