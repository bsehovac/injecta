import './../scss/style.scss'

(() => {

  const replaceElement = (query, html) => {
    const element = document.querySelector(query)
    if (!element) {
      console.log('---- ELEMENT NOT FOUND', query)
      return
    }
    const temp = document.createElement( 'div' )
    temp.innerHTML = html
    const newElement = temp.firstElementChild
    newElement.style.opacity = 0
    newElement.style.transition = 'opacity 1000ms ease'
    element.parentNode.replaceChild(newElement, element)
    setTimeout(() => newElement.style.opacity = 1, 100)
  }

  replaceElement('#question-header', `
    <div id="question-header" class="grid">
      <h1 itemprop="name" class="grid--cell fs-headline1 fl1 wb-break-word">
        <a href="/questions/843680/how-to-replace-dom-element-in-place-using-javascript" class="question-hyperlink">
          Injected Test 2
        </a>
      </h1>
      <div class="pl8 aside-cta grid--cell" role="navigation" aria-label="ask new question">
        <a href="/questions/ask" class="d-inline-flex ai-center ws-nowrap s-btn s-btn__primary">
          Ask Question
        </a>
      </div>
    </div>
  `)

})()