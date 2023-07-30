<script setup lang="ts">
import type { Notification } from '@/plugins/notifications';
import { Ref, inject } from 'vue';
import NotificationComponent from './Notification.v2.vue';

const notifications = inject<Ref<Notification[]>>('notifications') as Ref<Notification[]>;
function removeNotification(id: string) {
    console.log("Delete " + id);
    console.log(
        notifications.value.map((n) => n.id).join(', ')
    )
    notifications.value = notifications.value.filter(n => n.id !== id);
}
</script>

<template>
    <transition-group
        name="fade-slide"
        tag="div"
        class="absolute bottom-0 right-0 z-50 p-6 w-full max-w-md flex flex-col gap-y-3 overflow-hidden"
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
.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: all 0.5s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
    opacity: 0;
    transform: translateX(100px);
}

.fade-slide-enter-to,
.fade-slide-leave-from {
    opacity: 1;
    transform: translateY(0);
}
</style>
