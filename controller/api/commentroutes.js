const router = require('express').Router();
const withAuth = require('../../public/js/auth');
const { Comment } = require('../../models');

// Route for creating new comment
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      content: req.body.content,
      blog_id: req.body.blog_id,
      user_id: req.session.user_id
    });

    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route for updating a comment
router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedComment = await Comment.update(
      {
        content: req.body.content
      },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id
        }
      }
    );

    if (!updatedComment[0]) {
      res.status(404).json({ message: 'No comment found' });
      return;
    }

    res.status(200).json({ message: 'Comment updated' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route for deleting a comment
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deletedComment = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id
      }
    });

    if (!deletedComment) {
      res.status(404).json({ message: 'No comment found' });
      return;
    }

    res.status(200).json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
