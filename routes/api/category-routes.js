const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
    const catData = await Category.findAll({
      include: [{model: Product}],
    });
    res.status(200).json(catData);
  }
  catch(err){
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
    const catData = await Category.findByPk(req.params.id, {
      include: [{model: Product}],
    });

    if(!catData){
      res.status(404).json({ message: 'No entry found with this id!' });
      return;
    }

    res.status(200).json(catData);
  }
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
    res.status(200).json(catUpdate);
  }
  catch(err){
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try{
    const brokeCat = await Category.destroy({
    where: {
      id: req.params.id,
    }
    });
    return brokeCat.json(deletedCategory);
  }
  catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;
