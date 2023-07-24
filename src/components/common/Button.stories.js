import Button from './Button.vue';

export default {
    title: 'Common/Button',
    component: Button,
};

const Template = (args) => ({
    components: {
        Button,
    },
    setup: () => ({ args }),
    template: `<Button v-bind="args" />`,
});

export const Success = Template.bind({});
Success.args = {
    text: "A success button",
};

export const Warning = Template.bind({});
Warning.args = {
    text: "A warning button",
    type: "warning",
};

export const Error = Template.bind({});
Error.args = {
    text: "An error button",
    type: "error",
};
