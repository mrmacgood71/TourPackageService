<template>
  <div class="auth-container">
    <h1>Authentication</h1>

    <!-- Toggle Switch -->
    <div class="toggle-container">
      <label class="switch">
        <input type="checkbox" v-model="isRegistering" />
        <span class="slider"></span>
      </label>
      <span>{{ isRegistering ? 'Register' : 'Login' }}</span>
    </div>

    <!-- Registration Form -->
    <div v-if="isRegistering" class="form-container">
      <h2>Register</h2>
      <form @submit.prevent="registerUser">
        <input type="email" v-model="registerData.username" placeholder="Email" required />
        <input type="password" v-model="registerData.password" placeholder="Password" required />
        <input type="text" v-model="registerData.firstName" placeholder="First Name" required />
        <input type="text" v-model="registerData.lastName" placeholder="Last Name" required />
        <button type="submit">Register</button>
      </form>
    </div>

    <!-- Login Form -->
    <div v-else class="form-container">
      <h2>Login</h2>
      <form @submit.prevent="loginUser">
        <input type="email" v-model="loginData.username" placeholder="Email" required />
        <input type="password" v-model="loginData.password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>

    <!-- Alert Message -->
    <div v-if="errorMessage" class="alert">{{ errorMessage }}</div>
  </div>
</template>

<script>

export default {

  name: 'AuthPage',
  data() {
    return {
      isRegistering: false, // Flag to toggle between register and login
      registerData: {
        username: '',
        password: '',
        firstName: '',
        lastName: ''
      },
      loginData: {
        username: '',
        password: ''
      },
      errorMessage: '' // To hold error messages
    };
  },
  methods: {

    async registerUser() {
      try {
        const response = await fetch('http://localhost:8090/auth/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.registerData)
        });

        if (!response.ok) {
          throw new Error('Registration failed');
        }

        const data = await response.json();
        console.log('Registration successful:', data);

        // Redirect to main page after successful registration
        this.$router.push('/');
      } catch (error) {
        console.error('Error during registration:', error);

        // Set error message and redirect to main page
        this.errorMessage = "Registration failed. Please try again.";
        setTimeout(() => {
          this.$router.push('/');
          alert(this.errorMessage); // Show alert with the error message
        }, 1000); // Delay for a moment before redirecting
      }
    },
    async loginUser() {
      const client_id = 'spring-app'; // Replace with actual client_id
      const client_secret = 'your_client_secret'; // Replace with actual client_secret

      const body = new URLSearchParams({
        grant_type: 'password',
        client_id,
        username: this.loginData.username,
        password: this.loginData.password
      });

      try {
        const response = await fetch('http://localhost:9082/realms/spring/protocol/openid-connect/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: body.toString()
        });

        if (!response.ok) {
          throw new Error('Login failed');
        }

        const data = await response.json();

        var base64Url = data.access_token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        let userInfo = JSON.parse(jsonPayload);
        console.log(userInfo);

        // Store tokens in local storage or Vuex
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        localStorage.setItem('userId', userInfo.sub)

        console.log('Login successful:', data);

        // Redirect to main page after successful login
        this.$router.push('/');
      } catch (error) {
        console.error('Error during login:', error);

        // Set error message and redirect to main page
        this.errorMessage = "Login failed. Please try again.";
        setTimeout(() => {
          this.$router.push('/');
          alert(this.errorMessage); // Show alert with the error message
        }, 1000); // Delay for a moment before redirecting
      }
    }
  }
}
</script>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.toggle-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px; /* Space below the toggle */
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
}

.slider::before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
}

input:checked + .slider {
  background-color: #007bff; /* Color when checked */
}

input:checked + .slider::before {
  transform: translateX(26px); /* Move the slider */
}

.form-container {
  margin-bottom: 20px; /* Space below each form */
}

h1, h2 {
  text-align:center; /* Center align headings */
}

input {
  width: calc(100% - 30px);
  padding: 10px;
  margin-bottom: 20px;
}

button {
  width: calc(100% - 10px);
  background-color: #007bff;
  color: white;
  cursor: pointer;
  height: 40px;
}

button:hover {
  background-color: #238af8;
}

/* Alert Styles */
.alert {
  margin-top :10px; /* Space above alert */
  text-align:center; /* Center align alert message */
}
</style>