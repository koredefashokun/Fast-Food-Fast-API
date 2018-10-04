window.onload = () => {
	let modal = document.querySelector('.modal');
	let closeButton = document.querySelector('.close-button');
	let orderButton = document.querySelector('.order-button');
	const toggleModal = () => {
		modal.classList.toggle('show-modal');
	}

	const windowOnClick = () => {
		if (event.target === modal) {
			toggleModal();
		}
	}

	orderButton.onclick = () => toggleModal();
	window.addEventListener('click', windowOnClick);
}
