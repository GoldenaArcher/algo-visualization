export default class UnionFind {
  constructor() {
    this.rank = {};
    this.parents = {};
  }

  makeSet(x) {
    this.parents[x] = x;
    this.rank[x] = 0;
  }

  findSet(x) {
    if (this.parents[x] !== this.parents[this.parents[x]]) {
      this.parents[x] = this.findSet(this.parents[this.parents[x]]);
    }

    return this.parents[x];
  }

  link(x, y) {
    if (this.rank[x] > this.rank[y]) {
      this.parents[y] = x;
    } else {
      this.parents[x] = y;
      if (this.rank[x] === this.rank[y]) {
        this.rank[y] = this.rank[y] + 1;
      }
    }
  }

  union(x, y) {
    this.link(this.findSet(x), this.findSet(y));
  }
}
