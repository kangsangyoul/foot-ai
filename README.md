# 👣 FOOT AI - Final Output Optimization Tool

FOOT AI is a web application that demonstrates the power of combining multiple AI models to produce superior output. It generates responses from both Claude (Anthropic) and GPT-4 (OpenAI), then uses a specialized FOOT AI editor to merge the best elements of both drafts into a single, publication-ready result.

## Features

- **Multi-AI Generation**: Simultaneously generates responses from Claude 3.5 Sonnet and GPT-4
- **Intelligent Merging**: Uses FOOT AI editor to combine the best ideas, structure, and wording from both drafts
- **Clean UI**: Minimal, responsive design with clear visual distinction between drafts
- **Copy Functionality**: Easy one-click copy of the final merged output
- **Real-time Processing**: Shows loading states and provides immediate feedback

## How It Works

1. **User Input**: Enter any prompt or question
2. **Parallel Generation**: Both Claude and GPT-4 generate independent responses
3. **FOOT Editor**: A specialized Claude instance analyzes both drafts and produces a final, optimized output by:
   - Identifying the strongest structure
   - Selecting the best ideas and explanations
   - Resolving contradictions
   - Removing redundancies
   - Ensuring consistent tone and voice

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI APIs**:
  - Anthropic SDK (Claude)
  - OpenAI SDK (GPT-4)

## Project Structure

```
foot-ai-web/
├── src/
│   ├── app/
│   │   ├── page.tsx           # Main demo page
│   │   ├── layout.tsx          # Root layout with CSS
│   │   ├── globals.css         # Global styles
│   │   └── api/
│   │       ├── writers/
│   │       │   └── route.ts    # Multi-AI generation endpoint
│   │       └── editor/
│   │           └── route.ts    # FOOT editor endpoint
│   ├── components/
│   │   ├── PromptInput.tsx     # Input component
│   │   ├── DraftDisplay.tsx    # Draft display component
│   │   └── FinalOutput.tsx     # Final output component
│   └── lib/
│       ├── footEditor.ts       # FOOT AI core logic
│       └── writers.ts          # AI callers (Claude & GPT-4)
├── .env.local.example          # Environment variables template
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- Anthropic API key ([Get one here](https://console.anthropic.com/))
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

### Installation

1. **Clone the repository** (if not already in the directory):
   ```bash
   cd foot-ai-web
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.local.example .env.local
   ```

   Edit `.env.local` and add your API keys:
   ```
   ANTHROPIC_API_KEY=your_anthropic_api_key_here
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

1. Enter your prompt in the textarea
2. Click "Generate Drafts"
3. Wait for both AI models to generate their responses
4. View the final merged output from FOOT AI
5. Use the Copy button to copy the final result

## API Endpoints

### POST /api/writers
Generates drafts from both Claude and GPT-4.

**Request:**
```json
{
  "prompt": "Explain quantum computing in simple terms"
}
```

**Response:**
```json
{
  "draftA": "Claude's response...",
  "draftB": "GPT-4's response..."
}
```

### POST /api/editor
Merges multiple drafts using FOOT AI.

**Request:**
```json
{
  "drafts": ["draft1", "draft2"],
  "instruction": "Optional custom instruction"
}
```

**Response:**
```json
{
  "final": "Merged output..."
}
```

## FOOT AI System Prompt

The FOOT AI editor uses a specialized system prompt that:
- Does NOT generate content from scratch
- Receives multiple drafts from different AIs
- Compares and identifies the strongest elements
- Produces a single, publication-ready output
- Never mentions the editing process or other drafts

## Development

### Build for production:
```bash
npm run build
```

### Start production server:
```bash
npm start
```

### Lint code:
```bash
npm run lint
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `ANTHROPIC_API_KEY` | Your Anthropic API key for Claude | Yes |
| `OPENAI_API_KEY` | Your OpenAI API key for GPT-4 | Yes |

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues or questions, please open an issue on GitHub.

---

Built with ❤️ using Next.js, Claude, and GPT-4
