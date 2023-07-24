import { IconLock } from '@tabler/icons-vue';
import { ref } from 'vue';
import TextInput from './TextInput.vue';

export default {
    title: 'Common/TextInput',
    component: TextInput,
};

const Template = (args) => ({
    components: {
        TextInput,
    },
    setup: () => {
        const value = ref('');
        return { args, value };
    },
    template: `
        <TextInput
            v-model="value"
            v-bind="args"
            class="max-w-md"
        />
    `,
});

export const Default = Template.bind({});
Default.args = {
    label: "What's your name?",
    placeholder: 'Enter your name',
};

export const Disabled = Template.bind({});
Disabled.args = {
    ...Default.args,
    disabled: true,
};

export const InError = Template.bind({});
InError.args = {
    ...Default.args,
    error: 'Please a valid name',
};

export const WithPrependIconAndHint = Template.bind({});
WithPrependIconAndHint.args = {
    label: "Password",
    placeholder: 'Your password (not even hidden...)',
    hint: "Your password must be at least 8 characters long",
    prependIcon: IconLock,
};
