//Import needed libraries and models
const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  //Try to get the products, including their categories (direct connection)
  //and their tags (connection through the ProductTag association)
  try{
    const productData = await Product.findAll({
      include: [{model: Category, 
        model: Tag, through: ProductTag, as: 'productToTag'}],
    });
    //If there is no product found, note this to the user
    if(!productData){
      res.status(404).json({ message: 'No entry found with this id!' });
      return;
    }
    //If a product is found, return the data
    res.status(200).json(productData);
  }
  //If an error occurs, log it as a server error
  catch(err){
    res.status(500).json(err);
  }
});

// get one product
router.get('/:id', async (req, res) => {
  //Try to get the product by its ID, including its categories (direct connection)
  //and its tags (connection through the ProductTag association)
  try{
    const productData = await Product.findByPk(req.params.id, {
      include: [{model: Category, 
        model: Tag, through: ProductTag, as: 'productToTag'}],
    });
    //If a product is found, return the data
    if(!productData){
      res.status(404).json({ message: 'No entry found with this id!' });
      return;
    }
    //If an error occurs, log it as a server error
    res.status(200).json(productData);
  }
  //If an error occurs, log it as a server error
  catch(err){
    res.status(500).json(err);
  }
});

// create new product
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {

        ProductTag.findAll({
          where: { product_id: req.params.id }
        }).then((productTags) => {
          // create filtered list of new tag_ids
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          const newProductTags = req.body.tagIds
            .filter((tag_id) => !productTagIds.includes(tag_id))
            .map((tag_id) => {
              return {
                product_id: req.params.id,
                tag_id,
              };
            });

          // figure out which ones to remove
          const productTagsToRemove = productTags
            .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
            .map(({ id }) => id);
          // run both actions
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        });
      }

      return res.json(product);
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try{
    await Product.destroy({
    where: {
      id: req.params.id,
    }
    }).then(returnProducts =>{
      return res.json(returnProducts);
    })
    
  }
  //If an error occurs, log it as a server error
  catch(err){
    res.status(500).json(err);
  }
  });

module.exports = router;