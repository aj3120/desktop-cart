const express = require('express')
const app = express()
var cors = require('cors');
const path= require('path');
app.use(cors({credentials: true, origin: 'http://10.7.20.68:3000'}));
app.use(express.static(path.join(__dirname, '/public')));
// app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.get('/', (req, res) => res.send('Hello World!'))
var home_products = require('./home_products.json');
var all_products = require('./all_products.json');
var cart_products = require('./cart_products.json');
app.post('/cart_update',(req,res)=>{
		console.log(req)
})

app.get('/home_products',(req,res)=>{

	 res.header("Content-Type",'application/json');
	 res.send(JSON.stringify(home_products));
})


app.get('/all_products',(req,res)=>{

	 res.header("Content-Type",'application/json');
	 res.send(JSON.stringify(all_products));
})
app.get('/cart_products',(req,res)=>{

	 res.header("Content-Type",'application/json');
	 res.send(JSON.stringify(cart_products));
})

app.listen(5000, () => console.log('Example app listening on port 5000!'))
