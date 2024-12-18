<template>
  <div class="custom-select" :tabindex="tabindex" @blur="open = false">
    <div class="selected" :class="{ open: open }" @click="toggleDropdown">
      {{ modelValue || placeholder }}
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <div
          v-for="(option, index) in options"
          :key="index"
          @click="select(option)"
          class="item"
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
      default: null,
    },
    options: {
      type: Array,
      required: true,
    },
    placeholder: {
      type: String,
      default: 'Select an option',
    },
    tabindex: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      open: false,
    };
  },
  methods: {
    toggleDropdown() {
      this.open = !this.open;
    },
    select(option) {
      this.$emit('update:modelValue', option); // Emit the selected value
      this.open = false; // Close dropdown after selection
    },
  },
};
</script>

<style scoped>
.custom-select {
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;
  transition: width .3s;
}

.custom-select:hover {
  width: 110%;
}

.selected {
  background-color: #f0f0f0;
  border-radius: 6px;
  border: 1px solid #ccc;
  padding: 10px;
  cursor: pointer;
  transition: background-color .3s;
}

.selected:hover {
  background-color: #b6daff;
}

.selected.open {
  border-color: #007bff;
}

.items {
  position: absolute;
  background-color: white;
  border-radius: 0px 0px 6px 6px;
  border: 1px solid #ccc;
  left: 0;
  right: 0;
}

.item {
  padding: 10px;
  transition: padding .3s;
}

.item:hover {
  background-color: #007bff;
  cursor: pointer;

  padding: 15px;
  color: white;
}

.selectHide {
  display: none;
}
</style>
