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
          <!-- <SingleSelect
            :label="formData.game.label"
            v-model="gamePurchase.game"
            :search-path-identifier="'games'"
            :max-height="'150px'"
            :disabled="true"
            @input="selectGame"
          ></SingleSelect> -->

          <StaticSingleSelect
            :label="formData.completionStatus.label"
            v-model="gamePurchase.completionStatus"
            :options="formattedCompletionStatuses"
          ></StaticSingleSelect>

          <NumberField
            :form-class="formData.class"
            :attribute="formData.rating.attribute"
            :label="formData.rating.label"
            :required="false"
            :max="100"
            v-model="gamePurchase.rating"
          ></NumberField>

          <NumberField
            :form-class="formData.class"
            :attribute="formData.hoursPlayed.attribute"
            :label="formData.hoursPlayed.label"
            :required="false"
            v-model="gamePurchase.hoursPlayed"
          ></NumberField>

          <NumberField
            :form-class="formData.class"
            :attribute="formData.replayCount.attribute"
            :label="formData.replayCount.label"
            :required="false"
            v-model="gamePurchase.replayCount"
          ></NumberField>

          <TextArea
            :form-class="formData.class"
            :attribute="formData.comments.attribute"
            :label="formData.comments.label"
            :required="false"
            v-model="gamePurchase.comments"
          ></TextArea>

          <DateField
            :form-class="formData.class"
            :attribute="formData.startDate.attribute"
            :label="formData.startDate.label"
            :required="false"
            v-model="gamePurchase.startDate"
          ></DateField>

          <DateField
            :form-class="formData.class"
            :attribute="formData.completionDate.attribute"
            :label="formData.completionDate.label"
            :required="false"
            v-model="gamePurchase.completionDate"
          ></DateField>

          <!-- <MultiSelect
            :label="formData.platforms.label"
            v-model="gamePurchase.platforms"
            :search-path-identifier="'platforms'"
          ></MultiSelect> -->

          <!-- <MultiSelect
            :label="formData.stores.label"
            v-model="gamePurchase.stores"
            :search-path-identifier="'stores'"
          ></MultiSelect> -->
        </div>

        <div v-else>
          <!-- <SingleSelect
            :label="formData.game.label"
            v-model="gamePurchase.game"
            :search-path-identifier="'games'"
            :max-height="'150px'"
            @input="selectGame"
          ></SingleSelect> -->
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
import { computed, defineComponent, ref } from '@vue/composition-api';
import { useMutation } from 'villus';

import TextArea from '@/components/fields/TextArea.vue';
import NumberField from '@/components/fields/NumberField.vue';
import DateField from '@/components/fields/DateField.vue';
// import SingleSelect from '@/components/fields/SingleSelect.vue';
// import MultiSelect from '@/components/fields/MultiSelect.vue';
import StaticSingleSelect from '@/components/fields/StaticSingleSelect.vue';

export default defineComponent({
  name: 'GameModal',
  components: {
    TextArea,
    NumberField,
    DateField,
    // SingleSelect,
    // MultiSelect,
    StaticSingleSelect
  },
  props: {
    id: {
      type: Number,
      required: false
    },
    rating: {
      type: [Number, String],
      required: false,
      default: ''
    },
    hoursPlayed: {
      type: [Number, String],
      required: false,
      default: ''
    },
    replayCount: {
      type: [Number, String],
      required: false,
      default: 0
    },
    completionStatus: {
      type: Object,
      required: false
    },
    startDate: {
      type: String,
      required: false
    },
    completionDate: {
      type: String,
      required: false
    },
    comments: {
      type: String,
      required: false,
      default: ''
    },
    platforms: {
      type: Array,
      required: false,
      default: function() {
        return [];
      }
    },
    stores: {
      type: Array,
      required: false,
      default: function() {
        return [];
      }
    },
    game: {
      type: Object,
      required: false,
      default: function() {
        return {};
      }
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
  setup(props: any, context: any) {
    const gamePurchase = computed(() => {
      return {
        comments: props.comments,
        rating: props.rating,
        game: props.game,
        userId: context.root.$store.state.currentUser.id,
        completionStatus: props.completionStatus,
        startDate: props.startDate,
        completionDate: props.completionDate,
        hoursPlayed: parseFloat(props.hoursPlayed),
        replayCount: props.replayCount,
        platforms: props.platforms,
        stores: props.stores
      }
    });

    const formData = computed(() => {
      return {
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
      }
    });

    const formattedCompletionStatuses = computed(() => {
      let completionStatuses = {
        unplayed: 'Unplayed',
        in_progress: 'In Progress',
        paused: 'Paused',
        dropped: 'Dropped',
        completed: 'Completed',
        fully_completed: '100% Completed',
        not_applicable: 'N/A'
      }
      return Object.entries(completionStatuses).map(status => {
        return { label: status[1], value: status[0] };
      });
    });

    const gameSelected = ref(props.gameModalState !== 'create');

    const onClose = () => context.emit('close');
    const onSave = () => {
      console.log('TODO: Submit with mutation');
    };

    const selectGame = () => gameSelected.value = true;

    // TODO: Figure out error handling
    const errors: string[] = [];

    const modalTitle = computed(() => {
      return gamePurchase.value.game.name !== undefined
        ? gamePurchase.value.game.name
        : 'Add a game to your library';
    });

    return {
      gamePurchase,
      formData,
      formattedCompletionStatuses,
      gameSelected,
      modalTitle,
      selectGame,
      onClose,
      onSave,
      errors
    };
  }
});
</script>
