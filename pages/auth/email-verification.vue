<script setup lang="ts">
import { ref } from "vue";
import VOtpInput from "vue3-otp-input";

const otpInput = ref<InstanceType<typeof VOtpInput> | null>(null);
const bindModal = ref("");
definePageMeta({
  layout: "auth",
});
const handleOnComplete = (value: string) => {
  console.log("OTP completed: ", value);
};

const handleOnChange = (value: string) => {
  console.log("OTP changed: ", value);
};

const clearInput = () => {
  otpInput.value?.clearInput();
};

const fillInput = (value: string) => {
  console.log(value);
  otpInput.value?.fillInput(value);
};
const otpValue = ref<string>();
</script>
<template>
  <div class="flex flex-col items-center space-y-4">
    <div style="display: flex; flex-direction: row">
      <VOtpInput
        ref="otpInput"
        :conditionalClass="['one', 'two', 'three', 'four']"
        input-classes="otp-input"
        separator="-"
        inputType="letter-numeric"
        :num-inputs="4"
        v-model:value="otpValue"
        :should-auto-focus="true"
        :should-focus-order="true"
        @on-change="handleOnChange"
        @on-complete="handleOnComplete"
        :placeholder="['*', '*', '*', '*']"
      />
    </div>
    <div class="flex space-x-4">
      <Button @click="clearInput()">Clear Input</Button>
      <Button @click="fillInput('2929')">Fill Input</Button>
    </div>
  </div>
</template>
<style>
.otp-input {
  width: 40px;
  height: 40px;
  padding: 5px;
  margin: 0 10px;
  font-size: 20px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
}
/* Background colour of an input field with value */
.otp-input.is-complete {
  background-color: #e4e4e4;
}
.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input::placeholder {
  font-size: 15px;
  text-align: center;
  font-weight: 600;
}
</style>
