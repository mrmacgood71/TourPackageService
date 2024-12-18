<template>
  <div class="voucher-page">
    <div class="header">
      <div>
        <button @click="goBack">Назад</button>
        <h1>Выбор путевок</h1>
      </div>

    </div>

    <div class="search-form">
      <custom-dropdown
          class="custom-dropdown"
          v-model="departureCity"
          :options="cities"
          placeholder="Откуда вылет"
      />
      <custom-dropdown
          class="custom-dropdown"
          v-model="arrivalCity"
          :options="cities"
          placeholder="Где хочется побывать"
      />
      <button class="search-button" @click="searchVouchers">Найти</button>
    </div>

    <div v-if="loading">Loading vouchers...</div>

    <div v-else>

      <h2>Available Vouchers</h2>

      <div class="voucher-list">
        <div class="voucher-card" v-for="voucher in vouchers" :key="voucher.id">

          <h3>{{ voucher.hotelName }}</h3>
          <p><strong>Departure City:</strong> {{ voucher.departureCity }}</p>
          <p><strong>Arrival City:</strong> {{ voucher.arrivalCity }}</p>
          <p><strong>Price:</strong> ${{ voucher.price.toFixed(2) }}</p>

          <!-- Flight Path Element -->
          <div class="flight-path">
            <div class="point">
              <span>{{ voucher.departureCity }}</span>
            </div>
            <div class="line"></div>
            <div class="point">
              <span>{{ voucher.arrivalCity }}</span>
            </div>
            <div class="flight-time">
              <span>{{ calculateFlightTime(voucher.departureDate, voucher.arrivalDate) }}</span>
            </div>
          </div>
          <button @click="push">
            <router-link
                :to="{ name: 'VoucherDetails', state: { voucher } }">
              Подробнее
            </router-link>
          </button>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomDropdown from './CustomDropdown.vue';

export default {
  name: 'VoucherPage',
  components: {
    CustomDropdown,
  },

  data() {
    return {
      vouchers: [],
      loading: false,
      departureCity: '',
      arrivalCity: '',
      cities: ['Москва', 'Санкт-Петербург', 'Сочи', 'Новосибирск'],
    };
  },

  methods: {
    goBack() {
      this.$router.push('/');
    },
    push() {

      self.$router.push({
        name: 'voucher-details',
        params: {
          hotelId: 11,
          ticketId: 28
        }
      })

      this.$router.push('/voucher/details', );
    },
    async searchVouchers() {
      if (!this.departureCity || !this.arrivalCity) {
        alert("Please fill in both fields.");
        return;
      }

      this.loading = true;

      try {
        const ruCities = {
          'Москва': 'Moscow',
          'Санкт-Петербург': 'Saint-Petersburg',
          'Сочи': 'Sochi',
          'Новосибирск': 'Novosibirsk'
        }


        const response = await fetch(`http://localhost:8088/api/v1/vouchers/collect?arrivalCity=${ruCities[this.arrivalCity]}&departureCity=${ruCities[this.departureCity]}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          this.vouchers = Array.isArray(data) ? data : [data];
      } catch (error) {
        console.error('Error fetching voucher data:', error);
      } finally {
        this.loading = false;
      }
    },

    calculateFlightTime(departureDate, arrivalDate) {
      const departure = new Date(departureDate);
      const arrival = new Date(arrivalDate);

      const duration = arrival - departure;

      const totalMinutes = Math.floor(duration / (1000 * 60));

      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;

      return `${hours}h ${minutes}m`;
    }
  }
}
</script>

<style scoped>
.voucher-page {
  padding: 20px;
}

.search-form {
  display: flex;
  gap: 10px;
}

.custom-dropdown:hover {
  background-color: #fdd9bb;
}

.voucher-list {
  display: flex;
  flex-direction: column;
}

.voucher-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
  transition: padding 0.3s;
}

.voucher-card:hover {
  border: 1px solid #fdd9bb;
  padding: 24px;
  cursor: pointer;
}

button {
  text-decoration: none;
  padding: 10px 15px;
  background-color: #dae3e0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: padding 0.2s ease;
}
button:visited, button:active {
  text-decoration: none;
}

button:hover {
  background-color: #baefdd;
  padding: 20px 30px;
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

.point span:hover {
  padding: 16px;
}

.point span {
  display: block;
  background-color: #f0f0f0;
  border-radius: 50%;
  padding: 10px;
  transition: padding 0.3s;
}

.line {
  height: 2px;
  background-color: #ccc;
  flex-grow: 1; /* This allows the line to stretch between points */
}

.flight-time {
  margin-left: 10px; /* Space between line and flight time */
}

.search-button {
  padding: 10px 15px;
  background-color: #dae3e0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: padding 0.2s ease;
}

.search-button:hover {
  background-color: #fdd9bb;
  padding: 10px 30px;
}
</style>

