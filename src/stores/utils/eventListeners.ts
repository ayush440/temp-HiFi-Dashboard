export function addClickListener(
  element: HTMLElement,
  handler: EventListenerOrEventListenerObject
): void {
  element.addEventListener('click', handler)
}

export function removeClickListener(
  element: HTMLElement,
  handler: EventListenerOrEventListenerObject
): void {
  element.removeEventListener('click', handler)
}
