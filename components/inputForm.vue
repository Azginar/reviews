<template>
  <div>
    <input
      :type="type"
      :placeholder="placeholder"
      :value="value"
      class="input-form"
      @input="handleInput"
    >
  </div>
</template>
<script>
export default {
  name: 'inputForm',
  props: {
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    handleInput: {
      type: Function,
      default: () => {
      }
    }
  }
}
</script>
<style>
.input-form
{
  background: #FDFDFD;
  border: 1px solid #DFDFDF;
  padding: 5px 25px;
  height: 52px;
  display: block;
  width: 100%;
  border-radius: 4px;
  -moz-border-radius: 4px;
  -webkit-border-radius: 4px;
}

@media (max-width: 992px) {
  .input-form
  {
    padding-right: 20px;
    padding-left: 20px;
  }
}
</style>
