window.onload = () => {
	let modal = document.querySelector('.modal');
	let closeButton = document.querySelector('.close-button');
	let orderButtons = document.querySelectorAll('.order-button');
	const toggleModal = () => {
		modal.classList.toggle('show-modal');
	}

	const windowOnClick = () => {
		if (event.target === modal) {
			toggleModal();
		}
	}

	orderButtons.forEach(orderButton => {
		orderButton.onclick = () => toggleModal();
	});
	
	window.addEventListener('click', windowOnClick);
}
