<template>
  <div class="modal" :class="{ 'is-active': isActive }">
    <div @click="onClose" class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ modalTitle }}</p>
        <button @click="onClose" class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body modal-card-body-allow-overflow">
        <!-- Display errors if there are any. -->
        <div class="notification errors-notification is-danger" v-if="errors.length > 0">
          <p>
            {{ errors.length > 1 ? 'Errors' : 'An error' }} prevented this game from
            being added to your library:
          </p>
          <ul>
            <li v-for="error in errors" :key="error">{{ error }}</li>
          </ul>
        </div>
        <div v-if="gameSelected">
          <single-select
            :label="formData.game.label"
            v-model="gamePurchase.game"
            :max-height="'150px'"
            :disabled="true"
            @update:modelValue="selectGame"
            :graphqlQuery="GameSearchDocument"
            :searchPath="'gameSearch'"
          />

          <static-single-select
            :label="formData.completionStatus.label"
            v-model="gamePurchase.completionStatus"
            :options="formattedCompletionStatuses"
          />

          <number-field
            :form-class="formData.class"
            :attribute="formData.rating.attribute"
            :label="formData.rating.label"
            :required="false"
            :max="100"
            v-model="gamePurchase.rating"
          />

          <number-field
            :form-class="formData.class"
            :attribute="formData.hoursPlayed.attribute"
            :label="formData.hoursPlayed.label"
            :required="false"
            v-model="gamePurchase.hoursPlayed"
          />

          <number-field
            :form-class="formData.class"
            :attribute="formData.replayCount.attribute"
            :label="formData.replayCount.label"
            :required="false"
            v-model="gamePurchase.replayCount"
          />

          <text-area
            :form-class="formData.class"
            :attribute="formData.comments.attribute"
            :label="formData.comments.label"
            :required="false"
            v-model="gamePurchase.comments"
          />

          <date-field
            :form-class="formData.class"
            :attribute="formData.startDate.attribute"
            :label="formData.startDate.label"
            :required="false"
            v-model="gamePurchase.startDate"
          />

          <date-field
            :form-class="formData.class"
            :attribute="formData.completionDate.attribute"
            :label="formData.completionDate.label"
            :required="false"
            v-model="gamePurchase.completionDate"
          />

          <multi-select
            :label="formData.platforms.label"
            v-model="gamePurchase.platforms"
            :search-path="'platformSearch'"
            :graphqlQuery="PlatformSearchDocument"
          />

          <multi-select
            :label="formData.stores.label"
            v-model="gamePurchase.stores"
            :search-path="'storeSearch'"
            :graphqlQuery="StoreSearchDocument"
          />
        </div>

        <div v-else>
          <single-select
            :label="formData.game.label"
            v-model="gamePurchase.game"
            :max-height="'150px'"
            @update:modelValue="selectGame"
            :graphqlQuery="GameSearchDocument"
            :searchPath="'gameSearch'"
          />
        </div>
      </section>
      <footer class="modal-card-foot">
        <button @click="onSave" class="button is-primary js-submit-button">Save changes</button>
        <button @click="onClose" class="button">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useMutation } from 'villus';
import { AddGameToLibraryDocument, GamePurchaseCompletionStatus, GameSearchDocument, PlatformSearchDocument, StoreSearchDocument, UpdateGameInLibraryDocument } from '@/generated/graphql';

import TextArea from '@/components/fields/TextArea.vue';
import NumberField from '@/components/fields/NumberField.vue';
import DateField from '@/components/fields/DateField.vue';
import SingleSelect from '@/components/fields/SingleSelect.vue';
import MultiSelect from '@/components/fields/MultiSelect.vue';
import StaticSingleSelect from '@/components/fields/StaticSingleSelect.vue';

export default defineComponent({
  name: 'GameModal',
  components: {
    TextArea,
    NumberField,
    DateField,
    SingleSelect,
    MultiSelect,
    StaticSingleSelect
  },
  props: {
    id: {
      type: String,
      required: false,
      default: null
    },
    rating: {
      type: [Number, String],
      required: false,
      default: ''
    },
    hoursPlayed: {
      type: [Number, String],
      required: false,
      default: null
    },
    replayCount: {
      type: [Number, String],
      required: false,
      default: 0
    },
    completionStatus: {
      type: String,
      required: false
    },
    startDate: {
      type: String,
      required: false,
      default: null
    },
    completionDate: {
      type: String,
      required: false,
      default: null
    },
    comments: {
      type: String,
      required: false,
      default: ''
    },
    platforms: {
      type: Array,
      required: false,
      default: () => []
    },
    stores: {
      type: Array,
      required: false,
      default: () => []
    },
    game: {
      type: Object,
      required: false,
      default: () => { return {}; }
    },
    isActive: {
      type: Boolean,
      required: true
    },
    gameModalState: {
      type: String,
      required: true,
      validator: (val: string) => ['create', 'update', 'createWithGame'].includes(val)
    }
  },
  emits: [
    'close',
    'closeAndRefresh',
    'create'
  ],
  setup(props, context) {
    const formattedCompletionStatuses: Array<{ label: string, value: keyof typeof GamePurchaseCompletionStatus, enumValue: `${GamePurchaseCompletionStatus}` }> = [
      { label: "Unplayed", value: "Unplayed", enumValue: 'UNPLAYED' },
      { label: "In Progress", value: "InProgress", enumValue: 'IN_PROGRESS' },
      { label: "Paused", value: "Paused", enumValue: 'PAUSED' },
      { label: "Dropped", value: "Dropped", enumValue: 'DROPPED' },
      { label: "Completed", value: "Completed", enumValue: 'COMPLETED' },
      { label: "100% Completed", value: "FullyCompleted", enumValue: 'FULLY_COMPLETED' },
      { label: "N/A", value: "NotApplicable", enumValue: 'NOT_APPLICABLE' }
    ];

    let startingCompletionStatus = null;
    if (props.completionStatus) {
      startingCompletionStatus = formattedCompletionStatuses.find((status) => status.enumValue === props.completionStatus);
    }

    const gamePurchase = ref({
      id: props.id,
      comments: props.comments,
      rating: props.rating,
      game: props.game,
      completionStatus: startingCompletionStatus ?? null,
      startDate: props.startDate,
      completionDate: props.completionDate,
      hoursPlayed: parseFloat(props.hoursPlayed?.toString() ?? null),
      replayCount: props.replayCount,
      platforms: props.platforms as Array<{ id: string, name: string}>,
      stores: props.stores as Array<{ id: string, name: string}>
    });

    const formData = {
      class: 'game_purchase',
      comments: {
        label: 'Comments',
        attribute: 'comments'
      },
      rating: {
        label: 'Rating (out of 100)',
        attribute: 'rating'
      },
      hoursPlayed: {
        label: 'Hours Played',
        attribute: 'hoursPlayed'
      },
      replayCount: {
        label: 'Replay Count',
        attribute: 'replayCount'
      },
      completionStatus: {
        label: 'Completion Status'
      },
      startDate: {
        label: 'Start Date',
        attribute: 'startDate'
      },
      completionDate: {
        label: 'Completion Date',
        attribute: 'completionDate'
      },
      platforms: {
        label: 'Platforms'
      },
      stores: {
        label: 'Stores'
      },
      game: {
        label: 'Game'
      }
    };

    const gameSelected = ref(props.gameModalState !== 'create');

    const onClose = () => context.emit('close');

    const { execute: executeAddGameToLibrary } = useMutation(AddGameToLibraryDocument);
    const { execute: executeUpdateGameInLibrary } = useMutation(UpdateGameInLibraryDocument);

    const onSave = () => {
      if (props.gameModalState === 'update') {
        updateGameInLibrary();
      } else {
        addGameToLibrary();
      }
    };

    const updateGameInLibrary = () => {
      if (gamePurchase.value.id === null) { return; }

      let gamePurchaseParams = {
        gamePurchaseId: gamePurchase.value.id,
        rating: Number(gamePurchase.value.rating),
        startDate: gamePurchase.value.startDate,
        completionDate: gamePurchase.value.completionDate,
        completionStatus: null as GamePurchaseCompletionStatus | null,
        comments: gamePurchase.value.comments,
        hoursPlayed: isNaN(gamePurchase.value.hoursPlayed) ? null : Number(gamePurchase.value.hoursPlayed),
        replayCount: Number(gamePurchase.value.replayCount),
        platforms: gamePurchase.value.platforms.map((p: { id: string, name: string }) => p.id),
        stores: gamePurchase.value.stores.map((s: { id: string, name: string }) => s.id)
      };

      if (gamePurchase.value.completionStatus) {
        gamePurchaseParams.completionStatus = GamePurchaseCompletionStatus[gamePurchase.value.completionStatus?.value];
      }

      executeUpdateGameInLibrary(gamePurchaseParams).then(updatedGamePurchase => {
        context.emit('create', updatedGamePurchase.data.updateGameInLibrary?.gamePurchase);
        context.emit('closeAndRefresh');
      });
    }

    const addGameToLibrary = () => {
      let gamePurchaseParams = {
        gameId: gamePurchase.value.game.id,
        rating: Number(gamePurchase.value.rating),
        startDate: gamePurchase.value.startDate,
        completionDate: gamePurchase.value.completionDate,
        completionStatus: null as GamePurchaseCompletionStatus | null,
        comments: gamePurchase.value.comments,
        hoursPlayed: isNaN(gamePurchase.value.hoursPlayed) ? null : Number(gamePurchase.value.hoursPlayed),
        replayCount: Number(gamePurchase.value.replayCount),
        platforms: gamePurchase.value.platforms.map((p: { id: string, name: string }) => p.id),
        stores: gamePurchase.value.stores.map((s: { id: string, name: string }) => s.id)
      };

      if (gamePurchase.value.completionStatus) {
        gamePurchaseParams.completionStatus = GamePurchaseCompletionStatus[gamePurchase.value.completionStatus?.value];
      }

      executeAddGameToLibrary(gamePurchaseParams).then(newlyAddedGamePurchase => {
        context.emit('create', newlyAddedGamePurchase.data.addGameToLibrary?.gamePurchase);
        context.emit('closeAndRefresh');
      });
    }

    const selectGame = () => gameSelected.value = true;

    // TODO: Figure out error handling
    // Note that refs in @vue/composition-api don't handle arrays well, allegedly?
    const errors: string[] = [];

    const modalTitle = computed(() => gamePurchase.value.game.name ?? 'Add a game to your library');

    return {
      gamePurchase,
      formData,
      formattedCompletionStatuses,
      gameSelected,
      modalTitle,
      selectGame,
      onClose,
      onSave,
      errors,
      GameSearchDocument,
      PlatformSearchDocument,
      StoreSearchDocument
    };
  }
});
</script>
