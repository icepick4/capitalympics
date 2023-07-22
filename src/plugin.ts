import ActionIconVue from '@/components/common/ActionIcon.vue';
import Button from '@/components/common/Button.vue';
import Dialog from '@/components/common/Dialog.vue';
import PasswordInput from '@/components/common/PasswordInput.vue';
import Select from '@/components/common/Select.vue';
import TextInput from '@/components/common/TextInput.vue';
import ConfirmDialog from './components/common/ConfirmDialog.vue';

export default {
    install: (app: any) => {
        app.component('ActionIcon', ActionIconVue);
        app.component('Button', Button);
        app.component('ConfirmDialog', ConfirmDialog);
        app.component('Dialog', Dialog);
        app.component('PasswordInput', PasswordInput);
        app.component('TextInput', TextInput);
        app.component('Select', Select);
    }
};
