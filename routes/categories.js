const {Category} = require('../models/category');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) =>{
    const categoryList = await Category.find();

    if(!categoryList) {
        res.status(500).send({success: false})
    } 
    res.send(categoryList);
})

router.get('/:id', async (req, res)=>{
    const category = await Category.findById(req.params.id);

    if(!category) 
        return res.status(400).send('No Such Ctegory Found');
    
    res.send(category);
})


router.put('/:id', async (req,res)=>{
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color

        },
        {new : true}
    )

    if(!category) 
        return res.status(400).send('No Such Ctegory Found');
    
    res.send(category);
})


router.post('/', async(req,res)=>{
    let category =  new Category({
        name : req.body.name,
        icon : req.body.icon,
        color : req.body.color
    })

    category = await category.save();

    if(!category)
    return res.status(404).send('Category Not Created');
    res.send(category);
    
})



router.delete('/:id', (req,res)=>{
    Category.findByIdAndRemove(req.params.id).then(category=>{
        if(category){
        return res.status(200).json({ success : true})
        } else{
            return res.status(404).json({ success : false})
        }
    }).catch(err=>{
        return res.status(400).json({error: err})
    })
})

module.exports =router;