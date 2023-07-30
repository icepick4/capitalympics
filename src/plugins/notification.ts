import Notification from '@/components/Notification/Notification.vue';
import { createApp, createVNode, h } from 'vue';

interface NotificationProperties {
    title: string;
    message: string;
    type: 'success' | 'error' | 'warning';
    country?: { name: string; flag: string };
    score?: number;
    timeout?: number;
}

const notify = ({
    title,
    message,
    type,
    country,
    score,
    timeout
}: NotificationProperties) => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const notificationComponent = createVNode(Notification, {
        title,
        message,
        type,
        country,
        score,
        timeout
    });
    const app = createApp({ render: () => h(notificationComponent) });

    app.mount(container);
};

export { notify };
