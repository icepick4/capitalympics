import { withThemeByClassName } from '@storybook/addon-styling';
import type { Preview } from '@storybook/vue3';
import { setup } from '@storybook/vue3';
import GlobalComponentsPlugin from '../src/plugin';
import '../src/style.css';

setup((app) => {
    app.use(GlobalComponentsPlugin)
})

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/
            }
        }
    },

    decorators: [
        withThemeByClassName({
            themes: {
                light: 'light',
                dark: 'dark'
            },
            defaultTheme: 'light'
        })
    ]
};

export default preview;
