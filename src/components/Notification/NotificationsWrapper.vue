<script setup lang="ts">
import type { Notification } from '@/plugins/notifications';
import { Ref, inject } from 'vue';
import NotificationComponent from './Notification.vue';

const notifications = inject<Ref<Notification[]>>('notifications') as Ref<
    Notification[]
>;
function removeNotification(id: string) {
    notifications.value = notifications.value.filter((n) => n.id !== id);
}
</script>

<template>
    <transition-group
        name="slide-fade"
        enter-active-class="slide-fade-enter-active"
        leave-active-class="slide-fade-leave-active"
        tag="div"
        class="absolute bottom-0 right-0 z-50 p-6 w-full max-w-md flex flex-col gap-y-4 overflow-hidden"
    >
        <NotificationComponent
            v-for="notification in notifications"
            :key="notification.id"
            :notification="notification"
            @close="removeNotification(notification.id)"
        />
    </transition-group>
</template>

<style scoped>
.slide-fade-enter-active {
    animation: slide-up 0.5s ease-out;
}

.slide-fade-leave-active {
    animation: slide-right 0.5s ease-out;
}

@keyframes slide-up {
    from {
        transform: translateY(100%);
    }
    to {
        transform: translateY(0);
    }
}

@keyframes slide-right {
    from {
        transform: translateX(0);
    }
    to {
        transform: translateX(100%);
    }
}
</style>
