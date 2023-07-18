import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import App from './App.vue';
import en from './locales/en.json';
import es from './locales/es.json';
import fr from './locales/fr.json';
import it from './locales/it.json';
import router from './router';
import './style.css';
import { Lang } from './types/common';

import { createPinia } from 'pinia';
const pinia = createPinia();

const app = createApp(App, {
    compilerOptions: {
        isCustomElement: (tag: string) => tag.startsWith('ion-')
    }
});

const browserLanguage = navigator.language;
const defaultLocale = browserLanguage.substring(0, 2) as Lang;

const supportedLocales: Lang[] = ['en', 'fr', 'es', 'it'];

if (!supportedLocales.includes(defaultLocale)) {
    defaultLocale === 'en';
}

const i18n = createI18n({
    locale: defaultLocale,
    messages: { fr, en, es, it }
});

app.use(router).use(pinia).use(i18n).mount('#app');
