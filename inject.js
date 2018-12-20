(() => {

  if (injecta.started) return
  injecta.started = true

  const bodyCache = document.body.innerHTML

  injecta.dom.script = document.createElement('script')
  document.head.appendChild(injecta.dom.script)

  injecta.dom.style = document.createElement('style')
  document.head.appendChild(injecta.dom.style)

  const workerFunction = (() => {
    let interval, files
    const cache = { script: null, style: null }

    const readFile = (file, type) => {
      var XHR = new XMLHttpRequest()
      XHR.open('GET', file + '?v=' + Date.now())
      XHR.onreadystatechange = () => {
        if (XHR.readyState === 4 &&  XHR.status === 200) {
          if (XHR.responseText != cache[type]) {
            self.postMessage({
              'data': XHR.responseText,
              'type': type,
              'cached': (cache[type] !== null).toString()
            })
            cache[type] = XHR.responseText
          }  
        }
      }
      XHR.send(null)
    }

    const readAllFiles = () => {
      readFile(files.style, 'style')
      readFile(files.script, 'script')
      setTimeout(readAllFiles, interval)
    }

    self.onmessage = e => {
      const data = JSON.parse(e.data)
      interval = data.interval
      files = data.files
      readAllFiles()
    }
  }).toString()

  const workerBlob = new Blob(
    ['(' + workerFunction + ')()'],
    { type: 'text/javascript' }
  )

  const worker = new Worker(URL.createObjectURL(workerBlob))

  worker.onmessage = e => {
    const data = e.data

    if (data.type == 'script') {
      if (data.cached === 'true') {
        document.body.innerHTML = bodyCache
        const script = document.createElement('script')
        script.innerHTML = data.data
        injecta.dom.script.parentNode.replaceChild(script, injecta.dom.script)
        injecta.dom.script = script
      } else {
        injecta.dom.script.innerHTML = data.data
      }
      console.log('-- script updated')
    } else if (data.type == 'style') {
      injecta.dom.style.innerHTML = data.data
      console.log('-- style updated')
    }
  }

  worker.postMessage(JSON.stringify(injecta))

})()
