# Token Swap Interface - Fun.xyz

A production-grade React application built with Next.js that allows users to explore potential token swaps by calculating equivalent amounts.

## 🚀 Features

- **Real-time Token Pricing**: Fetch live prices using the Funkit API
- **USD-based Calculations**: Enter USD amounts and see equivalent token values
- **Responsive Design**: Mobile-first design with Fun.xyz branding
- **Production Ready**: Built with TypeScript, comprehensive error handling, and best practices

## 🛠 Tech Stack

- **Framework**: Next.js 15+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **API**: @funkit/api-base
- **State Management**: React Hooks (Custom hook pattern)
- **Build Tool**: Turbopack

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd fun-token
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Add your Funkit API key to `.env.local`:
```
NEXT_PUBLIC_FUNKIT_API_KEY=your_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Configuration

### API Configuration
The application uses the Funkit API for token data. The default API key is included for demo purposes, but you can override it using environment variables.

### Supported Tokens
Currently supports:
- **USDC** (Ethereum - Chain ID: 1)
- **USDT** (Polygon - Chain ID: 137)
- **ETH** (Base - Chain ID: 8453)
- **WBTC** (Ethereum - Chain ID: 1)

### Chain IDs
- **1**: Ethereum Mainnet
- **137**: Polygon
- **8453**: Base

## 🏗 Architecture

### Project Structure
```
src/
├── app/                    # Next.js app router
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── SwapInterface.tsx # Main swap interface
│   └── TokenSelect.tsx   # Token selection components
├── hooks/                # Custom React hooks
├── services/             # API service layer
├── types/                # TypeScript type definitions
├── utils/                # Utility functions
└── constants/            # Configuration constants
```

### Key Components

#### API Service Layer (`src/services/api.ts`)
- Handles all API communications with Funkit
- Implements retry logic and error handling
- Includes response caching for performance
- Provides type-safe interfaces

#### Custom Hooks (`src/hooks/useTokenSwap.ts`)
- Manages swap state and logic
- Implements debounced calculations
- Handles loading states and errors
- Provides clean API for components

#### UI Components (`src/components/ui/`)
- Reusable, accessible components
- Consistent styling and behavior
- TypeScript interfaces for props
- Production-ready with proper error handling

## 🎯 Key Assumptions & Decisions

### Technical Decisions
1. **Client-side API calls**: All API calls are made from the client for simplicity
2. **No real swapping**: This is a calculator/explorer tool, not an actual swap interface
3. **Static token list**: Uses a predefined list of supported tokens
4. **USD-centric**: All calculations are based on USD input amounts

### UX Decisions
1. **Auto-calculation**: Swap amounts are calculated automatically as users type
2. **Debounced input**: API calls are debounced to prevent excessive requests
3. **Error boundaries**: Comprehensive error handling with user-friendly messages
4. **Loading states**: Clear loading indicators for better UX

### Security Considerations
1. **Input validation**: All user inputs are validated and sanitized
2. **API key handling**: API keys are handled securely via environment variables
3. **Error handling**: Sensitive error details are not exposed to users

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm run start
```

### Environment Variables
Required for production:
- `NEXT_PUBLIC_FUNKIT_API_KEY`: Your Funkit API key

### Deployment Platforms
Optimized for deployment on:
- Vercel (recommended)
- Netlify
- Docker containers
- Static hosting

## 📊 Performance Optimizations

1. **API Response Caching**: 30-second cache for API responses
2. **Debounced Input**: 300ms debounce for user input
3. **Code Splitting**: Automatic code splitting with Next.js
4. **Image Optimization**: Next.js Image component for optimal loading
5. **Bundle Analysis**: Built-in bundle analyzer for optimization

## 🔒 Error Handling

### API Errors
- Network timeouts and retries
- Rate limiting handling
- Graceful degradation
- User-friendly error messages

### Input Validation
- Real-time validation feedback
- Sanitized numeric inputs
- Range validation for USD amounts
- Token selection validation

## 🎨 Design System

### Color Palette
- Primary: Indigo (`#6366f1`)
- Secondary: Purple (`#8b5cf6`)
- Accent: Amber (`#f59e0b`)
- Success: Emerald (`#10b981`)
- Error: Red (`#ef4444`)

### Typography
- Font: System fonts with fallbacks
- Hierarchy: Clear heading and body text sizing
- Readability: Optimized line height and spacing

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px)
- Touch-friendly interface
- Accessible navigation

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 📈 Future Enhancements

1. **Additional Networks**: Support for more blockchain networks
2. **More Tokens**: Expanded token support
3. **Price Charts**: Historical price data visualization
4. **Favorites**: Save favorite token pairs
5. **Portfolio**: Track multiple swaps
6. **Real Swapping**: Integration with actual swap protocols

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request


## 🙏 Acknowledgments

- Funkit API for providing token data
