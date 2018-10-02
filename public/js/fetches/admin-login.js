const API_URL = '/api/v1/admin/login'

window.onload = () => {
	const form = document.querySelector('#admin-login-form')
	form.onsubmit = async () => {
		const email = document.querySelector('#admin-login-email').value;
		const password = document.querySelector('#admin-login-password').value;
		console.log(email, password);
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
				localStorage.setItem('@FastFoodFast:admin-token', data.token);
				location.href = '/admin-manager';
			}
		} catch (e) {
			alert(e);
		}
	}
}