<template>
  <div class="profile">
    <!-- Display a message if the user's account is private or has been banned,
         and hide everything else unless the current user is a moderator or
         admin. -->
    <template v-if="(user.privacy === 'PUBLIC_ACCOUNT' && !userIsBanned) || currentUserIsModeratorOrAdmin">
      <!-- Users must be signed in to follow other users, and cannot follow themselves. -->
      <template v-if="userSignedIn && !currentUserIsUser">
        <button
          v-show="!isFollowing"
          @click="followUser()"
          class="button is-primary is-fullwidth-mobile mr-5 mr-0-mobile mt-10"
        >
          <span class="icon pl-5 mr-5">
            <SvgIcon :name="'user-plus'" :classes="['icon']" :fill="'white'" :size="15"/>
          </span>
          <span>Follow</span>
        </button>
        <button
          v-show="isFollowing"
          @click="unfollowUser()"
          class="button is-danger is-fullwidth-mobile mr-5 mr-0-mobile mt-10"
        >
          <span class="icon pl-5 mr-5">
            <SvgIcon :name="'user-minus'" :classes="['icon']" :fill="'white'" :size="15"/>
          </span>
          <span>Unfollow</span>
        </button>
      </template>
      <!-- Compare library button -->

      <div v-if="userSignedIn" id="actions-dropdown" class="dropdown is-fullwidth mr-0-mobile mt-10" :class="{ 'is-active': actionsDropdownIsActive }">
        <div class="dropdown-trigger is-fullwidth" @click="toggleActionsDropdown">
          <button class="button is-fullwidth" aria-haspopup="true" aria-controls="dropdown-menu">
            <span>Actions</span>
            <SvgIcon :name="'chevron-down'" :size="15" :classes="['icon']"/>
          </button>
        </div>

        <div class="dropdown-menu is-fullwidth" id="actions-dropdown-menu" role="menu">
          <div class="dropdown-content">
            <a v-if="currentUserIsModeratorOrAdmin && canMakeMember" class="dropdown-item" @click="updateUserRole('MEMBER')">Make member</a>
            <a v-if="currentUserIsModeratorOrAdmin && canMakeModerator" class="dropdown-item" @click="updateUserRole('MODERATOR')">Make moderator</a>
            <a v-if="currentUserIsModeratorOrAdmin && canMakeAdmin" class="dropdown-item" @click="updateUserRole('ADMIN')">Make admin</a>
            <a v-if="currentUserIsModeratorOrAdmin && canRemoveAvatar" class="dropdown-item has-text-danger" @click="removeUserAvatar">Remove avatar</a>
            <a v-if="currentUserIsModeratorOrAdmin && canBanUser && !userIsBanned" class="dropdown-item has-text-danger" @click="banUser">Ban user</a>
            <a v-if="currentUserIsModeratorOrAdmin && canBanUser && userIsBanned" class="dropdown-item has-text-danger" @click="unbanUser">Unban user</a>
          </div>
        </div>
      </div>

      <!-- User Statistics -->
      <!-- Library -->
    </template>
    <template v-else-if='user.banned === true'>
      <h2 class='subtitle has-text-centered has-text-weight-semibold mt-30'>This user's account has been banned.</h2>
    </template>
    <template v-else>
      <h2 class='subtitle has-text-centered has-text-weight-semibold mt-30'>This user's account is private.</h2>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useMutation } from 'villus';
import { FollowUserDocument, UnfollowUserDocument, BanUserDocument, UnbanUserDocument, RemoveUserAvatarDocument, UpdateUserRoleDocument, UserRole } from '@/generated/graphql';
import SvgIcon from '@/components/SvgIcon.vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'UserProfile',
  components: {
    SvgIcon
  },
  props: {
    user: {
      required: true,
      type: Object
    }
  },
  setup(props, context) {
    const isFollowing = computed(() => props.user.isFollowed);

    const store = useStore();
    const userSignedIn = computed(() => store.state.userSignedIn);

    const currentUserIsModeratorOrAdmin = computed(() => ['MODERATOR', 'ADMIN'].includes(store.state.currentUser.role));

    const userIsBanned = computed(() => props.user.banned);

    // Only allowed to ban a user if you're a moderator or admin.
    // Moderators can only ban members.
    const canBanUser = computed(() => {
      // Users cannot ban themselves.
      if (currentUserIsUser.value) {
        return false;
      }

      // Moderators can only ban members.
      if (store.state.currentUser.role === 'MODERATOR' && props.user.role === 'MEMBER') {
        return true;
      }

      // Admins can ban anyone.
      if (store.state.currentUser.role === 'ADMIN') {
        return true;
      }

      return false;
    });

    // Whether the current user can remove a given user's avatar.
    const canRemoveAvatar = computed(() => {
      // Users cannot remove their own avatar from the user page.
      if (currentUserIsUser.value) {
        return false;
      }

      // An avatar must be present for it to be removed.
      if (props.user.avatarUrl === null) {
        return false;
      }

      // Admins and moderators can remove anyone's avatar.
      if (currentUserIsModeratorOrAdmin.value) {
        return true;
      }

      return false;
    });

    // Whether the current user is the same as the user being viewed.
    const currentUserIsUser = computed(() => store.state.currentUser.slug === props.user.slug);

    const canMakeMember = computed(() => {
      // Cannot make a user into a member if they already are.
      if (props.user.role === 'MEMBER') {
        return false;
      }

      // Moderators cannot make other moderators or admins into members.
      if (store.state.currentUser.role === 'ADMIN') {
        return true;
      }

      return false;
    });

    const canMakeModerator = computed(() => {
      // Cannot make a user into a moderator if they already are.
      if (props.user.role === 'MODERATOR') {
        return false;
      }

      // Only admins can make moderators.
      if (store.state.currentUser.role === 'ADMIN') {
        return true;
      }

      return false;
    });

    // Only admins can modify other admins.
    const canMakeAdmin = computed(() => {
      // Cannot make a user into an admin if they already are.
      if (props.user.role === 'ADMIN') {
        return false;
      }

      // Only admins can make other admins.
      if (store.state.currentUser.role === 'ADMIN') {
        return true;
      }

      return false;
    });

    const actionsDropdownIsActive = ref(false);
    const toggleActionsDropdown = () => actionsDropdownIsActive.value = !actionsDropdownIsActive.value;

    const { execute: executeFollowUser } = useMutation(FollowUserDocument);
    const { execute: executeUnfollowUser } = useMutation(UnfollowUserDocument);
    const { execute: executeBanUser } = useMutation(BanUserDocument);
    const { execute: executeUnbanUser } = useMutation(UnbanUserDocument);
    const { execute: executeUpdateUserRole } = useMutation(UpdateUserRoleDocument);
    const { execute: executeRemoveUserAvatar } = useMutation(RemoveUserAvatarDocument);

    const followUser = () => {
      const userId = props.user.id;
      // TODO: Error handling here?
      if (typeof userId !== 'undefined') {
        executeFollowUser({ userId: userId }).then(() => {
          context.emit('refreshUserData', null);
        });
      }
    }
    const unfollowUser = () => {
      const userId = props.user.id;
      // TODO: Error handling here?
      if (typeof userId !== 'undefined') {
        executeUnfollowUser({ userId: userId }).then(() => {
          context.emit('refreshUserData', null);
        });
      }
    }

    const updateUserRole = (role: UserRole) => {
      const userId = props.user.id;
      // TODO: Error handling here?
      if (typeof userId !== 'undefined') {
        if (confirm("Are you sure you want to update this user's role?")) {
          executeUpdateUserRole({ userId: userId, role: role }).then(() => {
            context.emit('refreshUserData', null);
          });
        }
      }
    }

    const removeUserAvatar = () => {
      const userId = props.user.id;
      // TODO: Error handling here?
      if (typeof userId !== 'undefined') {
        if (confirm("Are you sure you want to remove this user's avatar?")) {
          executeRemoveUserAvatar({ userId: userId }).then(() => {
            context.emit('refreshUserData', null);
          });
        }
      }
    }

    const banUser = () => {
      const userId = props.user.id;
      // TODO: Error handling here?
      if (typeof userId !== 'undefined') {
        if (confirm("Are you sure you want to ban this user?")) {
          executeBanUser({ userId: userId }).then(() => {
            context.emit('refreshUserData', null);
          });
        }
      }
    }

    const unbanUser = () => {
      const userId = props.user.id;
      // TODO: Error handling here?
      if (typeof userId !== 'undefined') {
        if (confirm("Are you sure you want to unban this user?")) {
          executeUnbanUser({ userId: userId }).then(() => {
            context.emit('refreshUserData', null);
          });
        }
      }
    }

    return {
      isFollowing,
      userSignedIn,
      followUser,
      unfollowUser,
      removeUserAvatar,
      updateUserRole,
      banUser,
      unbanUser,
      toggleActionsDropdown,
      actionsDropdownIsActive,
      userIsBanned,
      currentUserIsModeratorOrAdmin,
      canBanUser,
      canMakeMember,
      canMakeModerator,
      canMakeAdmin,
      canRemoveAvatar,
      currentUserIsUser
    };
  }
});
</script>
