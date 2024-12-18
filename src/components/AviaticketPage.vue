<template>
  <div class="header">
    <button @click="goBack">На главную</button>
  </div>
  <div>
    <div class="search-form">
      <input
          type="text"
          v-model="departureCity"
          placeholder="Departure City"
      />
      <input
          type="text"
          v-model="arrivalCity"
          placeholder="Arrival City"
      />
      <input
          type="date"
          v-model="departureDate"
      />
      <button @click="searchTickets">Поиск</button>
    </div>

    <div v-if="loading">Загрузка билетов...</div>
    <div v-else>
      <h1>Актулальные билеты</h1>

      <div class="ticket-list">
        <div class="ticket-card" v-for="ticket in tickets" :key="ticket.id">
          <h2>{{ ticket.airline }}</h2>
          <p><strong>Откуда:</strong> {{ ticket.departureCity }}</p>
          <p><strong>Куда:</strong> {{ ticket.arrivalCity }}</p>
          <p><strong>Вылет:</strong> {{ formatDate(ticket.departureDate) }}</p>
          <p><strong>Посадка:</strong> {{ formatDate(ticket.arrivalDate) }}</p>
          <p><strong>Цена:</strong> ${{ ticket.price.toFixed(2) }}</p>
          <p><strong>Самолёт:</strong> {{ ticket.plane }}</p>
          <p><strong>Осталось билетов:</strong> {{ ticket.capacity }} seats</p>

          <!-- Flight Path Element -->
          <div class="flight-path">
            <div class="point">
              <span>{{ ticket.departureCity }}</span>
            </div>
            <div class="line"></div>
            <div class="point">
              <span>{{ ticket.arrivalCity }}</span>
            </div>
            <div class="flight-time">
              <span>{{ calculateFlightTime(ticket.departureDate, ticket.arrivalDate) }}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AviaticketPage',
  data() {
    return {
      tickets: [],
      loading: true,
      departureCity: '',
      arrivalCity: '',
      departureDate: '',
    };
  },
  mounted() {
    this.fetchTickets();
  },
  methods: {
    calculateFlightTime(departureDate, arrivalDate) {
      const departure = new Date(departureDate);
      const arrival = new Date(arrivalDate);

      // Calculate the difference in milliseconds
      const duration = arrival - departure;

      // Convert milliseconds to minutes
      const totalMinutes = Math.floor(duration / (1000 * 60));

      // Calculate hours and minutes
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;

      // Return formatted string
      return `${hours}h ${minutes}m`;
    },
    goBack() {
      this.$router.push('/');
    },
    async fetchTickets() {
      try {
        const response = await fetch('http://localhost:8091/api/v1/tickets');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        this.tickets = Array.isArray(data) ? data : [data]; // Ensure tickets is an array
      } catch (error) {
        console.error('Error fetching ticket data:', error);
      } finally {
        this.loading = false; // Set loading to false after fetching
      }
    },
    async searchTickets() {
      if (!this.departureCity || !this.arrivalCity || !this.departureDate) {
        alert("Please fill in all fields.");
        return;
      }

      this.loading = true; // Set loading state while searching

      try {
        const response = await fetch(`http://localhost:8091/api/v1/tickets/find?departure=${this.departureCity}&arrival=${this.arrivalCity}&departureDate=${this.departureDate}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        this.tickets = Array.isArray(data) ? data : [data];
      } catch (error) {
        console.error('Error searching ticket data:', error);
      } finally {
        this.loading = false; // Set loading to false after searching
      }
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    }
  }
}
</script>

<style scoped>
.search-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.ticket-list {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 20px;
}

.ticket-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}
button {
  padding: 10px 15px;
  background-color: #fff;
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
  margin: 10px 0; /* Adjust margin as needed */
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
  flex-grow: 1; /* This allows the line to stretch between points */
}

.flight-time {
  margin-left: 10px; /* Space between line and flight time */
}

</style>