type ColorValueHex = `#${string}`;

type ColorExport = {
  [key: string]: {
    [key: string]: ColorValueHex;
  };
};

type ThemeExport = {
  [key: string]: {
    primary: ColorValueHex;
    secondary: ColorValueHex;
    tertiary: ColorValueHex;
  };
};

const themes = {
  brand: {
    primary: '#9c0f97',
    secondary: '#440f42',
    tertiary: '#780574',
  },
  brand2: {
    primary: '#1a8fd9',
    secondary: '#0f24be',
    tertiary: '#4c5fea',
  },
  brand3: {
    primary: '#ea5b05',
    secondary: '#843303',
    tertiary: '#c84c02',
  },
  brand4: {
    primary: '#08b415',
    secondary: '#004a05',
    tertiary: '#008f0a',
  },
  brand5: {
    primary: '#9b0a0a',
    secondary: '#5c0101',
    tertiary: '#7a0000',
  },
  brand6: {
    primary: '#888888',
    secondary: '#555555',
    tertiary: '#777777',
  },
} as ThemeExport;

export default {
  ...themes,
  basic: {
    white: '#ffffff',
    black: '#000000',
    shadow: '#444444',
    border: '#cccccc',
    offset: '#999999',
    error: '#660000',
  },
  indicator: {
    right: '#05a714',
    close: '#d8db03',
    wrong: '#c50f0f',
  },
  background: {
    error: '#b74848',
  },
} as ColorExport;
