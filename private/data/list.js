
const shopping = [
  {
    name: 'Cabbege',
    type: 'grocery',
    qty: 1
  },
  {
    name: 'Porkchop',
    type: 'meats',
    qty: 1
  },
  {
    name: 'Chicken wings',
    type: 'meats',
    qty: 10
  },
  {
    name: 'onion',
    type: 'grocery',
    qty: 2,
  },
  {
    name: 'Carrots',
    type: 'grocery',
    qty: 5
  },
  {
    name: 'Lamb',
    type: 'meats',
    qty: 1
  },
  {
    name: 'cheese',
    type: 'dairy',
    qty: 16, 
  }
];

const discription = `
<h2>We have shopping lists below:</h2>
<ul>
  <li>Total Shopping List</li>
  <li>Vegetable Shopping List</li>
  <li>Meats Shopping List</li>
  <li>Others Shopping List</li>
</ul>
`;

const others = [
  {
    name: 'rice',
    qty: 1
  },
  {
    name: 'dish',
    qty: 16  },
  {
    name: 'book',
    qty: 2
  },
  {
    name: 'cup',
    qty: 1 }
];

module.exports = {
  //TODO change name
  getShopping: () => shopping,
  getHTML: () => discription,
  getOtherList: () => others
};