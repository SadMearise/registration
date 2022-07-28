export function isWebp() {
	function textWebP(callback) {
		let webP = new Image();
		webP.onload = webP.onerror = function() {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}
	textWebP(function(support) {
		let className = support === true ? 'webp' : 'no-webp';
		document.documentElement.classList.add(className);
	})
}

export function ibg() {
    let ibg = document.querySelectorAll(".ibg");
    for (let i = 0; i < ibg.length; i++) {
        if (ibg[i].querySelector('img')) {
            ibg[i].style.backgroundImage = `url(${ibg[i].querySelector('img').getAttribute('src')})`;
        }
    }
}

export function stepForm() {
	const form = document.querySelector('.registration__form');
	const finish = document.querySelector('.finish');
	const steps = document.querySelectorAll('.form__step');
	const prevBtn = document.querySelector('.form__btn-prev');
	const nextBtn = document.querySelector('.form__btn-next');
	const progressStep = document.querySelectorAll('.progress__step');
	const progressSuccess = document.querySelector('.progress__success');
	
	form.addEventListener('submit', (e) => e.preventDefault())

	let formStepIndex = 0;

	prevBtn.addEventListener('click', () => {
		formStepIndex--;

		progressStep[formStepIndex + 1].classList.remove('active');

		updateformSteps();
	})

	nextBtn.addEventListener('click', () => {
		if (formStepIndex < steps.length - 1) {
			formStepIndex++;
			updateformSteps();
		} else if (formStepIndex === steps.length - 1) {
			form.style.display = 'none';
			finish.style.display = 'block';
		}
	})

	function updateformSteps() {
		steps.forEach(step => {
			step.classList.contains('active') && step.classList.remove('active');
		})

		steps[formStepIndex].classList.add('active');

		if (formStepIndex <= progressStep.length - 1) {
			progressStep[formStepIndex].classList.add('active');
		}

		if (formStepIndex === 0) {
			prevBtn.style.display = 'none';
		} else {
			prevBtn.style.display = 'block';
		}

		const actives = document.querySelectorAll('.progress__step.active');
		const percent = ((actives.length - 1) / (progressStep.length - 1)) * 100 + "%";
		progressSuccess.style.width = percent;
	}

	if (steps) {
		updateformSteps();
	}
}