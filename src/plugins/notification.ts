import type { Properties as NotificationProperties } from '@/components/Notification/Notification.vue';
import Notification from '@/components/Notification/Notification.vue';
import { createApp, createVNode, h } from 'vue';

const notify = ({
    title,
    message,
    type,
    flag,
    score,
    timeout
}: NotificationProperties) => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const notificationComponent = createVNode(Notification, {
        title,
        message,
        type,
        flag,
        score,
        timeout
    });

    const app = createApp({ render: () => h(notificationComponent) });

    app.mount(container);
};

export { notify };

