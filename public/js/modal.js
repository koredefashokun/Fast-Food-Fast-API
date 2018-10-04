window.onclick = (e) => {
	let modal = document.querySelector('.modal');
	let closeButton = document.querySelector('.close-button');

	const toggleModal = () => {
		modal.classList.toggle('show-modal');
	}

	const windowOnClick = () => {
		if (event.target === modal) {
			toggleModal();
		}
	}
	
	if(e.target === 'button.order-button'){
		toggleModal();
	}
}
window.addEventListener('click', windowOnClick);
