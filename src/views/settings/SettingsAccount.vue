<template>
  <div class="column">
    <h1 class="title">Account</h1>
    <!-- <%= form_for(@user, url: registration_path('user'), html: { method: :put, id: 'new-user' }) do |f| %>
      <%= render "devise/shared/error_messages" %>

      <div class="field">
        <%= f.label :email, class: "label" %>
        <div class="control">
          <%= f.email_field :email, value: @user.email, autofocus: true, autocomplete: "email", disabled: true, class: "input is-disabled" %>
        </div>
      </div>

      <% if devise_mapping.confirmable? && resource.pending_reconfirmation? %>
        <div>Currently awaiting confirmation for: <%= resource.unconfirmed_email %></div>
      <% end %>

      <div class="field">
        <%= f.label :current_password, class: "label" %>
        <div class="control">
          <%= f.password_field :current_password, autocomplete: "current-password", class: "input" %>
          <p class="help">(we need your current password to confirm your changes)</p>
        </div>
      </div>

      <div class="field">
        <%= f.label :password, 'New password', class: "label" %>
        <div class="control">
          <%= f.password_field :password, autocomplete: "new-password", class: "input" %>
          <% if @minimum_password_length %>
            <p class="help">(<%= @minimum_password_length %> characters minimum, leave blank if you don't want to change it)</p>
          <% end %>
        </div>
      </div>

      <div class="field">
        <%= f.label :password_confirmation, 'New password confirmation', class: "label" %>
        <div class="control">
          <%= f.password_field :password_confirmation, autocomplete: "new-password", class: "input" %>
        </div>
      </div>

      <%= f.invisible_captcha :honey, nonce: true %>

      <div class="field">
        <%= f.submit "Update", class: "button is-primary" %>
      </div>
    <% end %>

    <h2 class="subtitle is-3 mt-25 mb-10">Reset game library</h2>

    <p>This will remove every game from your library, along with scores, hours played, completion status, etc. <span class="has-text-weight-semibold">This is permanent and cannot be undone.</span></p>

    <p><%= button_to "Reset my game library", reset_game_library_user_path(@user), data: { confirm: "Are you sure you want to reset your game library? This can't be undone." }, method: :delete, class: 'button is-danger mt-5' %></p>

    <h2 class="subtitle is-3 mt-25 mb-10">Delete account</h2>

    <p><%= button_to "Delete my account", registration_path(resource_name), data: { confirm: "Are you sure you want to delete your account? This can't be undone." }, method: :delete, class: 'button is-danger' %></p> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SettingsAccount',
  setup() {
    return {};
  }
});
</script>
