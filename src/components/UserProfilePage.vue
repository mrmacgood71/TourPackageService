<template>
  <div class="profile-container">
    <button class="back-button" @click="goBack">Back to Main Page</button>
    <h1>User Profile</h1>
    <div v-if="loading">Loading user data...</div>
    <div v-else-if="errorMessage">{{ errorMessage }}</div>
    <div v-else>
      <img v-if="user.imageUrl" :src="user.imageUrl" alt="User Image" class="profile-image" />
      <p><strong>Name:</strong> {{ user.firstName }} {{ user.lastName }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Phone:</strong> {{ user.phone }}</p>
      <p><strong>Age:</strong> {{ user.age }}</p>
      <p><strong>Role:</strong> {{ user.role }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserProfilePage',
  data() {
    return {
      user: {},
      loading: true,
      errorMessage: ''
    };
  },
  mounted() {
    this.fetchUserProfile(); // Fetch user profile when component is mounted
  },
  methods: {
    goBack() {
      this.$router.push('/'); // Navigate back to the main page
    },
    async fetchUserProfile() {
      const userId = localStorage.getItem('userId'); // Get userId from local storage

      if (!userId) {
        this.errorMessage = "User ID not found.";
        this.loading = false;
        return;
      }

      try {
        const response = await fetch(`http://localhost:8086/api/v1/users/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        this.user = await response.json(); // Parse JSON response
      } catch (error) {
        console.error('Error fetching user profile:', error);
        this.errorMessage = "Failed to load user profile.";
      } finally {
        this.loading = false; // Set loading to false after fetching
      }
    }
  }
}
</script>

<style scoped>
.profile-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.back-button {
  margin-bottom: 20px; /* Space below the button */
  padding: 10px 15px; /* Padding for button */
  background-color: #007bff; /* Primary color */
  color: white; /* Text color */
  border: none; /* Remove border */
  border-radius: 5px; /* Rounded corners */
  cursor: pointer; /* Pointer cursor on hover */
}

.back-button:hover {
  background-color: #0056b3; /* Darker shade on hover */
}

.profile-image {
  max-width: 100%;
  height: auto;
  border-radius: 50%; /* Make the image circular */
}

h1 {
  text-align: center; /* Center align heading */
}

p {
  margin: 10px 0; /* Space between paragraphs */
}

/* Alert Styles */
.alert {
  color: red; /* Text color for alert */
  margin-top: 10px; /* Space above alert */
  text-align: center; /* Center align alert message */
}
</style>
