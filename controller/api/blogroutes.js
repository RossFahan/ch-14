const router = require('express').Router();
const { BlogPost } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.findAll();
        res.status(200).json(blogs);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    
    if (!blog) {
      res.status(404).json({ message: 'No blog post found with this id' });
      return;
    }

    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
    // Create a new blog post
});

router.put('/:id', async (req, res) => {
    // Update an existing blog post
});

router.delete('/:id', async (req, res) => {
    // Delete a blog post
});

module.exports = router;
