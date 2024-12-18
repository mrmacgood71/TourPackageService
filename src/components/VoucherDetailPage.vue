<template>
  <div class="voucher-details">

    <div v-if="loading">Loading details...</div>

    <div v-else>
      <button class="back-button" @click="goBack">Back to Main Page</button>
      <h1>{{ hotel.name }}</h1>
      <img :src="hotel.imageUrl" alt="Hotel Image"/>
      <p><strong>Description:</strong> {{ hotel.description }}</p>
      <p><strong>Address:</strong> {{ hotel.address }}, {{ hotel.city }}, {{ hotel.country }}</p>

      <h2>Rooms</h2>
      <div class="room-list">
        <div class="room-card" v-for="room in hotel.rooms" :key="room.id">
          <h3>{{ room.name }}</h3>
          <p><strong>Price:</strong> ${{ room.price.toFixed(2) }}</p>
          <p><strong>Description:</strong> {{ room.description }}</p>
          <p><strong>Capacity:</strong> {{ room.capacity }} guests</p>
          <p><strong>Status:</strong> {{ room.status }}</p>
          <div class="room-images">
            <img v-for="image in room.images" :key="image" :src="image" alt="Room Image"/>
          </div>
        </div>
      </div>

      <h2>Ticket Details</h2>
      <p><strong>Departure City:</strong> {{ ticket.departureCity }}</p>
      <p><strong>Arrival City:</strong> {{ ticket.arrivalCity }}</p>
      <p><strong>Departure Date:</strong> {{ formatDate(ticket.departureDate) }}</p>
      <p><strong>Arrival Date:</strong> {{ formatDate(ticket.arrivalDate) }}</p>
      <p><strong>Price:</strong> ${{ ticket.price.toFixed(2) }}</p>


      <div class="flight-path">
        <div class="point">
          <span>{{ ticket.departureCity }}</span>
        </div>
        <div class="line"></div>
        <div class="point">
          <span>{{ ticket.arrivalCity }}</span>
        </div>
      </div>
      <!-- Flight Time Element -->
      <div class="flight-time">
        Flight Time: {{ calculateFlightTime(ticket.departureDate, ticket.arrivalDate) }}
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router/index.js";

export default {
  name: 'VoucherDetailsPage',
  props: {
    voucher: { // Accepting the entire voucher object as a prop
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      hotel: {},
      ticket: {},
      loading: true,
    };
  },


  mounted() {

    // Accessing the passed voucher object from route state
    // const voucher = this.$route.state.voucher;
    //
    //
    // if (voucher) {
    //   // You can use the voucher data directly here
    //   console.log('Selected Voucher:', voucher);
    // } else {
    //   console.error('No voucher data found');
    // }


    // console.log(voucher)
    const hotelId = router.currentRoute.value.params.hotelId;
    const ticketId = router.currentRoute.value.params.ticketId;



    this.fetchHotelDetails(hotelId);
    this.fetchTicketDetails(ticketId);
  },
  methods: {
    goBack() {
      this.$router.push('/tour-package');
    },
    async fetchHotelDetails(hotelId) {
      try {
        const response = await fetch(`http://localhost:8087/api/v1/hotels/${hotelId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        this.hotel = await response.json();
      } catch (error) {
        console.error('Error fetching hotel data:', error);
      }
    },

    async fetchTicketDetails(ticketId) {

      try {
        const response = await fetch(`http://localhost:8091/api/v1/tickets/${ticketId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        this.ticket = await response.json();
      } catch (error) {
        console.error('Error fetching hotel data:', error);
      }

      this.loading = false;
    },

    calculateFlightTime(departureDate, arrivalDate) {
      const departure = new Date(departureDate);
      const arrival = new Date(arrivalDate);

      const duration = arrival - departure;

      const totalMinutes = Math.floor(duration / (1000 * 60));

      const hours = Math.abs(Math.floor(totalMinutes / 60));
      const minutes = totalMinutes % 60;

      return `${hours}h ${minutes}m`;
    },

    formatDate(dateString) {
      const options = {year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'};
      return new Date(dateString).toLocaleDateString(undefined, options);
    }
  }
}
</script>

<style scoped>
.voucher-details {
  padding: 20px;
}

.room-list {
  display: flex;
  flex-direction: column;
}

.room-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
}

.room-images img {
  width: 100px;
  margin-right: 10px;
}

.flight-time {
  margin-top: 10px;
}

button {
  padding: 10px 15px;
  background-color: #dae3e0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #dae3e0;
}

.flight-path {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
}

.point {
  position: relative;
  padding: 10px;
}

.point span {
  display: block;
  background-color: #f0f0f0;
  border-radius: 50%;
  padding: 10px;
}

.line {
  height: 2px;
  background-color: #ccc;
  flex-grow: 1;
}

.flight-time {
  margin-left: 10px;
}

img:hover  {
  max-height: 520px;
  max-width: 85%;
  border-radius: 20px;
}

img{
  max-height: 480px;
  max-width: 80%;
  border-radius: 20px;
  transition: max-height .5s;
}
</style>

