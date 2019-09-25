(function (a, b) {
  'use strict'
  var c = (function () {
    var a = [['requestFullscreen', 'exitFullscreen', 'fullscreenchange', 'fullscreen', 'fullscreenElement'], ['webkitRequestFullScreen', 'webkitCancelFullScreen', 'webkitfullscreenchange', 'webkitIsFullScreen', 'webkitCurrentFullScreenElement'], ['mozRequestFullScreen', 'mozCancelFullScreen', 'mozfullscreenchange', 'mozFullScreen', 'mozFullScreenElement']]
    for (var c = 0,
      d = a.length; c < d; c++) {
      var e = a[c]
      if (e[1] in b) return e
    }
  }())
  if (!c) return a.screenfull = !1

  /* 解决兼容性问题引起的报错 */
  var keyboardAllowed = typeof Element !== 'undefined' && 'ALLOW_KEYBOARD_INPUT' in Element
  function isFullscreen_zc (a, c, d) {
    if (/ Version\/5\.1(?:\.\d+)? Safari\//.test(navigator.userAgent)) {
      a[c[0]]()
    } else {
      if (keyboardAllowed) {
        a[c[0]](d && Element.ALLOW_KEYBOARD_INPUT)
      } else {
        a[c[0]]({ navigationUI: 'auto' })
      }
    }
  }

  var d = 'ALLOW_KEYBOARD_INPUT' in Element,
    e = {
      init: function () {
        return b.addEventListener(c[2],
          function (a) {
 219
            e.isFullscreen = b[c[3]],
            e.element = b[c[4]],
            e.onchange(a)
          }),
        this
      },
      isFullscreen: b[c[3]],
      element: b[c[4]],
      request: function (a) {
        a = a || b.documentElement,
        isFullscreen_zc(a, c, d),
        b.isFullscreen || a[c[0]]()
      },
      exit: function () {
        b[c[1]]()
      },
      toggle: function (a) {
        this.isFullscreen ? this.exit() : this.request(a)
      },
      onchange: function () {}
    }
  a.screenfull = e.init()
})(window, document)
