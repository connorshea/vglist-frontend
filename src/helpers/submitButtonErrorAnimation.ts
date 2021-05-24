/**
 * Animates the submit button on the current page to shake, if there is one.
 * The animation will disappear after two seconds.
 */
export const submitButtonErrorAnimation = (): void => {
  const submitButton = document.querySelector('.js-submit-button');
  submitButton?.classList.add('js-submit-button-error');
  setTimeout(() => {
    submitButton?.classList.remove('js-submit-button-error');
  }, 2000);
}
