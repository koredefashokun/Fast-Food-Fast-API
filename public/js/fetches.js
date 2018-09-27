const logIn = async (email, password) => {
  await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  })
    .then(response => response.json())
    .then(async response => {
      if (response.success === true) {
        await localStorage.setItem('@FastFoodFast:token', response.token);
        location.href = '/menu';
      }
    })
    .catch(alert());
}

const logIn = (name, email, password, confirmPassword) => {
  fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  })
    .then(response => response.json())
    .then(response => {
      if (response.success === true) {
        location.href = '/menu';
      }
    })
}