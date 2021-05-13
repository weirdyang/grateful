<template>
  <ion-page>
    <page-header :title="$route.name" />
    <ion-content class="ion-padding">
      <form novalidate ref="registerForm">
        <ion-list lines="none">
          <ion-item>
            <ion-label position="stacked" color="primary">Email</ion-label>
            <ion-input
              v-model="v$.email.$model"
              type="email"
              spellcheck="false"
              autocapitalize="false"
              required
            >
            </ion-input>
            <validation-error :propertyName="v$.email"></validation-error>
          </ion-item>
          <ion-item>
            <ion-label position="stacked" color="primary">Username</ion-label>
            <ion-input
              v-model="v$.username.$model"
              type="text"
              spellcheck="false"
              autocapitalize="false"
              required
            >
            </ion-input>
            <validation-error :propertyName="v$.username"></validation-error>
          </ion-item>
          <ion-item>
            <ion-label position="stacked" color="primary">Password</ion-label>
            <ion-input
              v-model="v$.password.$model"
              type="password"
              spellcheck="false"
              autocapitalize="false"
              required
            >
            </ion-input>
            <validation-error :propertyName="v$.password"></validation-error>
          </ion-item>
          <ion-row responsive-sm>
            <ion-col>
              <ion-button @click="registerUser" expand="block">
                Register
              </ion-button>
            </ion-col>
          </ion-row>
        </ion-list>
      </form>
    </ion-content>

    <pre>{{ user }}</pre>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonPage,
  IonItem,
  IonInput,
  IonLabel,
  IonList,
  IonButton,
  IonRow,
  IonCol,
} from '@ionic/vue';
import { defineComponent, reactive, ref, nextTick } from 'vue';
import PageHeader from '../components/PageHeader.vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { UserRegister } from '../types/user';
import { showToast, showToastWithButton } from '../common/index';
import { useVuelidate } from '@vuelidate/core';
import { email, required, alphaNum, minLength } from '@vuelidate/validators';
import ValidationError from '@/components/ValidationError.vue';
import { setHeaders } from '@/services/api.service';
export default defineComponent({
  components: {
    IonCol,
    IonRow,
    IonContent,
    IonPage,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    PageHeader,
    ValidationError,
    IonButton,
  },
  setup() {
    const registerForm = ref<HTMLFormElement | null>(null);
    const router = useRouter();
    const initialState = {
      email: '',
      password: '',
      username: '',
    };
    const user = reactive<UserRegister>({ ...initialState });

    const rules = {
      username: { required, alphaNum, minLength: minLength(6) },
      email: { required, email },
      password: { required, minLength: minLength(6) },
    };
    const v$ = useVuelidate(rules, user, { $lazy: true });
    const formState = reactive({
      hasErrors: false,
      isSubmitting: false,
      errors: new Array<string>(),
    });
    const resetComponent = () => {
      Object.assign(user, initialState);
      registerForm.value?.reset();
      nextTick(() => v$.value.$reset());
    };
    const registerUser = async () => {
      formState.isSubmitting = true;

      const isValid = await v$.value.$validate();

      if (!isValid) return;

      try {
        await setHeaders();
        const respose = await axios.post('/auth/register', user);

        await showToast(respose.data.message, 2000, 'success');
        resetComponent();
        router.push('/login');
      } catch (error) {
        if (error.response.status === 422) {
          const { errors } = error.response.data;

          for (const key in errors) {
            if (Object.prototype.hasOwnProperty.call(errors, key)) {
              const element: string = errors[key];
              await showToastWithButton(element, 'danger');
            }
          }
        } else {
          console.error(error.response.data);
          showToast(error.response.data.message, 2000, 'warning');
        }
      } finally {
        formState.isSubmitting = false;
      }
    };
    return {
      registerForm,
      user,
      registerUser,
      v$,
      formState,
    };
  },
});
</script>