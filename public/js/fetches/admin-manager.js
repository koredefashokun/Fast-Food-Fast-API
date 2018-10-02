const API_URL = '/api/v1/orders';
window.onload = async () => {
	const table = document.querySelector('#table');
	const adminToken = localStorage.getItem('@FastFoodFast:admin-token');
	const response = await fetch(`${API_URL}`, {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': `Admin ${adminToken}`
		}
	});
	const data = await response.json();
	console.log(data);
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

		table.addEventListener('click', e => {
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
}