const signupForm = document.querySelector('.signup-form');

signupForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email-signup').value;
  const username = document.querySelector('#username-signup').value;
  const password = document.querySelector('#password-signup').value;

  try {
    const response = await fetch('/api/user/signup', {
      method: 'POST',
      body: JSON.stringify({ email, username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
    document.location.replace('/');
    
      console.log("Signup sucessful");
    } else {
      alert('Signup failed. Please try again.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
});