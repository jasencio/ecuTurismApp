import { MD3LightTheme } from 'react-native-paper';

// Custom theme based on app logo colors
const appTheme = {
    ...MD3LightTheme,
    colors: {
        ...MD3LightTheme.colors,
        primary: '#2E5C45', // Dark Green from logo
        secondary: '#C5A059', // Gold from logo
        tertiary: '#4CAF50', // Light Green accent
        background: '#FFFFFF',
        surface: '#FFFFFF',
        surfaceVariant: '#F8F6F0', // Subtle warm beige for cards
        onPrimary: '#FFFFFF',
        onSecondary: '#FFFFFF',
        onBackground: '#1C1B1F',
        onSurface: '#1C1B1F',
        error: '#B3261E',
        onError: '#FFFFFF',
    },
};

export default appTheme;
