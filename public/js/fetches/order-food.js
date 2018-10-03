const API_URL_2 = '/api/v1/orders';
// window.onload = async () => {

const button = document.querySelector('#order-food-button');

button.onclick = async () => {
	let modal = document.querySelector('.modal');

	const toggleModal = () => {
		modal.classList.toggle('show-modal');
	}

	const token = localStorage.getItem('@FastFoodFast:token');
	const name = await button.getAttribute('data-name');
	const id = button.getAttribute('data-id');
	const quantityElement = document.querySelector(`#order-food-select-${id}`);
	const quantity = parseInt(quantityElement.options[quantityElement.selectedIndex].text);
	const orderFood = async (token, item, quantity) => {
		try {
			const response = await fetch(`${API_URL_2}`, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
				},
				body: JSON.stringify({
					item,
					quantity
				})
			});
			const data = response.json();
			if (data.success) {
				toggleModal();
			}
		} catch (e) {
			alert(e);
		}
	}
	try {
		await orderFood(token, name, quantity);
		toggleModal();
	} catch (e) {
		alert(e);
	}
}