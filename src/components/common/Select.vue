<script setup lang="ts">
import { Maybe } from '@/types/common';
import {
Listbox,
ListboxButton,
ListboxOption,
ListboxOptions
} from '@headlessui/vue';
import { IconCheck, IconChevronDown, SVGProps } from '@tabler/icons-vue';
import { useVModel } from '@vueuse/core';
import { v4 as uuidv4 } from 'uuid';
import { FunctionalComponent, computed } from 'vue';

type OptionValue = string | number;
type Option =
    | { value: OptionValue; label: Maybe<OptionValue>; disabled?: boolean }
    | OptionValue;

interface Properties {
    modelValue: OptionValue | null;
    options: Option[];
    label?: string;
    disabled?: boolean;
    prependIcon?: FunctionalComponent<SVGProps & { strokeWidth?: number }>;
}

type Item = {
    id: string;
    value: OptionValue;
    disabled: boolean;
    label: string;
};

const props = withDefaults(defineProps<Properties>(), {
    disabled: false
});

const emit = defineEmits(['update:modelValue']);
const selectedItemValue = useVModel(props, 'modelValue', emit);
const selectedItem = computed(() =>
    items.value.find((item) => item.value === selectedItemValue.value)
);

function optionToItem(option: Option): Item {
    const label = typeof option === 'object' ? option?.label : option;

    return {
        id: uuidv4(),
        value: typeof option === 'object' ? option.value : option,
        disabled: typeof option === 'object' ? !!option.disabled : false,
        label: `${label}`
    };
}

const items = computed(() => props.options.map(optionToItem));
</script>

<template>
    <div class="relative block w-full font-sans space-y-1">
        <p v-if="label" class="font-semibold text-gray-700 text-sm">
            {{ label }}
        </p>
        <Listbox
            v-slot="{ open }"
            v-model="selectedItemValue"
            as="div"
            :disabled="disabled"
        >
            <ListboxButton
                class="w-full bg-white flex items-center py-2 px-3 gap-x-2 rounded-md text-left text-base border border-gray-400/50 outline outline-2 outline-offset-2 outline-transparent focus-visible:outline-blue-600/75"
            >
                <slot name="prepend">
                    <div
                        v-if="prependIcon"
                        aria-hidden="true"
                        class="grid place-items-center h-8 w-8 transition-colors shrink-0"
                        :class="[
                            open || selectedItem
                                ? 'text-black/75'
                                : 'text-gray-400'
                        ]"
                    >
                        <component :is="prependIcon" :stroke-width="1.5" />
                    </div>
                </slot>
                <div class="w-full truncate text-gray-700">
                    {{ selectedItem?.label ?? '' }}
                </div>
                <div
                    aria-hidden="true"
                    class="grid place-items-center h-8 w-8 transition-colors shrink-0 text-gray-500"
                    :class="{ 'rotate-180': open }"
                >
                    <IconChevronDown />
                </div>
                <span
                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
                >
                </span>
            </ListboxButton>
            <ListboxOptions
                class="absolute z-20 origin-top-left mt-2.5 max-h-60 w-full min-w-[72px] overflow-auto rounded-md bg-white p-1 text-base sm:text-sm outline outline-2 outline-offset-2 outline-transparent focus-visible:outline-blue-600/75"
            >
                <ListboxOption
                    v-for="item in items"
                    v-slot="{ active, selected }"
                    :key="item.id"
                    :value="item.value"
                    :disabled="item.disabled"
                >
                    <li
                        class="rounded-md cursor-pointer relative select-none py-2 pl-3 pr-4"
                        :class="{
                            'text-gray-700 font-medium bg-gray-100': selected,
                            'text-gray-700 font-medium': selected,
                            'text-gray-700/75': !active && !selected,
                            'bg-gray-100 text-gray-700': active
                        }"
                    >
                        <span
                            class="block truncate"
                            :class="[selected ? 'font-medium' : 'font-normal']"
                        >
                            {{ item.label }}
                        </span>
                        <span
                            v-if="selected"
                            class="absolute inset-y-0 right-0 flex items-center pr-3"
                        >
                            <IconCheck aria-hidden="true" width="18" />
                        </span>
                    </li>
                </ListboxOption>
            </ListboxOptions>
        </Listbox>
    </div>
</template>
