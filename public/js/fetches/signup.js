const API_URL = '/api/v1/auth/signup';
window.onload = () => {
	if (localStorage.getItem('@FastFoodFast:token')) {
		location.href = '/order-food';
	}
	const form = document.querySelector('#signup-form');
	form.onsubmit = async (e) => {
		const nameInput = document.querySelector('#signup-name');
		const nameValue = nameInput.value;

		const emailInput = document.querySelector('#signup-email');
		const emailValue = emailInput.value;

		const passwordInput = document.querySelector('#signup-password');
		const passwordValue = passwordInput.value;

		const confirmPasswordInput = document.querySelector('#signup-confirm-password');
		const confirmPasswordValue = confirmPasswordInput.value;

		const signUp = async (name, email, password, confirmPassword) => {
			try {
				const response = await fetch(`${API_URL}`, {
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						name,
						email,
						password,
						confirmPassword
					})
				});
				const data = await response.json();
				if (data.success) {
					console.log(data);
					await localStorage.setItem('@FastFoodFast:token', data.token);
					await localStorage.setItem('@FastFoodFast:name', data.name);
					await localStorage.setItem('@FastFoodFast:id', data.id);
					location.href = '/order-food';
				}
			} catch (e) {
				alert(e);
			}
		}

		e.preventDefault();
		await console.log(nameValue, emailValue, passwordValue, confirmPasswordValue)
		await signUp(nameValue, emailValue, passwordValue, confirmPasswordValue);
	}
}