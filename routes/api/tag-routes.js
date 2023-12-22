//Import needed libraries and models
const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// find all tags
router.get('/', async (req, res) => {
  //Try to get the tags, including their products (connection through the ProductTag association)
  try{
    const tagData = await Tag.findAll({
      include: [{model: Product, through: ProductTag, as: 'tagToProduct'}],
    });
  //If there is no tag found, note this to the user
    if(!tagData){
      res.status(404).json({ message: 'No entry found with this id!' });
      return;
    }
    //If a tag is found, return the data
    res.status(200).json(tagData);
  }
  //If an error occurs, log it as a server error
  catch(err){
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one tag by its `id` value, including its products (direct connection)
  try{
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{model: Product, through: ProductTag, as: 'tagToProduct'}],
    });
  //If there is no tag found, note this to the user
    if(!tagData){
      res.status(404).json({ message: 'No entry found with this id!' });
      return;
    }
    //If a tag is found, return the data
    res.status(200).json(tagData);
  }
  //If an error occurs, log it as a server error
  catch(err){
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try{
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  }
  //If an error occurs, log it as a server error
  catch(err){
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{
    const tagUpdate = await Tag.update({
      tag_name: req.body.tag_name,    
    },
    {
      where:{
        id: req.params.id,
      }
    }
    );
    res.status(200).json(tagUpdate);
  }
  //If an error occurs, log it as a server error
  catch(err){
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // Attempt to get the tag by its ID, then delete it
  try{
    const brokeTag = await Tag.destroy({
    where: {
      id: req.params.id,
    }
    });
    return brokeTag.json(deletedTag);
  }
  //If an error occurs, log it as a server error
  catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;
