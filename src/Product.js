'use strict';

const PRICE_MIN_VALUE = 0;

class Product {

  constructor(name, sellIn, price) {  // Not modified, validate method must be called
    this.name = name;
    this.sellIn = sellIn;
    this.price = price;
  }

  validate() {
    if (typeof this.name !== 'string') {
      throw Error('product name must be a string');
    }
    if (typeof this.sellIn !== 'number') throw Error('sellIn must be a number');
    if (typeof this.price !== 'number') {
      throw Error('price must be a number');
    } else if (this.price < PRICE_MIN_VALUE) {
      throw Error(`Price value must be greater or equal than ${PRICE_MIN_VALUE}`);
    }
  }
}

module.exports = {
  Product,
  PRICE_MIN_VALUE,
};

