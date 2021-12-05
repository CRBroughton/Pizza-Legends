export default class TextMessage {
  text: string
  onComplete: any
  element?: HTMLDivElement
  constructor({ text, onComplete }) {
    this.text = text
    this.onComplete = onComplete
    this.element = undefined
  }

  createElement() {
    // Create the element
    this.element = document.createElement('div')
    this.element.classList.add('TextMessage')

    this.element.innerHTML = (`
        <p class="textMessage_p">${this.text}</p>
        <button class="TextMessage_button">Next</button>
    `)
  }

  init(container: { appendChild: (arg0: HTMLDivElement | undefined) => void }) {
    this.createElement()
    container.appendChild(this.element)
  }
}
