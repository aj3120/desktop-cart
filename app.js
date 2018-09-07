const express = require('express')
const app = express()
var cors = require('cors');
const path= require('path');
var fs = require('fs');
app.use(cors({credentials: true, origin: 'http://10.7.20.68:3000'}));

app.use(express.static(path.join(__dirname, '/public')));
// app.use(cors({credentials: true, origin: 'http://adarsh-desktop-cart:3000'}));
app.get('/', (req, res) => res.send('Hello World!'))
var home_products = require('./home_products.json');
var search_products = require('./search_products.json');
var all_products = require('./all_products.json');
var cart_products = require('./cart_products.json');
var review = require('./review.json');
var bodyParser = require('body-parser')
var category1 = require('./category_1.json');
var category2 = require('./category_2.json');
app.use(bodyParser.json());


app.post('/cart_update',(req,res)=>{
		obj={
		  "cart_products":req.body
		}
		fs.writeFile('cart_products.json', JSON.stringify(obj), 'utf8', function (err) {
			if (err) throw err;
			console.log('Saved!');
			});
		 cart_products = require('./cart_products.json');

		res.header("Content-Type",'application/json');
	        res.send(JSON.stringify({"Status":"Success"}));


})
app.post('/shop',(req,res)=>{
		shop={
		  "shopping_details":req.body
		}
		emptyCart={"cart_products":[]}

		fs.writeFile('shopping_details.json', JSON.stringify(shop), 'utf8', function (err) {
			if (err) throw err;
			console.log('Saved!');
			});
		fs.writeFile('cart_products.json', JSON.stringify(emptyCart), 'utf8', function (err) {
			if (err) throw err;
			console.log('Saved!');
			});
		cart_products = require('./cart_products.json');
		res.header("Content-Type",'application/json');
	        res.send(JSON.stringify({"Status":"Success"}));

})

app.get('/home_products',(req,res)=>{
	 res.header("Content-Type",'application/json');
	 res.send(JSON.stringify(home_products));
})
app.post('/search_products',(req,res)=>{
	 let search=req.body;
	 let search_result=search_products["products"].filter((product)=>product.name.indexOf(search.searchText.toUpperCase())!==-1)
	 res.header("Content-Type",'application/json');
	 res.send(JSON.stringify(search_result));
})


app.get('/category/1',(req,res)=>{

	 res.header("Content-Type",'application/json');
	 res.send(JSON.stringify(category1));
})
app.get('/category/2',(req,res)=>{

	 res.header("Content-Type",'application/json');
	 res.send(JSON.stringify(category2));
})

app.get('/home_products',(req,res)=>{

	 res.header("Content-Type",'application/json');
	 res.send(JSON.stringify(home_products));
})


app.get('/review',(req,res)=>{

	 res.header("Content-Type",'application/json');
	 res.send(JSON.stringify(review));
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
