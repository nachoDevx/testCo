const expect = require('chai').expect;
const should = require('chai').should;

const CarInsurance = require('../src/CarInsurance');
const Product = require('../src/Product').Product;

describe("Check Product Name", function() {
    it("check not declared name", function() {
        const product = new Product("foo", 0, 0);
        try{
            const coTest = new CarInsurance([product]);
        } catch (err){
            expect(err.message).equal('product name is not included in available product types');
        }
    });

    it("check not valid Name type", function() {
        const productName = 1234;
        const product = new Product(productName, 0, 0);
        try{
            const coTest = new CarInsurance([product]);
        } catch (err){
            expect(err.message).equal('product name must be a string');
        }
    });
});

describe("Check Product SellIn", function() {
    it("check not valid SellIn type", function() {
        const sellIn = "foo";
        const product = new Product('Full Coverage', sellIn, 0);
        try{
            const coTest = new CarInsurance([product]);
        } catch (err){
            expect(err.message).equal('sellIn must be a number');
        }
    });
});

describe("Check Product Price", function() {
    it("check not valid Price type", function() {
        const price = "foo";
        const product = new Product('Full Coverage', 10, price);
        try{
            const coTest = new CarInsurance([product]);
        } catch (err){
            expect(err.message).equal('price must be a number');
        }
    });

    it("check lower than min Price ", function() {
        const price = -1;
        const product = new Product('Full Coverage', 10, price);
        try{
            const coTest = new CarInsurance([product]);
        } catch (err){
            expect(err.message).equal(`Price value must be greater or equal than 0`);
        }
    });
});

describe("Check Car Insurance Array", function() {
    it("check not valid product", function() {
        const product = null;
        try{
            const coTest = new CarInsurance([product]);
        } catch (err){
            expect(err.message).equal('product is not an instance of from Product Class');
        }
    });

    it("check is Array", function() {
        try{
            const coTest = new CarInsurance(null);
        } catch (err){
            expect(err.message).equal('Products are not an array');
        }
    });

    it("check return products", function() {
        const product = new Product('Full Coverage', 10, 0);
        const coTest = new CarInsurance([product]);
        expect(JSON.stringify(coTest.getProducts())).equal(JSON.stringify([product]));
    });
});

describe("Check Car Insurance Price", function() {
    it("check not valid Car Insurance Price", function() {
        const price = 60;
        const product = new Product('Full Coverage', 10, price);
        try{
            const coTest = new CarInsurance([product]);
        } catch (err){
            expect(err.message).equal(`Price value must be lower or equal than 50`);
        }
    });

    it("check not valid Car Insurance Price Mega Coverage", function() {
        const price = 60;
        const product = new Product('Mega Coverage', 10, price);
        try{
            const coTest = new CarInsurance([product]);
        } catch (err){
            expect(err.message).equal(`Price of Mega Coverage products must be equal to 80`);
        }
    });
});

describe("Check Car Insurance Update Price", function() {
    it("check Medium Coverage Price", function() {
        const product = new Product('Medium Coverage', 10, 20);
        const coTest = new CarInsurance([product]);
        coTest.updatePrices();
        expect(product.price).equal(19);
    });

    it("check Full Coverage Price", function() {
        const product = new Product('Full Coverage', 2, 0);
        const coTest = new CarInsurance([product]);
        coTest.updatePrices();
        expect(product.price).equal(1);
    });

    it("check Full Coverage sellIn < 0", function() {
        const product = new Product('Full Coverage', 0, 2);
        const coTest = new CarInsurance([product]);
        coTest.updatePrices();
        expect(product.price).equal(4);
    });

    it("check Low Coverage Price", function() {
        const product = new Product('Low Coverage', 5, 7);
        const coTest = new CarInsurance([product]);
        coTest.updatePrices();
        expect(product.price).equal(6);
    });

    it("check Low Coverage Price sellIn < 0 ", function() {
        const product = new Product('Low Coverage', 0, 7);
        const coTest = new CarInsurance([product]);
        coTest.updatePrices();
        expect(product.price).equal(5);
    });

    it("check Mega Coverage Price", function() {
        const product = new Product('Mega Coverage', 0, 80);
        const coTest = new CarInsurance([product]);
        coTest.updatePrices();
        expect(product.price).equal(80);
    });

    it("check Special Full Coverage Price ", function() {
        const product = new Product('Special Full Coverage', 15, 20);
        const coTest = new CarInsurance([product]);
        coTest.updatePrices();
        expect(product.price).equal(21);
    });

    it("check Special Full Coverage sellIn < 1", function() {
        const product = new Product('Special Full Coverage', 0, 20);
        const coTest = new CarInsurance([product]);
        coTest.updatePrices();
        expect(product.price).equal(0);
    });

    it("check Special Full Coverage sellIn < 6", function() {
        const product = new Product('Special Full Coverage', 5, 20);
        const coTest = new CarInsurance([product]);
        coTest.updatePrices();
        expect(product.price).equal(23);
    });

    it("check Special Full Coverage sellIn < 11", function() {
        const product = new Product('Special Full Coverage', 10, 20);
        const coTest = new CarInsurance([product]);
        coTest.updatePrices();
        expect(product.price).equal(22);
    });

    it("check Super Sale Price", function() {
        const product = new Product('Super Sale', 3, 6);
        const coTest = new CarInsurance([product]);
        coTest.updatePrices();
        expect(product.price).equal(4);
    });

    it("check Super Sale Price sellIn < 0 ", function() {
        const product = new Product('Super Sale', 0, 6);
        const coTest = new CarInsurance([product]);
        coTest.updatePrices();
        expect(product.price).equal(2);
    });

});
