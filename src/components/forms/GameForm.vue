<template>
  <div>
    <h1 class="title">{{ title }}</h1>

    <TextField
      :form-class="formData.class"
      :attribute="formData.name.attribute"
      :label="formData.name.label"
      :required="true"
      v-model="game.name"
    />

    <NumberField
      :form-class="formData.class"
      :attribute="formData.wikidataId.attribute"
      :label="formData.wikidataId.label"
      :required="false"
      v-model="game.wikidataId"
      :min="1"
    />

    <button
      class="button is-primary mr-10 mr-0-mobile is-fullwidth-mobile"
      value="Submit"
      @click.prevent="onSubmit"
    >Submit</button>

    <router-link :to="cancelRouterLink" class="button is-fullwidth-mobile mt-5-mobile">
      Cancel
    </router-link>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from '@vue/composition-api';
import TextField from '@/components/fields/TextField.vue';
import NumberField from '@/components/fields/NumberField.vue';
import { useMutation } from 'villus';
import { UpdateGameDocument, CreateGameDocument } from '@/generated/graphql';

export default defineComponent({
  name: 'GameForm',
  components: {
    TextField,
    NumberField
  },
  props: {
    id: {
      required: false,
      type: String,
      default: null
    },
    name: {
      required: false,
      type: String,
      default: ''
    },
    wikidataId: {
      required: false,
      type: String,
      default: null
    },
    // Should be either 'create' or 'update'
    formState: {
      required: true,
      type: String
    }
  },
  setup(props, context) {
    const formData = {
      class: 'game',
      name: {
        label: 'Game name',
        attribute: 'name'
      },
      wikidataId: {
        label: 'Wikidata ID',
        attribute: 'wikidata_id'
      }
    }

    const game: Ref<{ id: string | null, name: string | null, wikidataId: string | null }> = ref({
      id: props.id ?? null, 
      name: props.name ?? '',
      wikidataId: props.wikidataId ?? ''
    });

    const title = computed(() => {
      return props.formState === 'create' ? 'Creating a new game' : `Editing ${props.name}`;
    });

    const onSubmit = () => {
      return props.formState === 'create' ? createGame() : updateGame();
    };

    const cancelRouterLink = computed(() => {
      return props.formState === 'create' ? { name: 'Game' } : { name: 'Game', params: { id: props.id }};
    });

    const { data: createGameData, execute: executeCreateGame, error: createGameErrors } = useMutation(CreateGameDocument);
    let createGame = () => {
      let { name, wikidataId } = game.value;
      executeCreateGame({ name: name ?? '', wikidataId }).then(() => {
        if (createGameData.value.createGame?.game?.id) {
          context.root.$router.push({ name: 'Game', params: { id: createGameData.value.createGame.game.id }});
        } else {
          // TODO: Error handling.
          console.log(`Error: ${createGameErrors.value}`);
        }
      });
    };

    const { data: updateGameData, execute: executeUpdateGame, error: updateGameErrors } = useMutation(UpdateGameDocument);
    let updateGame = () => {
      let { id: gameId, ...gameValues } = game.value;
      if (gameId === null) { throw Error('Something went wrong and id is null.') }
      executeUpdateGame({ gameId: gameId, ...gameValues }).then(() => {
        if (updateGameData.value.updateGame?.game?.id) {
          context.root.$router.push({ name: 'Game', params: { id: props.id }});
        } else {
          // TODO: Error handling.
          console.log(`Error: ${updateGameErrors.value}`);
        }
      });
    };

    return {
      formData,
      title,
      game,
      onSubmit,
      createGame,
      updateGame,
      cancelRouterLink
    };
  }
});
</script>
