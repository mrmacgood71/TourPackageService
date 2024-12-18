<template>
  <svg :width="width" :height="height" class="flight-path">
    <path
        :d="curvePath"
        stroke="blue"
        stroke-width="2"
        fill="none"
    />
  </svg>
</template>

<script>
export default {
  props: {
    departure: {
      type: Object,
      required: true,
    },
    arrival: {
      type: Object,
      required: true,
    },
    width: {
      type: Number,
      default: 300,
    },
    height: {
      type: Number,
      default: 200,
    },
  },
  computed: {
    curvePath() {
      const { x: x1, y: y1 } = this.departure;
      const { x: x2, y: y2 } = this.arrival;

      // Calculate control points for the curve
      const controlX = (x1 + x2) / 2;
      const controlY = Math.min(y1, y2) - 50; // Adjust the height of the curve

      return `M ${x1} ${y1} Q ${controlX} ${controlY}, ${x2} ${y2}`;
    },
  },
};
</script>

<style scoped>
.flight-path {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
