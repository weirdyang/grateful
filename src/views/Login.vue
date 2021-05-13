<template>
  <ion-page>
    <page-header :title="$route.name" />
    <ion-content class="ion-padding">
      <form @submit.prevent>
        <ion-list>
          <ion-item>
            <ion-label position="stacked" color="primary">Email</ion-label>
            <ion-input
              v-model="user.email"
              type="email"
              spellcheck="false"
              autocapitalize="false"
              required
            >
            </ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked" color="primary">Password</ion-label>
            <ion-input
              v-model="user.password"
              type="password"
              spellcheck="false"
              autocapitalize="false"
              required
            >
            </ion-input>
          </ion-item>
        </ion-list>
        <ion-row responsive-sm>
          <ion-col>
            <ion-button @click="signIn" type="submit" expand="block"
              >Login</ion-button
            >
          </ion-col>
          <ion-col>
            <ion-button @click="goSignUp" color="light" expand="block"
              >Sign up</ion-button
            >
          </ion-col>
        </ion-row>
      </form>
    </ion-content>
    <ion-button @click="test">test</ion-button>
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
  IonRow,
  IonCol,
  IonButton,
} from '@ionic/vue';
import { defineComponent, reactive } from 'vue';
import PageHeader from '../components/PageHeader.vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { UserLogin } from '../types/user';
import { showToast } from '../common/index';
import { useVuelidate } from '@vuelidate/core';
import { email, required, minLength } from '@vuelidate/validators';
import axios from 'axios';
export default defineComponent({
  components: {
    IonContent,
    IonPage,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    PageHeader,
    IonRow,
    IonCol,
    IonButton,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const user = reactive<UserLogin>({
      email: '',
      password: '',
    });
    const rules = {
      email: { required, email },
      password: { required, minLength: minLength(6) },
    };
    const v$ = useVuelidate(rules, user, { $lazy: true });
    const goSignUp = () => {
      router.push('/register');
    };
    const signIn = async () => {
      const isValid = await v$.value.$validate();
      if (!isValid) {
        return;
      }
      try {
        await store.dispatch('users/signIn', user);
        router.push('/');
      } catch (error) {
        if (error.response.status === 403) {
          console.error(error);
          showToast(`${error.response.data.message}`, 2000, 'danger');
        } else {
          console.error(error);
          return showToast('Error signing in.', 2000, 'warning');
        }
      }
    };
    const test = () => {
      axios.get('/users');
    };
    return {
      test,
      user,
      signIn,
      goSignUp,
      v$,
    };
  },
});
</script>