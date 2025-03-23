class CircularBuffer {
    constructor(size) {
      this.size = size;
      this.buffer = [];
      this.index = 0;
    }
  
    add(value) {
      if (this.buffer.length < this.size) {
        this.buffer.push(value);
      } else {
        this.buffer[this.index] = value;
      }
      this.index = (this.index + 1) % this.size;
    }
  
    getValues() {
      return this.buffer;
    }
  
    isFull() {
      return this.buffer.length === this.size;
    }
  }
  
  class SMACalculator {
    constructor(shortPeriod = 3, longPeriod = 5) {
      this.shortBuffer = new CircularBuffer(shortPeriod);
      this.longBuffer = new CircularBuffer(longPeriod);
    }
  
    addPrice(price) {
      this.shortBuffer.add(price);
      this.longBuffer.add(price);
    }
  
    calculateSMA(buffer) {
      const values = buffer.getValues();
      if (values.length < buffer.size) return null;
      return values.reduce((sum, val) => sum + val, 0) / values.length;
    }
  
    getSMAs() {
      return {
        shortSMA: this.calculateSMA(this.shortBuffer),
        longSMA: this.calculateSMA(this.longBuffer),
      };
    }
  }
  
  module.exports = { SMACalculator };