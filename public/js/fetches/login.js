const API_URL = '/api/v1/auth/login';
window.onload = () => {
	if (localStorage.getItem('@FastFoodFast:token')) {
		location.href = '/order-food';
	}
	const form = document.querySelector('#login-form');
	form.onsubmit = async (e) => {
		const emailInput = document.querySelector('#login-email');
		const emailValue = emailInput.value;

		const passwordInput = document.querySelector('#login-password');
		const passwordValue = passwordInput.value;

		const logIn = async (email, password) => {
			try {
				const response = await fetch(`${API_URL}`, {
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						email,
						password
					})
				});
				const data = await response.json();
				if (data.success) {
					console.log(data);
					await localStorage.setItem('@FastFoodFast:token', data.token);
					await localStorage.setItem('@FastFoodFast:name', data.name);
					await localStorage.setItem('@FastFoodFast:id', data.id)
					location.href = '/order-food';
				}
			} catch (e) {
				alert(e);
			}
		}

		e.preventDefault();
		await console.log(emailValue, passwordValue);
		await logIn(emailValue, passwordValue);
	}
}