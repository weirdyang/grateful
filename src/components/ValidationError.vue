<template>
  <ion-item v-show="propertyName.$invalid">
    <ion-text
      color="danger"
      v-for="(err, index) in propertyName.$errors"
      :key="index"
    >
      <p>{{ err.$message }}</p>
    </ion-text>
  </ion-item>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { IonItem, IonText } from '@ionic/vue';
export default defineComponent({
  props: {
    propertyName: {
      type: Object,
      required: true,
    },
  },
  components: {
    IonText,
    IonItem,
  },
});
</script>