const API_URL = '/api/v1/orders';
const API_URL_2 = '/api/v1/menu';
window.onload = async () => {
	const table = document.querySelector('#table');
	const adminToken = localStorage.getItem('@FastFoodFast:admin-token');
	const logoutLink = document.querySelector('#logout-link');
	logoutLink.onclick = async () => {
		await localStorage.clear();
		location.href = '/admin-login';
	}
	const response = await fetch(`${API_URL}`, {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': `Admin ${adminToken}`
		}
	});
	const data = await response.json();
	if (data.success) {
		const orders = data.orders;
		orders.forEach(order => {
			const item = `
				<tr>
				<td>${order.id}</td>
				<td>${order.item}</td>
				<td>${order.quantity}</td>
				<td>${order.status}</td>
				<td>
					<div class="actions-container">
						<button class="action-button action-button-completed" data-status="Completed" data-id="${order.id}">Complete</button>
						<button class="action-button action-button-processing" data-status="Processing" data-id="${order.id}">Processing</button>
						<button class="action-button action-button-cancel" data-status="Cancelled" data-id="${order.id}">Cancel</button>
					</div>
				</td>
			</tr>
			`;
			table.innerHTML += item;
		});

		table.addEventListener('click', async e => {
			if (e.target.matches('button.action-button')) {
				const actionButton = e.target;
				const id = actionButton.getAttribute('data-id');
				const status = actionButton.getAttribute('data-status');
				await setStatus(id, status);
				location.reload();
			}
		});
	}
	const setStatus = async (id, status) => {
		try {
			await fetch(`${API_URL}/${id}`, {
				method: 'PUT',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': `Admin ${adminToken}`
				},
				body: JSON.stringify({
					status
				})
			});
		} catch (e) {
			alert(e);
		}
	}
	const createMenuItemForm = document.querySelector('.create-menu-item-form');
	createMenuItemForm.onsubmit = async () => {
		const menuItemName = document.querySelector('#menu-item-name').value;
		const menuItemDescription = document.querySelector('#menu-item-description').value;
		const menuItemImageUrl = document.querySelector('#menu-item-image-url').value;
		try {
			const response = await fetch(`${API_URL_2}`, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': `Admin ${adminToken}`
				},
				body: JSON.stringify({
					name: menuItemName,
					description: menuItemDescription,
					imageUrl: menuItemImageUrl
				})
			});
			const data = await response.json();
			if (data.success) {
				location.reload();
			}
		} catch (e) {
			alert(e);
		}
	}
}