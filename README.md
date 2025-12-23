# 👣 FOOT AI - Final Output Optimization Tool

FOOT AI is a revolutionary web application that combines **8 major AI models** to produce the ultimate output. It generates responses from Claude, GPT-4, Gemini, Mistral, Cohere, Llama, and more, then uses a specialized FOOT AI editor to merge the best elements of all drafts into a single, publication-ready masterpiece.

## 🤖 Supported AI Models

FOOT AI integrates with **8 cutting-edge AI models**:

1. **Claude 3.5 Sonnet** (Anthropic) - Excellence in reasoning
2. **Claude Opus 4** (Anthropic) - Most powerful Claude model
3. **GPT-4 Turbo** (OpenAI) - Advanced language understanding
4. **GPT-4o** (OpenAI) - Latest OpenAI model
5. **Gemini Pro** (Google) - Multimodal capabilities
6. **Cohere Command** (Cohere) - Enterprise-grade NLP
7. **Mistral Large** (Mistral AI) - European AI excellence
8. **Llama 3 70B** (Meta) - Open-source powerhouse

## ✨ Features

- **Multi-AI Generation**: Simultaneously generates responses from up to 8 AI models in parallel
- **Intelligent Merging**: FOOT AI editor analyzes and combines the best ideas from all responses
- **Beautiful UI**: Modern, responsive design with color-coded drafts for each AI
- **Copy Functionality**: One-click copy of the final merged output
- **Real-time Processing**: Live progress updates as AIs respond
- **Flexible Configuration**: Works with any combination of API keys (minimum 1 required)

## 🚀 How It Works

1. **User Input**: Enter any prompt or question
2. **Parallel Generation**: All configured AI models generate independent responses simultaneously
3. **FOOT Editor**: A specialized Claude instance analyzes all drafts and produces a final, optimized output by:
   - Comparing responses from all AI models
   - Identifying the strongest structure and arguments
   - Selecting the best ideas, explanations, and wording
   - Resolving contradictions between models
   - Removing redundancies
   - Ensuring a single, consistent tone and voice
4. **Final Output**: Get the best possible answer combining strengths of all AI models

## 💻 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI SDKs**:
  - Anthropic SDK (Claude 3.5 Sonnet, Claude Opus)
  - OpenAI SDK (GPT-4, GPT-4o)
  - Google Generative AI (Gemini Pro)
  - Cohere AI (Command)
  - Mistral AI (Mistral Large)
  - Replicate (Llama 3 70B)

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

## Cloud Deployment

### Deploy to Vercel (Recommended)

The easiest way to deploy your FOOT AI app is using Vercel:

1. Push your code to GitHub
2. Visit [Vercel](https://vercel.com) and sign up
3. Click "New Project" and import your GitHub repository
4. Add environment variables (minimum 1 required):
   - `ANTHROPIC_API_KEY` (required for Claude)
   - `OPENAI_API_KEY` (required for GPT-4)
   - `GOOGLE_API_KEY` (optional for Gemini)
   - `COHERE_API_KEY` (optional for Cohere)
   - `MISTRAL_API_KEY` (optional for Mistral)
   - `REPLICATE_API_TOKEN` (optional for Llama)
5. Click "Deploy"

Your app will be live in 2-3 minutes with a URL like `https://foot-ai-xxx.vercel.app`

**📖 For detailed deployment instructions** including Netlify, Railway, AWS, and more, see [DEPLOYMENT.md](./DEPLOYMENT.md)

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

### Required (Minimum 1)

| Variable | Description | Get API Key |
|----------|-------------|-------------|
| `ANTHROPIC_API_KEY` | Anthropic API for Claude 3.5 Sonnet & Opus | [console.anthropic.com](https://console.anthropic.com/) |
| `OPENAI_API_KEY` | OpenAI API for GPT-4 & GPT-4o | [platform.openai.com](https://platform.openai.com/api-keys) |

### Optional (For More AI Models)

| Variable | Description | Get API Key | Free Tier? |
|----------|-------------|-------------|------------|
| `GOOGLE_API_KEY` | Google AI for Gemini Pro | [makersuite.google.com](https://makersuite.google.com/app/apikey) | ✅ Yes |
| `COHERE_API_KEY` | Cohere for Command model | [dashboard.cohere.com](https://dashboard.cohere.com/api-keys) | ✅ Yes |
| `MISTRAL_API_KEY` | Mistral AI for Mistral Large | [console.mistral.ai](https://console.mistral.ai/) | Limited |
| `REPLICATE_API_TOKEN` | Replicate for Llama 3 70B | [replicate.com](https://replicate.com/account/api-tokens) | Pay-per-use |

**💡 Recommended Setup:**
- **Minimum (Free)**: `ANTHROPIC_API_KEY` + `GOOGLE_API_KEY`
- **Best (All 8 AIs)**: All API keys above for maximum fusion power!

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues or questions, please open an issue on GitHub.

---

Built with ❤️ using Next.js and 8 AI models: Claude, GPT-4, Gemini, Mistral, Cohere, Llama & more!
