<template>
  <div>
    <textarea
      :placeholder="placeholder"
      :value="value"
      @input="handleInput"
      class="textarea-form"
    />
  </div>
</template>
<script>
export default {
  name: 'textareaForm',
  props: {
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
.textarea-form
{
  background: #FDFDFD;
  border: 1px solid #DFDFDF;
  padding: 25px 25px;
  min-height: 171px;
  display: block;
  width: 100%;
  border-radius: 4px;
  -moz-border-radius: 4px;
  -webkit-border-radius: 4px;
}

@media (max-width: 992px) {
  .textarea-form
  {
    padding-right: 20px;
    padding-left: 20px;
  }
}
</style>
