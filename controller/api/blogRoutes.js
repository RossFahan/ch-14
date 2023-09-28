const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Blog, User, Comment } = require('../../models');


// Route to get all blog posts
router.get('/', async (req, res) => {
    try {
      const blogs = await Blog.findAll({
        include: [
          {
            model: User,
            attributes: ['username']
          },
          {
            model: Comment,
            attributes: ['content', 'user_id', 'createdAt'],
            include: {
              model: User,
              attributes: ['username']
            }
          }
        ],
        order: [['createdAt', 'DESC']]
      });
  
      res.status(200).json(blogs);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // Route to get a single blog post
  router.get('/:id', async (req, res) => {
    try {
      const blog = await Blog.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['username']
          },
          {
            model: Comment,
            attributes: ['content', 'user_id', 'createdAt'],
            include: {
              model: User,
              attributes: ['username']
            }
          }
        ]
      });
  
      if (!blog) {
        res.status(404).json({ message: 'No blog post found' });
        return;
      }
  
      res.status(200).json(blog);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
// Route to create a blog
router.post('/', withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id 
    });

    res.status(201).json(newBlog);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route for updating a blog post
router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedBlog = await Blog.update(
      {
        title: req.body.title,
        content: req.body.content
      },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id
        }
      }
    );

    if (!updatedBlog[0]) {
      res.status(404).json({ message: 'No blog post found' });
      return;
    }

    res.status(200).json({ message: 'Blog post updated successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route for deleting a blog post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deletedBlog = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id
      }
    });

    if (!deletedBlog) {
      res.status(404).json({ message: 'No blog post found' });
      return;
    }

    res.status(200).json({ message: 'Blog post deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
