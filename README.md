# ExpenseTrackr App

A modern, secure, and user-friendly expense tracking application built with React Native and Expo.

## 🚀 Features

- **Secure Authentication**: Login and registration with strong password requirements
- **Cross-Platform**: Works on iOS, Android, and Web
- **Modern UI**: Beautiful, accessible interface with dark/light mode support
- **Type-Safe**: Built with TypeScript for reliability and developer experience
- **Responsive Design**: Optimized for all screen sizes and orientations

## 📱 Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **State Management**: React Query + Context API
- **Navigation**: Expo Router
- **Forms**: TanStack React Form with Zod validation
- **Storage**: Expo Secure Store
- **Animation**: Moti + React Native Reanimated

## 🛠 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **pnpm** (v8 or higher)
- **Expo CLI** (`npm install -g @expo/cli`)
- **Git**

For mobile development:
- **iOS**: Xcode (macOS only)
- **Android**: Android Studio

## ⚡ Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/expensetrackr/expensetrackr-app.git
   cd expensetrackr-app
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start the development server**
   ```bash
   pnpm start
   ```

4. **Run on your platform**
   - **iOS Simulator**: `pnpm ios`
   - **Android Emulator**: `pnpm android`
   - **Web Browser**: `pnpm web`

## 📋 Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm start` | Start the Expo development server |
| `pnpm ios` | Run on iOS simulator |
| `pnpm android` | Run on Android emulator |
| `pnpm web` | Run in web browser |
| `pnpm lint` | Run ESLint |
| `pnpm lint:fix` | Fix ESLint issues automatically |
| `pnpm type-check` | Run TypeScript type checking |
| `pnpm format` | Format code with Prettier |
| `pnpm format:check` | Check code formatting |
| `pnpm clean` | Clean dependencies and cache |
| `pnpm build:android` | Build Android app with EAS |
| `pnpm build:ios` | Build iOS app with EAS |
| `pnpm preview` | Build preview version |

## 🏗 Project Structure

```
expensetrackr-app/
├── app/                    # App routes (Expo Router)
│   ├── (authenticated)/   # Protected routes
│   ├── (guest)/          # Public routes
│   └── _layout.tsx       # Root layout
├── components/            # Reusable components
│   └── ui/               # UI component library
├── hooks/                # Custom React hooks
├── lib/                  # Third-party library configurations
├── providers/            # React context providers
├── schemas/              # Zod validation schemas
├── theme/                # Design system and theming
├── utils/                # Utility functions
└── assets/               # Static assets (images, fonts)
```

## 🔧 Development Guidelines

### Code Style

- **TypeScript**: Use strict mode with comprehensive type checking
- **ESLint**: Follow the configured rules for consistent code style
- **Prettier**: Auto-format code on save
- **Naming**: Use descriptive names with auxiliary verbs (e.g., `isLoading`, `hasError`)

### Component Structure

```typescript
// Component structure template
import { ComponentProps } from 'react';
import { View } from 'react-native';

interface ComponentNameProps extends ComponentProps<typeof View> {
  // Props definition
}

export function ComponentName({ ...props }: ComponentNameProps) {
  // Component logic
  return (
    <View {...props}>
      {/* JSX content */}
    </View>
  );
}
```

### Best Practices

- **Accessibility**: Always include proper accessibility props
- **Performance**: Use `useMemo` and `useCallback` for expensive operations
- **Error Handling**: Implement proper error boundaries and validation
- **Security**: Validate all inputs and sanitize external data
- **Testing**: Write tests for critical functionality

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
EXPO_PUBLIC_API_URL=https://api.expensetrackr.app
```

## 📱 Building for Production

### EAS Build (Recommended)

1. **Install EAS CLI**
   ```bash
   npm install -g eas-cli
   ```

2. **Login to Expo**
   ```bash
   eas login
   ```

3. **Build for production**
   ```bash
   pnpm build:all
   ```

### Local Development Build

1. **iOS**
   ```bash
   expo run:ios --configuration Release
   ```

2. **Android**
   ```bash
   expo run:android --variant release
   ```

## 🧪 Testing

Testing setup is planned for future implementation:

- **Unit Tests**: Jest + React Native Testing Library
- **Integration Tests**: Detox
- **E2E Tests**: Maestro or Detox

## 🚀 Deployment

### Over-the-Air Updates

```bash
pnpm update
```

### App Store Submission

```bash
pnpm submit:ios
pnpm submit:android
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Workflow

1. **Code Quality**: Ensure all linting and type checking passes
2. **Testing**: Add tests for new functionality
3. **Documentation**: Update documentation for significant changes
4. **Accessibility**: Verify accessibility compliance
5. **Performance**: Check for performance regressions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Polar App](https://github.com/polarsource/polar-app) - Inspiration and reference
- [Expo](https://expo.dev) - Development platform
- [NativeWind](https://nativewind.dev) - Styling solution

## 📞 Support

- **Documentation**: [Project Wiki](https://github.com/expensetrackr/expensetrackr-app/wiki)
- **Issues**: [GitHub Issues](https://github.com/expensetrackr/expensetrackr-app/issues)
- **Discussions**: [GitHub Discussions](https://github.com/expensetrackr/expensetrackr-app/discussions)

## 🗺 Roadmap

- [ ] **Phase 1**: Core expense tracking functionality
- [ ] **Phase 2**: Data visualization and reports
- [ ] **Phase 3**: Budgeting and goals
- [ ] **Phase 4**: Multi-currency support
- [ ] **Phase 5**: Collaborative features

---

Built with ❤️ by the ExpenseTrackr team
