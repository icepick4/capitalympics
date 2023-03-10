import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './style.css';

const app = createApp(App, {
    compilerOptions: {
        isCustomElement: (tag: string) => tag.startsWith('ion-')
    }
});

app.use(router).mount('#app');
