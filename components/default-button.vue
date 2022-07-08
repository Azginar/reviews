<template>
  <button
    :class="classes"
    @click="clickEvent"
  >
    <div v-if="isWithSlot" class="with-slot">
      <div>
        <slot name="icon" />
      </div>
      <div style="display: block">
        {{ label }}
      </div>
    </div>
    <div v-else>
      {{ label }}
    </div>
  </button>
</template>
<script>

export default {
  name: 'DefaultButton',
  props: {
    label: {
      type: String,
      required: true
    },
    isWithSlot: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      required: true
    },
    clickEvent: {
      type: Function,
      default: () => {
      }
    }
  },
  computed: {
    classes () {
      const ButtonColors = new Map()
        .set('blue-button', { 'blue-button': true })
        .set('white-button', { 'white-button': true })
        .set('white-button-social', { 'white-button-social': true })
      return ButtonColors.get(this.type)
    }
  }
}
</script>
<style>
.blue-button
{
  font-family: 'Roboto-Regular', sans-serif;
  background: #007FD8;
  color: #ffffff;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  text-transform: uppercase;
  padding: 14px 40px 13px;
  border: 2px solid #007FD8;
  box-sizing: border-box;
  border-radius: 50px;
  -moz-border-radius: 50px;
  -webkit-border-radius: 50px;
}

.blue-button:hover,
.blue-button:active
{
  background: #ffffff;
  color: #007FD8;
  border-color: #007FD8;
}

.white-button
{
  font-family: 'Roboto-Regular', sans-serif;
  background: #FFFFFF;
  font-size: 13px;
  line-height: 15px;
  text-transform: uppercase;
  color: #C2C2C2;
  font-style: normal;
  font-weight: 500;
  padding: 8px 40px 8px;
  border: 2px solid #C2C2C2;
  box-sizing: border-box;
  border-radius: 50px;
  -moz-border-radius: 50px;
  -webkit-border-radius: 50px;
}

.white-button:hover,
.white-button:active {
  color: #333333;
  border-color: #333333;
}

.white-button-social
{
  font-family: 'Roboto-Regular', sans-serif;
  background: #FFFFFF;
  font-size: 16px;
  line-height: 19px;
  text-transform: uppercase;
  color: #989898;
  height: 50px;
  font-style: normal;
  font-weight: 500;
  padding: 8px 40px 8px;
  border: 2px solid #C2C2C2;
  box-sizing: border-box;
  border-radius: 50px;
  -moz-border-radius: 50px;
  -webkit-border-radius: 50px;
}

.white-button-social:hover,
.white-button-social:active
{
  color: #333333;
  border-color: #333333;
}

.white-button-social .with-slot svg
{
  display: block;
  margin-right: 10px;
}

button .with-slot
{
  display: flex;
  align-items: center;
}

button .with-slot svg
{
  margin-right: 8px;
}

.white-button:hover .with-slot svg path,
.white-button-social:hover .with-slot svg path
{
  fill: #333333;
}

@media (max-width: 992px) {
  button.white-button-social .with-slot > div + div
  {
    display: none !important;
  }

  button.white-button-social
  {
    width: 50px;
    height: 50px;
    padding: 0;
    margin-right: 10px;
    margin-left: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
  }

  button.white-button-social .with-slot svg
  {
    margin-right: 0;
  }
}
</style>
