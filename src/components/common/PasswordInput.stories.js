import { ref } from 'vue';
import PasswordInput from './PasswordInput.vue';

export default {
    title: 'Common/PasswordInput',
    component: PasswordInput,
};

const Template = (args) => ({
    components: {
        PasswordInput,
    },
    setup: () => {
        const value = ref('');
        return { args, value };
    },
    template: `
        <PasswordInput
            v-model="value"
            v-bind="args"
            class="max-w-md"
        />
    `,
});

export const Default = Template.bind({});
Default.args = {
    label: "Your awesome password",
};

export const Revelable = Template.bind({});
Revelable.args = {
    ...Default.args,
    revelable: true,
};
