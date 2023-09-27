// Function to add a new blog post
async function newBlog(event) {
    event.preventDefault();
    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();
  
    if (title && content) {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        document.location.reload();
      } else {
        alert(response.statusText);
      }
    }
}

// Function to render the comment box
function renderCommentBox(blogId) {
  // Hide all other comment boxes first
  document.querySelectorAll('.comment-box').forEach((box) => {
    box.style.display = 'none';
  });
  
  const commentBox = `
    <form id="new-comment-form-${blogId}" class="comment-box">
      <div>
        <label for="comment">Comment</label>
        <textarea id="comment-${blogId}" name="comment" required></textarea>
      </div>
      <button type="submit">Submit Comment</button>
    </form>
  `;
  
  // Adding the comment box to the DOM
  document.querySelector(`#blog-${blogId}`).insertAdjacentHTML('afterend', commentBox);
  
  // Event Listener for new comment form submission
  document.querySelector(`#new-comment-form-${blogId}`).addEventListener('submit', async (event) => {
    event.preventDefault();
    const comment = document.querySelector(`#comment-${blogId}`).value.trim();
  
    if (comment) {
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ comment_text: comment, blog_id: blogId }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // Refresh or redirect
        document.location.reload();
      } else {
        alert('Failed to post comment');
      }
    }
  });
}

// Event Listener for blog title click
document.querySelectorAll('.blog-post h2').forEach((element) => {
  element.addEventListener('click', function() {
    const blogId = this.id.split('-')[1];
    renderCommentBox(blogId);
  });
});

// Event Listener for new blog form submission
document.querySelector('#new-blog-form').addEventListener('submit', newBlog);
