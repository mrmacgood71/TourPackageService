<template>
  <div>
    <h1>Добро пожаловать!</h1>
    <h2>Выберите вариант</h2>
    <ul class="options-list">
      <li><router-link to="/hotel">Выбрать отель</router-link></li>
      <li><router-link to="/avia-ticket">Выбрать авиабилет</router-link></li>
      <li><router-link to="/tour-package">Выбрать путёвку</router-link></li>
      <li>
        <router-link v-if="!isAuthenticated" to="/auth">Войти в личный кабинет</router-link>
        <span v-else @click="goToProfile" class="profile-link">Личный кабинет</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { isAuthenticated } from '../utils/auth'; // Import the auth utility

export default {
  name: 'MainPage',
  computed: {
    isAuthenticated() {
      return isAuthenticated(); // Check if the user is authenticated
    }
  },
  methods: {
    goToProfile() {
      this.$router.push('/user-profile'); // Navigate to user profile page
    }
  }
}
</script>

<style scoped>
.options-list {
  list-style-type: none; /* Remove default bullet points */
  padding: 0; /* Remove default padding */
  margin: 20px 0; /* Add margin above and below the list */
}

.options-list li {
  margin: 10px 0; /* Space between list items */
}

.options-list li a {
  display: block; /* Make the link fill the entire list item */
  padding: 10px 15px; /* Add padding for clickable area */
  background-color: #e2edf8; /* Background color */
  text-decoration: none; /* Remove underline from links */
  border-radius: 5px; /* Rounded corners */
  transition: background-color 0.3s ease; /* Smooth transition for hover effect */
}

.options-list li a:hover {
  background-color: #dae3e0; /* Darker shade on hover */
}

.profile-link {
  display: block;
  padding: 10px 15px; /* Add padding for clickable area */
  background-color: #e2edf8; /* Background color for profile link */
  text-decoration: none; /* Remove underline */
  border-radius: 5px; /* Rounded corners */
  cursor: pointer; /* Pointer cursor on hover */
}

.profile-link:hover {
  background-color: #dae3e0; /* Darker shade on hover */
}
</style>
