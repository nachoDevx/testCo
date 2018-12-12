'use strict';

const Product = require('./Product').Product;
const PRICE_MIN_VALUE = require('./Product').PRICE_MIN_VALUE;

const PRICE_MAX_VALUE = 50;
const PRICE_MEGA_COVERAGE_PRODUCTS = 80;
const PRODUCT_TYPES = ['Medium Coverage', 'Full Coverage', 'Low Coverage', 'Mega Coverage', 'Special Full Coverage', 'Super Sale'];

class CarInsurance {
  constructor(products = []) {
    if (!Array.isArray(products)) {
      throw Error('Products are not an array');
    }
    products.forEach((product) => {
      this.validate(product);
    });
    this._products = products;
  }

  getProducts(){
    return this._products;
  }

  validate(product) {
    if (!(product instanceof Product)) {
      throw Error('product is not an instance of from Product Class');
    }
    product.validate();
    if (!PRODUCT_TYPES.includes(product.name)) {
      throw Error('product name is not included in available product types');
    }
    if (product.price > PRICE_MAX_VALUE && product.name !== 'Mega Coverage') {
      throw Error(`Price value must be lower or equal than ${PRICE_MAX_VALUE}`);
    }
    if (product.name === 'Mega Coverage' && product.price !== PRICE_MEGA_COVERAGE_PRODUCTS) {
      throw Error(`Price of ${product.name} products must be equal to ${PRICE_MEGA_COVERAGE_PRODUCTS}`);
    }
    return product;
  }

  updatePrices() {
    this._products.forEach((product) => {
      this.updatePrice(product);
    });
    return this._products;
  }

  updatePrice(product, amount = 1) {
    switch (product.name) {
      case ('Full Coverage'):
        product.sellIn -= 1;
        if (product.sellIn < 0) {
          product.price = Math.min(product.price + (amount * 2), PRICE_MAX_VALUE);
        } else {
          product.price = Math.min(product.price + amount, PRICE_MAX_VALUE);
        }
        break;
      case ('Mega Coverage'):
        break;
      case ('Special Full Coverage'):
        if (product.sellIn < 1) {
          product.price = PRICE_MIN_VALUE;
        } else if (product.sellIn < 6) {
          product.price = Math.min(product.price + (amount * 3), PRICE_MAX_VALUE);
        } else if (product.sellIn < 11) {
          product.price = Math.min(product.price + (amount * 2), PRICE_MAX_VALUE);
        } else {
          product.price = Math.min(product.price + amount, PRICE_MAX_VALUE);
        }
        product.sellIn -= 1;
        break;
      case ('Super Sale'):
        product.sellIn -= 1;
        if (product.sellIn < 0) {
          product.price = Math.max(product.price - (amount * 4), PRICE_MIN_VALUE);
        } else {
          product.price = Math.max(product.price - (amount * 2), PRICE_MIN_VALUE);
        }
        break;
      default:
        product.sellIn -= 1;
        if (product.sellIn < 0) {
          product.price = Math.max(product.price - (amount * 2), PRICE_MIN_VALUE);
        } else {
          product.price = Math.max(product.price - amount, PRICE_MIN_VALUE);
        }
    }
  }
}

module.exports = CarInsurance;

