const form = document.getElementById('new-blog-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  const response = await fetch('/api/blogs', {
    method: 'POST',
    body: JSON.stringify({ title, content }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    window.location.href = '/dashboard';
  } else {
    alert('Failed to create blog post');
  }
});