<template>
  <div>
    <div class="header">
      <button @click="goBack">Назад</button>
      <router-link to="/user-profile" class="user-icon">👤</router-link>
    </div>

    <div v-if="loading">Loading hotels...</div>
    <div v-else>
      <h1>Доступные отели</h1>

      <input
          type="text"
          v-model="searchQuery"
          @input="debouncedSearch"
          placeholder="Search for hotels..."
      />

      <div class="hotel-list">
        <div class="hotel-card" v-for="hotel in hotels" :key="hotel.id" @click="viewHotelDetails(hotel.id)">
          <img class="hotel-image" :src="hotel.imageUrl" alt="Hotel Image" />
          <div class="hotel-details">
            <h2>{{ hotel.name }}</h2>
            <p><strong>Описание:</strong> {{ hotel.description }}</p>
            <p><strong>Адресс:</strong> {{ hotel.address }}, {{ hotel.city }}, {{ hotel.country }}</p>
          </div>
          <hr />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash';

export default {
  name: 'HotelPage',
  data() {
    return {
      hotels: [],
      loading: true,
      searchQuery: '',
    };
  },
  mounted() {
    this.fetchHotels();
    this.debouncedSearch = debounce(this.searchHotels, 800);
  },
  methods: {
    goBack() {
      this.$router.push('/');
    },
    async fetchHotels() {
      try {
        const response = await fetch('http://localhost:8087/api/v1/hotels');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        this.hotels = data;
      } catch (error) {
        console.error('Error fetching hotel data:', error);
      } finally {
        this.loading = false;
      }
    },
    async searchHotels() {
      if (this.searchQuery.length < 3) return this.fetchHotels();

      try {
        const response = await fetch(`http://localhost:8087/api/v1/hotels/search?query=${this.searchQuery}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        this.hotels = data;
      } catch (error) {
        console.error('Error searching hotels:', error);
      }
    },
    viewHotelDetails(hotelId) {
      this.$router.push(`/hotel/${hotelId}`);
    }
  }
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
}

.user-icon {
  font-size: 24px;
}

.hotel-list {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.hotel-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: start;
}

.hotel-card:hover {
  transition-duration: 0.5s;
  background-color: #dae3e0;
}

.hotel-details {
  text-align: left;
}

.hotel-image {
  max-width: 40%;
  max-height: 320px;
  border-radius: 20px;
  justify-self: left;
}

hr {
  margin-top: 16px;
}
input[type="text"] {
  padding: 16px;
  width: 700px;
  margin-bottom: 10px;
  border-radius: 8px;
}
button {
  border-radius: 8px;
  padding: 8px;
  background: #fff;
}
</style>