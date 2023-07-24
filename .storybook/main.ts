import type { StorybookConfig } from '@storybook/vue3-vite';
const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|mjs|ts)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        {
            name: '@storybook/addon-styling',
            options: {}
        }
    ],
    framework: {
        name: '@storybook/vue3-vite',
        options: {}
    }
};

export default config;
