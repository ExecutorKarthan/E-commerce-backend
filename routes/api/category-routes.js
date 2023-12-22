//Import needed libraries and models
const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  //Try to get the categories, including their products (direct connection)
  try{
    const catData = await Category.findAll({
      include: [{model: Product}],
    });
    //If there is no category found, note this to the user
    if(!catData){
      res.status(404).json({ message: 'No entry found with this id!' });
      return;
    }
    //If a category is found, return the data
    res.status(200).json(catData);
  }
  //If an error occurs, log it as a server error
  catch(err){
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value, including its products (direct connection)
  try{
    const catData = await Category.findByPk(req.params.id, {
      include: [{model: Product}],
    });
    //If there is no category found, note this to the user
    if(!catData){
      res.status(404).json({ message: 'No entry found with this id!' });
      return;
    }
    //If a category is found, return the data
    res.status(200).json(catData);
  }
  //If an error occurs, log it as a server error
  catch(err){
    res.status(500).json(err);
  }
});

router.post('/', async(req, res) => {
  // create a new category
  try{
    const catData = await Category.create(req.body);
    res.status(200).json(catData);
  }
  //If an error occurs, log it as a server error
  catch(err){
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
    const catUpdate = await Category.update({
      category_name: req.body.category_name,    
    },
    {
      where:{
        id: req.params.id,
      }
    }
    );
    //If there is no category found, note this to the user
    if(!catUpdate){
      res.status(404).json({ message: 'No entry found with this id!' });
      return;
    }
    res.status(200).json(catUpdate);
  }
  //If an error occurs, log it as a server error
  catch(err){
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // Attempt to get the category by its ID, then delete it
  try{
    const brokeCat = await Category.destroy({
    where: {
      id: req.params.id,
    }
    });
    return brokeCat.json(deletedCategory);
  }
  //If an error occurs, log it as a server error
  catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;
