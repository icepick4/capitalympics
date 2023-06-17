import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import App from './App.vue';
import en from './locales/en.json';
import es from './locales/es.json';
import fr from './locales/fr.json';
import router from './router';
import store from './store';
import './style.css';

const app = createApp(App, {
    compilerOptions: {
        isCustomElement: (tag: string) => tag.startsWith('ion-')
    }
});

const browserLanguage = navigator.language;
const defaultLocale = browserLanguage.substring(0, 2);

const supportedLocales = ['fr', 'en', 'es'];

if (!supportedLocales.includes(defaultLocale)) {
    defaultLocale === 'en';
}

store.commit('setLanguage', defaultLocale);

const i18n = createI18n({
    locale: defaultLocale,
    messages: {
        fr: fr,
        en: en,
        es: es
    }
});

app.use(router).use(store).use(i18n).mount('#app');
