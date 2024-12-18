<template>
  <div v-if="loading">Loading hotel details...</div>
  <div v-else-if="hotel">
    <h1>{{ hotel.name }}</h1>
    <img :src="hotel.imageUrl" alt="Hotel Image" />
    <p><strong>Description:</strong> {{ hotel.description }}</p>
    <p><strong>Address:</strong> {{ hotel.address }}, {{ hotel.city }}, {{ hotel.country }}</p>

    <h2>Rooms</h2>
    <ul>
      <li v-for="room in hotel.rooms" :key="room.id">
        <h3>{{ room.name }}</h3>
        <p><strong>Price:</strong> ${{ room.price.toFixed(2) }}</p>
        <p><strong>Description:</strong> {{ room.description }}</p>
        <p><strong>Capacity:</strong> {{ room.capacity }} guests</p>
        <p><strong>Status:</strong> {{ room.status }}</p>
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  name: 'HotelDetailPage',
  data() {
    return {
      hotel: null,
      loading: true,
    };
  },
  mounted() {
    this.fetchHotelDetails();
  },
  methods: {
    async fetchHotelDetails() {
      const hotelId = this.$route.params.id;
      try {
        const response = await fetch(`http://localhost:8087/api/v1/hotels/${hotelId}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        this.hotel = data; // Assign fetched data to hotel
      } catch (error) {
        console.error('Error fetching hotel details:', error);
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
img:hover  {
  max-height: 500px;
  max-width: 85%;
  border-radius: 20px;
}

img{
  max-height: 480px;
  max-width: 80%;
  border-radius: 20px;
  transition: max-width .3s;
}

</style>