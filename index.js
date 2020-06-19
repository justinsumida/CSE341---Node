const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/postageMath' , postageMath)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

function postageMath(req , res){
  const shippingType = req.query.method;
  const weight = Number(req.query.weight);
  doMath(shippingType , weight, res);
}

function doMath(shippingType , weight, res){
  let total = 0;
  let price = 0;
  let weightPrice = 0;
  if(shippingType == "priority-express"){
    price = 26.35;
    if(weight > 1)  
      weightPrice = weight * .4;
    total = price + weightPrice;
  }
  else if(shippingType == "priority-mail"){
    price = 7.50
    if (weight > 1) 
      weightPrice = weight * .6;
    total = price + weightPrice;
  }
  else if(shippingType = "first-class-mail"){
    price = 1;
    if (weight > 1)
      weightPrice = weight * .2;
    total = price * weight; 
  }
  else if(shippingType = "first-class-package"){
    price = 3.80;
    total = price * weight;
  }
  else if(shippingType = "retail-ground"){
    price = 7.50;
    if (weight > 1)
      weightPrice = weight  *.6;
    total = price * weight;
  }

  const params = {shippingType: shippingType , weight: weight, total: total};

  res.render('pages/postage' , params);
}
