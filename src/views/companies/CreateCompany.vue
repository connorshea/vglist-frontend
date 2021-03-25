<template>
  <div class="create-company">
    <template v-if="userCanCreate">
      <CompanyForm
        v-bind="company"
        :form-state="'create'"
      />
    </template>
    <template v-else>
      <p>You cannot create a company.</p>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from '@vue/composition-api';
import CompanyForm from '@/components/forms/CompanyForm.vue';

export default defineComponent({
  name: 'CreateCompany',
  components: {
    CompanyForm
  },
  setup(_props, context) {
    const company: Ref<{ name: string | null, wikidataId: number | string | null }> = ref({
      name: null,
      wikidataId: null
    });

    const userSignedIn = computed(() => context.root.$store.state.userSignedIn);

    const userCanCreate = userSignedIn;

    return {
      userSignedIn,
      userCanCreate,
      company
    };
  }
});
</script>
