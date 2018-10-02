const API_URL = '/api/v1/users';
const userId = localStorage.getItem('@FastFoodFast:id');
window.onload = async () => {
	const logoutButton = document.querySelector('#logout-button');
	logoutButton.addEventListener('click', () => {
		localStorage.removeItem('@FastFoodFast:token');
		localStorage.removeItem('@FastFoodFast:name');
		localStorage.removeItem('@FastFoodFast:id');
		location.href = '/login';
	});
	const table = document.querySelector('#table');
	try {
		const response = await fetch(`${API_URL}/${userId}/orders`);
		console.log(response);
		const data = await response.json();
		const orders = data.orders;
		orders.forEach(order => {
			const item = `
				<tr>
					<td>${order.id}</td>
					<td>${order.item}</td>
					<td>${order.quantity}</td>
					<td>${order.status}</td>
				</tr>
			`;
			table.innerHTML += item;
		});
	} catch (e) {
		alert(e);
	}
}