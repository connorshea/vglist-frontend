<template>
  <div class="create-company">
    <template v-if="userCanCreate">
      <company-form
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
import { computed, defineComponent, Ref, ref } from 'vue';
import CompanyForm from '@/components/forms/CompanyForm.vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'CreateCompany',
  components: {
    CompanyForm
  },
  setup() {
    const company: Ref<{ name: string | null, wikidataId: number | string | null }> = ref({
      name: null,
      wikidataId: null
    });

    const store = useStore();
    const userSignedIn = computed(() => store.state.userSignedIn);

    const userCanCreate = userSignedIn;

    return {
      userSignedIn,
      userCanCreate,
      company
    };
  }
});
</script>
