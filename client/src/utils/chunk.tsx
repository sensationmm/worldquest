Object.defineProperty(Array.prototype, 'chunk', {
  value: function (size: number) {
    return Array.from({ length: Math.ceil(this.length / size) }, (_, i) => this.slice(i * size, i * size + size));
  },
});
