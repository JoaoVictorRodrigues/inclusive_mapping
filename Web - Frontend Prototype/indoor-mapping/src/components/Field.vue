<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex flex-col items-start">
    <label class="text-black mt-6" :for="f_id">{{ f_label }}</label>
    <div class="flex w-full">
      <input
        class="w-full rounded-md p-1 border"
        :class="f_icon ? 'pl-10' : 'pl-2'"
        :id="f_id"
        :type="f_type"
        :name="f_id"
        :placeholder="f_placeholder"
        :value="f_value"
        :disabled="f_disabled"
        @input="$emit('update:f_value', $event.target.value)"
      />
      <i v-if="f_icon" :class="'fa ' + f_icon + ' fieldIcon'"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    f_id: { type: String, required: true },
    f_value: { required: true },
    f_label: { type: String, required: true },
    f_type: { type: String, required: true },
    f_placeholder: { type: String, default: '' },
    f_icon: { type: String, default: '' },
    f_disabled: { type: Boolean, default: false }
  },
  emits: ['update:f_value']
}
</script>
