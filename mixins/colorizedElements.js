export const colorizedElements = {
  props: {
    skyblue: {
      type: Boolean,
      required: false,
      default: false
    },
    green: {
      type: Boolean,
      required: false,
      default: false
    },
    yellow: {
      type: Boolean,
      required: false,
      default: false
    },
    grapefruit: {
      type: Boolean,
      required: false,
      default: false
    },
    violet: {
      type: Boolean,
      required: false,
      default: false
    },
    black: {
      type: Boolean,
      required: false,
      default: false
    },
    red: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    color() {
      return this.skyblue ? 'skyblue' :
        this.green ? 'green' :
          this.yellow ? 'yellow' :
            this.grapefruit ? 'grapefruit' :
              this.violet ? 'violet' :
                this.black ? 'black' :
                  this.red ? 'red' : '';
    }
  }
};
