<template>
  <ion-header :translucent="true">
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-menu-button></ion-menu-button>
      </ion-buttons>
      <ion-buttons slot="end">
        <ion-back-button></ion-back-button>
      </ion-buttons>
      <ion-title>{{ title }}</ion-title>
      <ion-title>{{ user?.username }}</ion-title>
    </ion-toolbar>
  </ion-header>
</template>
<script lang="ts">
import { User } from '@/types/user';
import {
  IonHeader,
  IonToolbar,
  IonMenuButton,
  IonTitle,
  IonBackButton,
  IonButtons,
} from '@ionic/vue';
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
export default defineComponent({
  components: {
    IonHeader,
    IonToolbar,
    IonMenuButton,
    IonTitle,
    IonBackButton,
    IonButtons,
  },
  props: {
    title: String,
  },
  setup() {
    const store = useStore();

    const user = computed<User>(() => store.state.users.user);
    console.log(user?.value?.username);
    return {
      user,
    };
  },
});
</script>