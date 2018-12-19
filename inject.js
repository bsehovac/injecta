(() => {

  if (injecta.started) return
  injecta.started = true

  const update = {
    script: data => {
      if (injecta.cache.script) {
        document.body.innerHTML = injecta.cache.body
        const script = document.createElement('script')
        script.innerHTML = injecta.cache.script = data
        injecta.dom.script.parentNode.replaceChild(script, injecta.dom.script)
        injecta.dom.script = script
      } else {
        injecta.dom.script.innerHTML = injecta.cache.script = data
      }
      console.log('-- script updated')
    },
    style: data => {
      injecta.dom.style.innerHTML = injecta.cache.style = data
      console.log('-- style updated')
    }
  }

  const readFile = (file, type) => {
    var XHR = new XMLHttpRequest()
    XHR.open('GET', file + '?v=' + Date.now())
    XHR.onreadystatechange = () => {
      XHR.readyState === 4 &&
      XHR.status === 200 &&
      XHR.responseText != injecta.cache[type] &&
      update[type](XHR.responseText)
    }
    XHR.send(null)
  }

  injecta.cache.body = document.body.innerHTML

  injecta.dom.script = document.createElement('script')
  document.head.appendChild(injecta.dom.script)

  injecta.dom.style = document.createElement('style')
  document.head.appendChild(injecta.dom.style)

  const readAllFiles = () => {
    readFile(injecta.files.style, 'style')
    readFile(injecta.files.script, 'script')
  }

  readAllFiles()
  setInterval(readAllFiles, injecta.interval)

})()
