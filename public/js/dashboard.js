// Function to open a new blog post form. You may want to create a new view for this.
function addNewBlogPost() {
    // Redirect to a new page where user can create a new blog post
    window.location.href = '/new-blog-post';
  }
  
  // Fetching existing blogs and adding event listeners
  document.addEventListener('DOMContentLoaded', function() {
    const newBlogButton = document.getElementById('new-blog-post');
    newBlogButton.addEventListener('click', addNewBlogPost);
  
    // Add event listeners for Update and Delete buttons here
  });
  