window.onload = () => {
	let modal = document.querySelector('.modal');
	let trigger = document.getElementById('.order-button');
	let closeButton = document.querySelector('.close-button');

	const toggleModal = () => {
		modal.classList.toggle('show-modal');
	}

	const windowOnClick = () => {
		if (event.target === modal) {
			toggleModal();
		}
	}

	trigger.addEventListener('click', toggleModal);
	closeButton.addEventListener('click', toggleModal);
	window.addEventListener('click', windowOnClick);
}