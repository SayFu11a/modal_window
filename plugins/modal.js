Element.prototype.appendAfter = function (element) {
   element.parentNode.insertBefore(this, element.nextSibling)
}

function _createModalFooter(buttons = []) {
   if (buttons.length === 0) {
      return document.createElement('div')
   }

   const wrap = document.createElement('div')
   wrap.classList.add('modal-footer')

   buttons.forEach(btn => {
      const $btn = document.createElement('button')
      $btn.textContent = btn.text
      $btn.classList.add('btn')
      $btn.classList.add(`btn-${btn.type || 'secondary'}`)
      $btn.onclick = btn.handler || noop

      wrap.appendChild($btn)
   })

   return wrap
}


function _createModal(options) {
   const DEFAULT_WIDTH = '600px'
   const modal = document.createElement('div')
   modal.classList.add('vmodal')
   modal.insertAdjacentHTML('afterbegin', `
         <div class="modal-overlay" data-close="true">
            <div style="width: ${options.width || DEFAULT_WIDTH}" class="modal-window" >
               <div class="modal-header">
                  <span class="modal-title">${options.title || 'окно'}</span>
                  ${options.closable ? `<span class="modal-close" data-close="true">&times;</span>` : ''}
                  </div>
               <div class="modal-body" data-content>
                  ${options.content || ''}
                  ${options.price || ''}
               </div>
            </div>
         </div>
   `)

   const footer = _createModalFooter(options.footerButtons)
   footer.appendAfter(modal.querySelector('[data-content]'))
   document.body.appendChild(modal)


   // my edition
   // let crosson = false


   // const window = document.getElementsByClassName('modal-window')[0]
   // console.log(window);
   // // window.onclick = function (){
   // //     // crosson = true
   // // }


   // const cross = document.getElementById('mod-clRem') ?? ''
   // cross.onclick = function () {
   //    console.log('click on cross')
   //    modal.classList.add('close')
   //    modal.classList.remove('open')
   //    // crosson = true
   // }


   // let overlayON = true
   // const overlay = document.getElementsByClassName('modal-overlay')[0]
   // console.log(overlay)
   // overlay.onclick = function (element) {
   //    // overlayON = false

   //    function _timeOUT() {
   //       modal.classList.add('close');
   //       modal.classList.remove('open');
   //    }
   //    if (overlayON)
   //       setTimeout(_timeOUT, 100)
   // }

   // window.onclick = function () {
   //    overlayON = false
   //    function setFalse() {
   //       overlayON = true
   //    }
   //    setTimeout(setFalse, 500)
   // }

   return modal
}







$.modal = function (options) {
   const ANIMATION_SPEED = 200
   //// /* my edition */
   const $modal = _createModal(options)
   let destroyed = false

   // const cross = document.getElementById('mod-clRem')
   // cross.onclick = close()

   const modal = {
      open() {
         if (destroyed) {
            return console.log('modal is destroyed');
         }
         $modal.classList.add('open')

      },
      close() {
         $modal.classList.remove('open')
         $modal.classList.add('close')
         setTimeout(() => {
            $modal.classList.remove('close')
            if (typeof options.onClose === 'function') {
               options.onClose()
            }
         }, ANIMATION_SPEED)
      }
   }

   const listener = event => {
      if (event.target.dataset.close) {
         modal.close()
      }
   }

   $modal.addEventListener('click', listener)

   return Object.assign(modal, {
      destroy() {
         $modal.parentNode.removeChild($modal)
         $modal.removeEventListener('click', listener)

         destroyed = true
      },
      setContent(html) {
         $modal.querySelector('[data-content]').innerHTML = html
      }
   })
}