<template>
  <div class="edit-company" v-if="isLoaded">
    <template v-if="userCanEdit">
      <company-form
        v-bind="company"
        :form-state="'update'"
      />
    </template>
    <template v-else>
      <p>You cannot edit this company.</p>
    </template>
  </div>
</template>

<script lang="ts">
import { CompanyDocument } from '@/generated/graphql';
import { computed, defineComponent, Ref, ref } from 'vue';
import { useQuery } from 'villus';
import CompanyForm from '@/components/forms/CompanyForm.vue';
import { useStore } from 'vuex';
import { State } from '@/store';

export default defineComponent({
  name: 'EditCompany',
  components: {
    CompanyForm
  },
  props: {
    id: {
      required: true,
      type: String
    }
  },
  setup(props) {
    const { execute: executeQuery } = useQuery({
      query: CompanyDocument,
      variables: {
        id: props.id
      },
      fetchOnMount: false
    });

    const company: Ref<{ id: string, name: string | null, wikidataId: number | string | null }> = ref({
      id: props.id,
      name: null,
      wikidataId: null
    });

    // Don't try to render the form until the data is fully loaded, to make
    // sure we can pre-populate the form as necessary.
    const isLoaded = ref(false);

    executeQuery().then(({ data }) => {
      company.value.name = data?.company?.name ?? null;
      company.value.wikidataId = data?.company?.wikidataId ?? null;
      isLoaded.value = true;
    });

    const store = useStore<State>();
    const userSignedIn = computed(() => store.state.userSignedIn);

    const userCanEdit = userSignedIn;

    return {
      isLoaded,
      userSignedIn,
      userCanEdit,
      company
    };
  }
});
</script>
