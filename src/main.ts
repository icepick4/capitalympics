import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './style.css';

const app = createApp(App, {
    compilerOptions: {
        isCustomElement: (tag: string) => tag.startsWith('ion-')
    }
});

app.use(router).use(store).mount('#app');
