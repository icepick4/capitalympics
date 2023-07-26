import ConfirmDialog, {
    ConfirmDialogOptions
} from '@/components/common/AsyncConfirmDialog.vue';
import Button from '@/components/common/Button.vue';
import { createApp, h } from 'vue';

export function useConfirmDialog(
    options: ConfirmDialogOptions
): Promise<boolean> {
    const htmlIdentifier = 'confirm-container';

    const confirmContainer = document.createElement('div');
    confirmContainer.setAttribute('id', htmlIdentifier);
    document.body.appendChild(confirmContainer);

    return new Promise((resolve) => {
        const vueInstance = createApp(
            h(ConfirmDialog, {
                ...options,
                onConfirm: () => clean() && resolve(true),
                onCancel: () => clean() && resolve(false)
            })
        );

        vueInstance.component('Button', Button);

        const clean = () => {
            vueInstance.unmount();
            document.body.removeChild(confirmContainer);

            return true;
        };

        vueInstance.mount(`#${htmlIdentifier}`);
    });
}
