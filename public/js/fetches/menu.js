const API_URL = '/api/v1/menu';
const API_URL_2 = '/api/v1/orders';
window.onload = async () => {

	const orderFoodContainer = document.querySelector('.order-food-container');
	const welcomeMessage = document.querySelector('#welcome-message');
	const userName = await localStorage.getItem('@FastFoodFast:name').split(' ')[0];
	welcomeMessage.innerHTML = `Welcome, ${userName}.`;
	try {
		const response = await fetch(`${API_URL}`);
		const data = await response.json();
		const menu = data.menu;
		menu.forEach(item => {
			const order = `
				<div class="order-food-item">
					<div class="order-food-item-image">
						<img src="${item.image_url}" />
					</div>
					<div class="order-food-item-description">
						<p class="order-food-name">${item.name}</p>
						<p>${item.description}</p>
						<div>
							<p>Quantity</p>
							<select id="order-food-${item.id}">
								<option>1</option>
								<option>2</option>
								<option>3</option>
								<option>4</option>
								<option>5</option>
								<option>6</option>
								<option>7</option>
								<option>8</option>
								<option>9</option>
								<option>10</option>
							</select>
						</div>
						<button id="order-food-button" class="order-button" data-name="${item.name}" data-id="${item.id}">Order</button>
					</div>
				</div>
			`;
			orderFoodContainer.innerHTML += order;
		});
		const logoutButton = document.querySelector('#logout-button');
		logoutButton.addEventListener('click', async () => {
			await localStorage.clear();
			location.href = '/login';
		});
	} catch (e) {
		alert(e);
	}
	if (orderFoodContainer && orderFoodContainer.children.length > 2) {
		const modal = document.querySelector('.modal');
		const closeButton = document.querySelector('.close-button');

		const toggleModal = () => {
			modal.classList.toggle('show-modal');
		}

		const windowOnClick = () => {
			if (event.target === modal) {
				toggleModal();
			}
		}

		closeButton.addEventListener('click', toggleModal);
		window.addEventListener('click', windowOnClick);

		const button = document.querySelector('#order-food-button');
		button.onclick = async () => {
			const token = localStorage.getItem('@FastFoodFast:token');
			const name = await button.getAttribute('data-name');
			const id = button.getAttribute('data-id');
			const quantityElement = document.querySelector(`#order-food-${id}`);
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
					console.log(data);
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
	}
}