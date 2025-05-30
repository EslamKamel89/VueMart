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
const isLoading = ref(false);
const validateOtp = async () => {
  isLoading.value = true;
  await sleep(2000);
  isLoading.value = false;
};
</script>
<template>
  <div class="w-full max-w-md space-y-8">
    <!-- Card -->
    <Card class="w-full bg-white shadow-lg dark:bg-gray-900">
      <CardHeader>
        <CardTitle class="text-xl dark:text-white">
          Verify Your Email</CardTitle
        >
        <CardDescription class="dark:text-gray-400">
          Please enter the 6-digit code sent to your email address to complete
          verification.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <!-- OTP Input Container -->
        <div class="mb-6 flex justify-center">
          <VOtpInput
            ref="otpInput"
            :conditionalClass="['one', 'two', 'three', 'four']"
            input-classes="otp-input"
            separator="-"
            inputType="letter-numeric"
            :num-inputs="6"
            v-model:value="otpValue"
            :should-auto-focus="true"
            :should-focus-order="true"
            @on-change="handleOnChange"
            @on-complete="handleOnComplete"
            :placeholder="['*', '*', '*', '*', '*', '*']"
          />
        </div>
      </CardContent>

      <CardFooter>
        <!-- Action Buttons -->
        <div class="mt-6 flex flex-wrap justify-center gap-4">
          <Button @click="clearInput" variant="destructive">
            Clear Input
          </Button>
          <Button
            :disabled="isLoading"
            @click="validateOtp"
            variant="default"
            class="btn-success"
          >
            <span>Validate OTP</span>
            <Icon
              v-if="isLoading"
              name="eos-icons:bubble-loading"
              class="ms-2"
            />
          </Button></div
      ></CardFooter>
    </Card>
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
  border: 1px solid;
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
