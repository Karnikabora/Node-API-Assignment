const express = require('express');
const bodyParser = require('body-parser');
const port = 4000;
const app = express();


const products = [
  { 
    id: 1,
    name: 'product1',
    total_quantity: 10,
    type_of_product: 'shirt',
    price: 300
  },
  { 
    id: 2,
    name: 'product2',
    total_quantity: 5,
    type_of_product: 'pants',
    price: 500
  },
];

// Middleware to parse the request body
app.use(bodyParser.json());

// API to fetch all products
app.get('/products', (req, res) => {
  res.status(200).json(products);
});

// API to fetch product by id
app.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// API to fetch product by name
app.get('/products/name/:name', (req, res) => {
  const name = req.params.name.toLowerCase();
  const product = products.find(p => p.name.toLowerCase() === name);

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// API to add new product
app.post('/addproduct', (req, res) => {
  const newProduct = req.body;
  products.push(newProduct);
  res.status(201).json({ message: 'Product added successfully' });
});

// Starting the server

app.listen(port, () => console.log(`Server started on port ${port}`));
