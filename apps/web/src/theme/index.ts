'use client';

import { Button, createTheme, TextInput, virtualColor } from '@mantine/core';

import classes from './input.module.css';

export const theme = createTheme({
  fontFamily: 'Roboto, sans-serif',
  primaryShade: 6,
  colors: {
    primary: virtualColor({
      name: 'primary',
      dark: 'red',
      light: 'cyan',
    }),
    red: [
      '#ffe8e8',
      '#ffcfcf',
      '#ff9b9c',
      '#ff6466',
      '#fe3838',
      '#fe1b1b',
      '#ff090b',
      '#e40001',
      '#cb0000',
      '#b10000',
    ],
    customGray: [
      '#f3f5f6',
      '#e7e7e7',
      '#cbcccd',
      '#adb1b5',
      '#9399a0',
      '#828a93',
      '#78838f',
      '#66707c',
      '#59646f',
      '#495764',
    ],
  },
  components: {
    Button: Button.extend({
      defaultProps: {
        color: 'primary',
        style: {
          borderRadius: 12,
          height: 'unset',
          padding: '12px 24px',
        },
      },
    }),
    TextInput: TextInput.extend({
      defaultProps: {
        color: 'primary',
        className: classes.input,
      },
    }),
  },
});
