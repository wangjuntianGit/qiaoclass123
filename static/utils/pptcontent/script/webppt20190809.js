var $svg = function (elem) {
  return $(document.createElementNS('http://www.w3.org/2000/svg', elem))
}

export default function WebPPT (opt) {
  var _self = this
  var _container = opt.container
  var _objectContainer = opt.objectContainer
  var _pageContainer = opt.pageContainer
  var _data = opt.data
  var _resource = opt.resource || ''
  var _scale, _dpi
  var _page = opt.page || 1
  var _thumbWidth = opt.thumbWidth
  var _onPageChange = opt.onPageChange
  var _onModeChange = opt.onModeChange
  var _svg
  var _offset = 5
  var isDebug = false, isEdit = false
  var toolBoxTimer, editId
  var scale

  this.getPage = function () {
    return _page || 0
  }

  this.isEditMode = function () {
    return isEdit
  }

  this.setEditMode = function (v) {
    isEdit = v

    if (v) {	// 鏄剧ず缂栬緫妗�
      $('.page-tool').css({
        'display': 'flex',
        'top': 21
      })
      $('.page li').show()
    } else {
      $('.page-tool').css('display', 'none')
      $('.page li').each(function (i, o) {
        if ($(o).attr('data-hide') == 'true') $(o).hide()
      })
    }

    _onModeChange && _onModeChange(v)
  }

  this.getPageMax = function () {
    if (!_data) return 0

    return _data.slide.length
  }

  this.init = function () {
    _pageContainer.on('click', 'li', function () {
      if (isEdit) return

      _self.pageTo(parseInt($(this).attr('data-index')) + 1)
    })

    _svg = $svg('svg').attr({
      'width': '100%',
      'height': '100%',
      'xmlns': 'http://www.w3.org/2000/svg'
    })

    // var c = $('<div></div>');
    // c.append(_svg);
    _container.append(_svg)
    // console.log(_svg.find('defs').length)
    // _svg = _container.svg('get');
    // _svg.circle(130, 75, 50, {fill: 'none', stroke: 'red', strokeWidth: 3});
    // console.log(_svg)
  }

  this.load = function (option) {
    _data = option.data
    if (option.resource) _resource = option.resource

    _scale = _data.info.layoutWidth / _container.width()

    this.initShapeList(_page)
    this.initPageList(_page)
    this.initShape(_page, _svg, _data.info.layoutWidth, _data.info.layoutHeight)

    console.log('big')
    console.log(_svg)
  }

  this.pageTo = function (page) {
    if (_page == page) return
    var oldPage = _page

    _page = page
    this.initShapeList(_page)
    this.initShape(_page, _svg, _data.info.layoutWidth, _data.info.layoutHeight)
    _onPageChange && _onPageChange(oldPage, page)
  }

  this.getPageCount = function () {
    return _data.slide.length
  }

  this.clearShape = function (obj) {
    obj.empty()
    var defs = $svg('defs')

    obj.append(defs)
  }

  this.reload = function () {
    this.initShape(_page, _svg, _scale)
  }

  this.initShape = function (page, obj, sw, sh) {
    this.clearShape(obj)
    _container.find('video').remove()

    obj.get(0).setAttribute('viewBox', '0, 0, ' + sw + ', ' + sh)

    var pageSlide = _data.slide[page - 1]
    // console.log(pageSlide.slideMasterId)
    var shapeArr = _data.masterSlides.slide[pageSlide.slideMasterId].shape
    for (var i in shapeArr) {
      //			console.log(shapeArr[i])
      this.addShape({
        scale: scale,
        shape: shapeArr[i],
        container: obj
      })
    }

    var shapeArr = pageSlide.shape
    for (var i in shapeArr) {
      // console.log(shapeArr[i])
      this.addShape({
        scale: scale,
        shape: shapeArr[i],
        container: obj
      })
    }
  }

  this.initShapeList = function (page) {
    _objectContainer.empty()
    var shapeArr = _data.slide[page - 1].shape
    // console.log(shapeArr)
    for (var i = 0; i < shapeArr.length; i++) {
      var shape = shapeArr[shapeArr.length - 1 - i]
      _objectContainer.append('<li data-id="' + shape.id + '"' +
                  (shape.isPlaceholder ? ' data-placeholder-type' : '') +
                  '>' +
                  shape.name + '</li>')
    }
  }

  this.initPageList = function () {
    var slideArr = _data.slide
    // 绗�'+(i+1)+'椤�
    var scale = _data.info.layoutHeight / _data.info.layoutWidth

    for (var i = 0; i < slideArr.length; i++) {
      var li = $('<li data-index="' + i + '"></li>')
      _pageContainer.append(li)

      li.css({
        // 'width': _thumbWidth,
        // 'height': _thumbWidth  * scale,
      })

      var svg = $svg('svg').attr({
        'width': '100%',
        'height': '100%',
        'xmlns': 'http://www.w3.org/2000/svg'
        // 'viewBox' : '0,0,' + _data.info.layoutWidth + ',' + _data.info.layoutHeight * 0.85625
      })

      li.append(svg)
      li.append('<div>绗�' + (i + 1) + '椤�</div>')
      li.append('<div class="page-tool">' +
                  '<div class="btn-hide">闅愯棌</div>' +
                  '<div class="btn-move-up">鍓嶇Щ</div>' +
                  '<div class="btn-move-down">鍚庣Щ</div>' +
                  '</div>')

      _self.initShape(i + 1, svg, _data.info.layoutWidth * 0.85625, _data.info.layoutHeight * 0.85625)//, _data.info.layoutWidth / (_thumbWidth + 40));
      console.log('page:' + i)
      console.log(svg)

      li.on('click', '.btn-hide', function () {
        var o = $(this).parent().parent()
        console.log('.btn-hide')
        if (o.attr('data-hide') == 'true') {
          $(this).html('闅愯棌')
          o.attr('data-hide', '').css('opacity', '')
        } else {
          $(this).html('鏄剧ず')
          o.attr('data-hide', 'true').css('opacity', '.3')
        }
      })

      li.on('click', '.btn-move-up', function () {
        var o = $(this).parent().parent()
        console.log('.btn-move-up')
        if (o.prev().length == 0) {
          new Toast('宸茬粡鏄涓€椤�').show()
          return
        }

        o.insertBefore(o.prev())
      })

      li.on('click', '.btn-move-down', function () {
        var o = $(this).parent().parent()
        console.log('.btn-move-down')
        if (o.next().length == 0) {
          new Toast('宸茬粡鏄渶鍚庝竴椤�').show()
          return
        }

        o.insertAfter(o.next())
      })
    }
  }

  this.getDpi = function () {
    if (!_dpi) {
      var dpiTest = $("<p id='ppitest' style='width:1in;display:none;padding:0px'></p>")
      _container.append(dpiTest)
      _dpi = dpiTest.width()
      _container.find(dpiTest).remove()
    }
    return _dpi
  }

  this.addShape = function (opt) {
    var shape = opt.shape || 1
    var container = opt.container
    var scale = 1// opt.scale;
    var groupParam = opt.groupParam || null

    // var box = $svg('g').attr({

    // });
    // console.log(box)

    if (!groupParam) {
      var y = (shape.offsetY / scale / 14)
      var x = (shape.offsetX / scale / 14)
      var width = (shape.width / scale / 14)
      var height = (shape.height / scale / 14)
    } else {
      var y = ((shape.offsetY - groupParam.chOffsetY) * groupParam.scaleY / scale / 14)
      var x = ((shape.offsetX - groupParam.chOffsetX) * groupParam.scaleX / scale / 14)
      var width = (shape.width * groupParam.scaleX / scale / 14)
      var height = (shape.height * groupParam.scaleY / scale / 14)
    }

    // var dom = $('<div></div>');
    switch (shape.type) {
      case 'MathText':
        var image = $svg('image').attr({
          'data-type': shape.type,
          'data-id': shape.id,
          'y': y + 'em',
          'x': x + 'em',
          'width': width + 'em',
          'height': height + 'em',
          'preserveAspectRatio': 'none'
        })
        image.get(0).href.baseVal = _resource + shape.file
        container.append(image)

        image.on('click', function () {
          _self.toolBoxShow({
            obj: image
          })
        })
        break

      case 'RichText':
        // alert('r')
        var richTextBox = $svg('g')
          .attr({
            'data-type': shape.type,
            'data-id': shape.id,
            'transform': 'rotate(' + shape.rotation + ', ' + (shape.offsetX + shape.width / 2) / scale + ', ' + (shape.offsetY + shape.height / 2) / scale + ')'
          })

        var richTextBoxSvg = $svg('svg')
          .attr({
            'y': y + 'em',
            'x': x + 'em',
            'width': width + 'em',
            'height': height + 'em',
            'viewBox': '0 0 ' + (shape.width / scale) + ' ' + (shape.height / scale)
          })
        richTextBox.append(richTextBoxSvg)

        var geom = shape.geom

        switch (geom) {
          case 'downArrow':
          case 'rtTriangle':
            geom = 'polygon'
            break
          case 'straightConnector1':
            geom = 'line'
            break
          case 'arc':
            geom = 'path'
            break
        }

        var border = $svg(geom).attr({
          'fill': 'none'
        })
        // var fill = $svg(geom);

        // var lineWidth = 0;

        if (shape.border) {
          // lineWidth = shape.border.lineWidth;
          border.attr({
            'stroke-width': (shape.border.lineWidth / scale / 14) + 'em',
            'stroke-dasharray': (shape.border.lineType == 'dash' ? '8,6' : '')
          })

          switch (shape.border.fillType) {
            case 'solid':
              border.attr({
                'stroke': this.getColor(shape.border.color)
              })

              break

            case 'linear':
              var linear = $svg('linearGradient')
                .attr({
                  'id': 'border_' + shape.id,
                  'x1': 0,
                  'y1': 0,
                  'x2': 1,
                  'y2': 0,
                  'gradientTransform': 'rotate(' + (shape.border.rotation || 0) + ')'
                })
              _svg.find('defs').append(linear)

              var colors = []
              shape.border.color.forEach(function (color) {
                // console.log(color);
                colors.push({
                  'rgba': _self.getColor(color),
                  'pos': color.pos
                })
              })

              for (i = 0; i < colors.length - 1; i++) {
                for (j = 0; j < colors.length - 1 - i; j++) {
                  if (parseInt(colors[j].pos) > parseInt(colors[j + 1].pos)) {
                    var temp = colors[j]
                    colors[j] = colors[j + 1]
                    colors[j + 1] = temp
                  }
                }
              }

              colors.forEach(function (color) {
                var stop = $svg('stop')
                  .attr({
                    'offset': (color.pos / 1000) + '%',
                    'stop-color': color.rgba
                  })
                linear.append(stop)
              })

              border.attr({
                'stroke': 'url(#border_' + shape.id + ')'
              })
          }
        }
        richTextBoxSvg.append(border)
        // console.log(border)

        if (shape.fill) {
          // richTextBox.append(fill)

          switch (shape.fill.type) {
            case 'solid':
              border.attr({
                'fill': this.getColor(shape.fill.color)
              })
              break

            case 'linear':
              var linear = $svg('linearGradient')
                .attr({
                  'id': 'fill_' + shape.id,
                  'x1': 0,
                  'y1': 0,
                  'x2': 1,
                  'y2': 0,
                  'gradientTransform': 'rotate(' + (shape.fill.rotation || 0) + ')'
                })

              _svg.find('defs').append(linear)

              var colors = []
              shape.fill.color.forEach(function (color) {
                // console.log(color);
                colors.push({
                  'rgba': _self.getColor(color),
                  'pos': color.pos
                })
              })

              for (i = 0; i < colors.length - 1; i++) {
                for (j = 0; j < colors.length - 1 - i; j++) {
                  if (parseInt(colors[j].pos) > parseInt(colors[j + 1].pos)) {
                    var temp = colors[j]
                    colors[j] = colors[j + 1]
                    colors[j + 1] = temp
                  }
                }
              }

              colors.forEach(function (color) {
                var stop = $svg('stop')
                  .attr({
                    'offset': (color.pos / 1000) + '%',
                    'stop-color': color.rgba
                  })
                linear.append(stop)
              })

              border.attr({
                'fill': 'url(#fill_' + shape.id + ')'
              })
          }
        }

        // 闃村奖鏁堟灉鏈塀UG锛屾殏涓嶅疄鐜�
        /* if(shape.shadow){
                      var filter = $svg('filter')
                          .attr({
                              'id': 'shadow_'+shape.id,
                          });
                      _svg.find('defs').append(filter);

                      var feOffset = $svg('feOffset')
                          .attr({
                              'in': 'SourceAlpha',
                              'dx': shape.shadow.distance / scale / 14,
                              'dy': shape.shadow.distance / scale / 14,
                          });
                      filter.append(feOffset);

                      var feGaussianBlur = $svg('feGaussianBlur')
                          .attr({
                              'stdDeviation': 4,
                          });
                      filter.append(feGaussianBlur);

                      var feBlend = $svg('feBlend')
                          .attr({
                              'in': 'SourceGraphic',
                          });
                      filter.append(feBlend);

                      richTextBox.attr({
                          'filter': 'url(#shadow_' + shape.id + ')'
                      })
                  } */

        switch (shape.geom) {
          case 'arc':
            border.attr({
              'd': 'M' + (shape.width / 2 / scale) + ' 0 A' + (shape.width / 2 / scale) + ' ' +
                                  (shape.height / 2 / scale) + ' 0 0 1 ' +
                                  (shape.width / scale) + ' ' + (shape.height / 2 / scale)
            })
            break
          case 'rtTriangle':	// 涓夎褰�
            border.attr({
              'points': '0,0 ' + (shape.width / scale) + ',' + (shape.height / scale) + ' 0,' +
                                  (shape.height / scale)
            })
            break
          case 'straightConnector1':
          case 'line':
            if (shape.border.tailEnd == 'triangle') {
              var arrow = $svg('marker')
                .attr({
                  'id': 'arrow_' + shape.id,
                  'markerWidth': 'strokeWidth',
                  'markerWidth': 10,
                  'markerHeight': 10,
                  'viewBox': '0 0 10 10',
                  'refX': 9,
                  'refY': 5,
                  'orient': 'auto'
                })
              _svg.find('defs').append(arrow)

              var path = $svg('path')
                .attr({
                  'fill': this.getColor(shape.border.color),
                  'd': 'M1,1 L1,9 L9,5'
                })
              arrow.append(path)

              border.attr({
                'marker-end': 'url(#arrow_' + shape.id + ')'
              })
            }

            if (shape.flipV == '1') {
              border.attr({
                'x1': 0 + 'em',
                'y1': (shape.height / scale / 14) + 'em',
                'x2': (shape.width / scale / 14) + 'em',
                'y2': 0 + 'em'
              })
            } else {
              border.attr({
                'x2': 0 + 'em',
                'y2': (shape.height / scale / 14) + 'em',
                'x1': (shape.width / scale / 14) + 'em',
                'y1': 0 + 'em'
              })
            }

            if (shape.height == 0) {
              richTextBoxSvg.attr({
                'y': (y - (shape.border.lineWidth * 10 / 2 / scale / 14 * 2)) + 'em',
                'height': (shape.border.lineWidth * 10 / scale / 14 * 2) + 'em',
                'viewBox': '0 0 ' + (shape.width / scale) + ' ' + (shape.border.lineWidth * 10 / scale / 14 * 2)
              })
            }

            if (shape.width == 0) {
              richTextBoxSvg.attr({
                'x': (x - (shape.border.lineWidth * 10 / 2 / scale / 14 * 2)) + 'em',
                'width': (shape.border.lineWidth * 10 / scale / 14 * 2) + 'em',
                'viewBox': '0 0 ' + (shape.border.lineWidth * 10 / scale / 14 * 2) + ' ' + (shape.height / scale)
              })
            }
            break

          case 'rect':
            border.attr({
              'width': (shape.width / scale / 14) + 'em',
              'height': (shape.height / scale / 14) + 'em'
            })

            break

          case 'downArrow':
            var points = []

            points.push((shape.width / scale) + ',' +
                              ((shape.height - Math.sqrt(Math.pow(shape.width, 2) - Math.pow(shape.width / 2, 2)) * 0.6) / scale))
            points.push((shape.width / 2 / scale) + ',' + (shape.height / scale))
            points.push(0 + ','	+ ((shape.height - Math.sqrt(Math.pow(shape.width, 2) - Math.pow(shape.width / 2, 2)) * 0.6) / scale))
            points.push((shape.width * 0.25 / scale) + ',' + ((shape.height - Math.sqrt(Math.pow(shape.width, 2) - Math.pow(shape.width / 2, 2)) * 0.6) / scale))
            points.push((shape.width * 0.25 / scale) + ',' + 0)
            points.push((shape.width * 0.75 / scale) + ',' + 0)
            points.push((shape.width * 0.75 / scale) + ',' + ((shape.height - Math.sqrt(Math.pow(shape.width, 2) - Math.pow(shape.width / 2, 2)) * 0.6) / scale))

            border.attr({
              'points': points.join(' ')
            })
            break

          case 'mathPlus':
            var points = []
            var base = 0.35

            points.push(0 + ','	+ ((shape.height * base) / scale))
            points.push((shape.width * base / scale) + ',' + ((shape.height * base) / scale))
            points.push((shape.width * base / scale) + ',' + 0)
            points.push((shape.width * (1 - base) / scale) + ',' + 0)
            points.push((shape.width * (1 - base) / scale) + ',' + ((shape.height * base) / scale))
            points.push((shape.width / scale) + ',' + ((shape.height * base) / scale))
            points.push((shape.width / scale) + ',' + ((shape.height * (1 - base)) / scale))
            points.push((shape.width * (1 - base) / scale) + ',' + ((shape.height * (1 - base)) / scale))
            points.push((shape.width * (1 - base) / scale) + ',' + (shape.height / scale))
            points.push((shape.width * base / scale) + ',' + (shape.height / scale))
            points.push((shape.width * base / scale) + ',' + (shape.height * (1 - base) / scale))
            points.push(0 + ',' + ((shape.height * (1 - base)) / scale))

            border.attr({
              'points': points.join(' ')
            })
            break

          case 'ellipse':
            border.attr({
              'cx': (shape.width / scale / 14 / 2) + 'em',
              'cy': (shape.height / scale / 14 / 2) + 'em',
              'rx': (shape.width / scale / 14 / 2) + 'em',
              'ry': (shape.height / scale / 14 / 2) + 'em'
            })

            /* fill.attr({
                              'cx': (shape.width / scale / 14 / 2) + 'em',
                              'cy': (shape.height / scale / 14 / 2) + 'em',
                              'rx': ((shape.width - lineWidth / 2) / scale / 14 / 2) + 'em',
                              'ry': ((shape.height - lineWidth / 2) / scale / 14 / 2) + 'em',
                          }); */

            break
        }

        if (shape.paragraphs) {
          var foreignObject = $svg('foreignObject')
            .attr({
              'width': '100%',
              'height': '100%'
            }).css({
              'padding-right': (shape.right / scale / 14) + 'em',
              'padding-bottom': (shape.bottom / scale / 14) + 'em',
              'padding-left': (shape.left / scale / 14) + 'em',
              'padding-top': (shape.top / scale / 14) + 'em'
            })
          richTextBoxSvg.append(foreignObject)

          var wordArray = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
          for (var i in shape.paragraphs) {
            var paragraph = shape.paragraphs[i]
            var lineSpacing = 1.24

            switch (paragraph.lineSpacingType) {
              case 'pts':
                lineSpacing = paragraph.lineSpacing / scale * 1.24 + 'em'
                break
              default:
                lineSpacing = paragraph.lineSpacing / 100 * 1.24
            }

            var p = $('<div xmlns="http://www.w3.org/1999/xhtml"></div>').css({
              'writing-mode': (shape.vert == 'eaVert' ? 'tb-rl' : ''),
              'padding': 0,
              'margin-left': (paragraph.marginLeft ? paragraph.marginLeft / 14 / scale + 'em' : ''),
              'margin-right': (paragraph.marginRight ? paragraph.marginRight / 14 / scale + 'em' : ''),
              'text-indent': (paragraph.indent ? paragraph.indent / 14 / scale + 'em' : ''),
              'text-align': this.getHorizontal(paragraph.horizontal),
              // 'align-items': this.getVertical(paragraph.vertical),
              // 'display': 'flex',
              'line-height': lineSpacing
            })

            // 鑷姩缂栧彿澶勭悊
            var buttle = ''
            switch (paragraph.bulletType) {
              case 'TYPE_NUMERIC':
                switch (paragraph.bulletStyle) {
                  case 'alphaUcPeriod':
                    buttle = wordArray.substr((parseInt(paragraph.bulletStartAt) - 2 + parseInt(i)), 1) + '.'
                    break
                }
                p.append(_self.getShapeText({
                  scale: scale,
                  richText: paragraph.richText[0],
                  txt: buttle,
                  fontColor: paragraph.bulletColor,
                  fontName: paragraph.bulletFont
                }))
                p.find('span:eq(0)').css({
                  'width': (paragraph.marginRight ? paragraph.marginRight / 14 / scale + 'em' : '')
                })
                break
            }

            for (var j in paragraph.richText) {
              p.append(_self.getShapeText({
                scale: scale,
                richText: paragraph.richText[j]
              }))
            }

            foreignObject.append(p)
          }
        }

        richTextBox.on('click', function () {
          _self.toolBoxShow({
            obj: richTextBox,
            width: width,
            height: height
          })
        })

        container.append(richTextBox)
        // dom = this.getRichTextPrototype(dom, shape, groupParam);

        break

      case 'Drawing\\Gd':
        // dom = this.getShapePrototype(dom, shape, groupParam);
        // dom.css({
        //	'background-size': '100%',
        //	'background-repeat': 'no-repeat',
        //	'background-image': 'url('+_resource+shape.file+')'
        // });
        switch (shape.mimeType) {
          case 'application/octet-stream':
            var box = $svg('g')
              .attr({
                'data-type': shape.type,
                'data-id': shape.id,
                'transform': 'rotate(' + shape.rotation + ', ' + (shape.offsetX + shape.width / 2) / scale + ', ' + (shape.offsetY + shape.height / 2) / scale + ')'
              })

            var foreignObject = $svg('foreignObject')
              .attr({
                'x': x + 'em',
                'y': y + 'em',
                'width': width + 'em',
                'height': height + 'em'
              }).css({
                'padding-right': (shape.right / scale / 14) + 'em',
                'padding-bottom': (shape.bottom / scale / 14) + 'em',
                'padding-left': (shape.left / scale / 14) + 'em',
                'padding-top': (shape.top / scale / 14) + 'em'
              })
            box.append(foreignObject)

            /* var video = $('<video></video>')
                              .attr({
                                  'controlslist': "nodownload",
                                  'width': '100%',
                                  'height': '100%',
                                  'controls' : "controls",
                          //		'type': 'video/mp4',
                                  'src': 'http://www.w3school.com.cn/i/movie.ogg',//_resource+shape.file
                              }).css({
                                  'background':'#000',
                              });
                          foreignObject.append(video); */

            var image = $('<img />').attr({
              'data-type': shape.type,
              'data-id': shape.id,
              'width': '100%',
              'height': '100%',
              'src': _resource + shape.previewFile
            }).on('click', function () {
              _self.playVideo(image)
            })
            foreignObject.append(image)

            // console.log(image);

            // video.get(0).src = 'http://www.paulirish.com/work/octopus.mp4';
            container.append(box)

            box.on('click', function () {
              _self.toolBoxShow({
                obj: box,
                width: width,
                height: height
              })
            })
            break

          default:
            var image = $svg('image').attr({
              'data-type': shape.type,
              'data-id': shape.id,
              'y': y + 'em',
              'x': x + 'em',
              'width': width + 'em',
              'height': height + 'em',
              'preserveAspectRatio': 'none'
            })
            image.get(0).href.baseVal = _resource + shape.previewFile
            container.append(image)

            image.on('click', function () {
              _self.toolBoxShow({
                obj: image,
                width: width,
                height: height
              })
            })
        }

        break

      case 'Group':
        var groupBox = $svg('svg')
          .attr({
            'data-type': shape.type,
            'data-id': shape.id,
            'y': y + 'em',
            'x': x + 'em',
            'width': width + 'em',
            'height': height + 'em'
          })

        //				dom = this.getShapePrototype(dom, shape, groupParam);

        /*				dom.attr({
                      'data-scale-x': shape.scaleX,
                      'data-scale-y': shape.scaleY
                  })
  */
        container.append(groupBox)

        if (!groupParam) {
          groupBox.on('click', function () {
            _self.toolBoxShow({
              obj: groupBox,
              width: width,
              height: height
            })
          })
        }

        for (var i in shape.shape) {
          // console.log(shape.id+"======shape:"+i)
          this.addShape({
            shape: shape.shape[i],
            container: groupBox,
            groupParam: {
              'chOffsetX': shape.chOffsetX,
              'chOffsetY': shape.chOffsetY,
              'scaleX': shape.scaleX,
              'scaleY': shape.scaleY
            }
          })
        }

        break

      case 'Table':
        var tableBox = $svg('g')
          .attr({
            'data-type': shape.type,
            'data-id': shape.id,
            'transform': 'rotate(' + shape.rotation + ', ' + (shape.offsetX + shape.width / 2) / scale + ', ' + (shape.offsetY + shape.height / 2) / scale + ')'
          })

        /* var richTextBoxSvg = $svg('svg')
                      .attr({
                          'y': y + 'em',
                          'x': x + 'em',
                          'width': width + 'em',
                          'height': height + 'em',
                          'viewBox': '0 0 ' + (shape.width / scale) + ' ' + (shape.height / scale),
                      });
                  tableBox.append(richTextBoxSvg); */

        var foreignObject = $svg('foreignObject')
          .attr({
            'x': x + 'em',
            'y': y + 'em',
            'width': width + 'em',
            'height': height + 'em'
          }).css({
            'padding-right': (shape.right / scale / 14) + 'em',
            'padding-bottom': (shape.bottom / scale / 14) + 'em',
            'padding-left': (shape.left / scale / 14) + 'em',
            'padding-top': (shape.top / scale / 14) + 'em'
          })
        tableBox.append(foreignObject)

        var table = $('<table xmlns="http://www.w3.org/1999/xhtml"></table>')
          .attr({
            'width': '100%'
          }).css({
            'border-collapse': 'collapse'
          })
        foreignObject.append(table)

        for (var i = 0; i < shape.rows.length; i++) {
          var row = shape.rows[i]

          var tr = $('<tr></tr>').css({
            'height': row.height / scale
          })
          table.append(tr)

          for (var j = 0; j < row.cols.length; j++) {
            var col = row.cols[j]

            var td = $('<td></td>')

            if (col.colSpan) {
              td.attr('colspan', col.colSpan)
              j = j + col.colSpan - 1
            }

            if (i == 0) {
              td.css({
                'width': col.width / scale
              })
            }
            tr.append(td)

            if (col.border) {
              if (col.border.top) {
                td.css({
                  'border-top': col.border.top.lineWidth / scale / 14 + 'em ' + _self.getColor(col.border.top.color) + ' ' + col.border.top.lineType
                })
              }
              if (col.border.left) {
                td.css({
                  'border-left': col.border.left.lineWidth / scale / 14 + 'em ' + _self.getColor(col.border.left.color) + ' ' + col.border.left.lineType
                })
              }
              if (col.border.right) {
                td.css({
                  'border-right': col.border.right.lineWidth / scale / 14 + 'em ' + _self.getColor(col.border.right.color) + ' ' + col.border.right.lineType
                })
              }
              if (col.border.bottom) {
                td.css({
                  'border-bottom': col.border.bottom.lineWidth / scale / 14 + 'em ' + _self.getColor(col.border.bottom.color) + ' ' + col.border.bottom.lineType
                })
              }

              // console.log(col.border.top.lineWidth / scale / 14 + 'em ' + _self.getColor(col.border.top.color) + ' ' + col.border.top.lineType)
            }

            if (col.fill) {
              td.css({
                'background': _self.getColor(col.fill.color)
              })
              // console.log(col.fill.color)
              // console.log(_self.getColor(col.fill.color))
            }
            if (col.paragraphs) {
              var wordArray = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
              for (var ii in col.paragraphs) {
                var paragraph = col.paragraphs[ii]
                var lineSpacing = 1.24

                switch (paragraph.lineSpacingType) {
                  case 'pts':
                    lineSpacing = paragraph.lineSpacing / scale * 1.24 + 'em'
                    break
                  default:
                    lineSpacing = paragraph.lineSpacing / 100 * 1.24
                }

                var p = $('<div></div>').css({
                  'writing-mode': (col.vert == 'eaVert' ? 'tb-rl' : ''),
                  'padding': 0,
                  'margin-left': (paragraph.marginLeft ? paragraph.marginLeft / 14 / scale + 'em' : ''),
                  'margin-right': (paragraph.marginRight ? paragraph.marginRight / 14 / scale + 'em' : ''),
                  'text-indent': (paragraph.indent ? paragraph.indent / 14 / scale + 'em' : ''),
                  'text-align': this.getHorizontal(paragraph.horizontal),
                  // 'align-items': this.getVertical(paragraph.vertical),
                  // 'display': 'flex',
                  'line-height': lineSpacing
                })

                // 鑷姩缂栧彿澶勭悊
                var buttle = ''
                switch (paragraph.bulletType) {
                  case 'TYPE_NUMERIC':
                    switch (paragraph.bulletStyle) {
                      case 'alphaUcPeriod':
                        buttle = wordArray.substr((parseInt(paragraph.bulletStartAt) - 2 + parseInt(i)), 1) + '.'
                        break
                    }
                    p.append(_self.getShapeText({
                      scale: scale,
                      richText: paragraph.richText[0],
                      txt: buttle,
                      fontColor: paragraph.bulletColor,
                      fontName: paragraph.bulletFont
                    }))
                    p.find('span:eq(0)').css({
                      'width': (paragraph.marginRight ? paragraph.marginRight / 14 / scale + 'em' : '')
                    })
                    break
                }

                for (var k in paragraph.richText) {
                  p.append(_self.getShapeText({
                    scale: scale,
                    richText: paragraph.richText[k]
                  }))
                }

                td.append(p)
              }
            }
          }
        }

        tableBox.on('click', function () {
          _self.toolBoxShow({
            obj: tableBox
          })
        })

        container.append(tableBox)

        break

      default:
        alert(shape.type + '鏈鐞�')
    }
    // container.append(dom);
  }

  this.pt2px = function (value) {
    // console.log(value)
    return value * this.getDpi() / 72
  }

  this.getShapeText = function (opt) {
    var richText = opt.richText
    var txt = opt.txt || richText.text.replace(/\s/g, '&nbsp;')
    var fontColor = this.getColor(opt.fontColor || richText.fontColor)
    var fontName = opt.fontName || richText.fontName
    var scale = opt.scale
    var fontSize = this.pt2px(richText.fontSize / scale / 14)
    if (richText.fontSubScript) fontSize = fontSize * 0.6

    var text = '<span style="' +
                  'font-size:' + fontSize + 'em;' +
                  'font-family:' + fontName + ';' +
                  (richText.fontBold ? 'font-weight:bold; ' : '') +
                  (richText.fontItalic ? 'font-style:italic; ' : '') +
                  (richText.fontSubScript ? 'margin-top:' + (fontSize / 0.6 * 0.4) + 'px; ' : '') +
                  (fontColor ? 'color:' + fontColor + '; ' : '') +
                  (richText.fontCharSpace ? 'letter-spacing:' + this.pt2px(richText.fontCharSpace / scale) + 'px' : '') +
                  '">' + txt + '</span>'

    return text
  }

  // 鍏叡灞炴€�
  this.getShapePrototype = function (dom, shape, groupParam) {
    var dom = opt.dom
    var shape = opt.shape
    var scale = opt.scale
    var groupParam = opt.groupParam
    //		dom.attr('data-top', shape.offseY)

    if (!groupParam) {
      if (shape.offsetY) dom.css('top', shape.offsetY / scale)
      if (shape.offsetX) dom.css('left', shape.offsetX / scale)
      if (shape.width) dom.css('width', shape.width / scale)
      if (shape.height) dom.css('height', shape.height / scale)
    } else {
      if (shape.offsetY) dom.css('top', (shape.offsetY - groupParam.chOffsetY) * groupParam.scaleX / scale)
      if (shape.offsetX) dom.css('left', (shape.offsetX - groupParam.chOffsetX) * groupParam.scaleX / scale)
      if (shape.width) dom.css('width', shape.width * groupParam.scaleX / scale)
      if (shape.height) dom.css('height', shape.height * groupParam.scaleY / scale)
    }

    if (shape.type != 'RichText') {
      if (shape.right) dom.css('padding-right', shape.right / scale)
      if (shape.bottom) dom.css('padding-bottom', shape.bottom / scale)
      if (shape.left) dom.css('padding-left', shape.left / scale)
      if (shape.top) dom.css('padding-top', shape.top / scale)
    }
    // Group
    /* if(shape.chOffsetX) dom.attr('data-choffsetx', shape.chOffsetX);
          if(shape.chOffsetY) dom.attr('data-choffsety', shape.chOffsetY);
          if(shape.chWidth)   dom.attr('data-chwidth', shape.chWidth);
          if(shape.chHeight)  dom.attr('data-chheight', shape.chHeight); */

    if (isDebug) {
      dom.css({
        'border-width': '1px',
        'border-color': '#999',
        'border-style': 'dotted'
      })
    }

    dom.css({
      'position': 'absolute'
      // 'display': 'flex',

      // 'flex-direction': 'column'
    }).attr({
      'data-type': shape.type,
      'data-id': shape.id,
      'data-placeholder': shape.placeholderType
    })

    return dom
  }

  // 鍏紡
  this.getMathPrototype = function (dom, shape, groupParam) {
    dom = this.getShapePrototype(dom, shape, groupParam)

    dom.css({
      'background-size': '100%',
      'background-repeat': 'no-repeat',
      'background-image': 'url(' + _resource + shape.file + ')'
    })

    return dom
  }

  this.getRectPrototype = function (dom, shape, groupParam) {
    dom = this.getShapePrototype(dom, shape, groupParam)

    return dom
  }

  this.getLineStyle = function (lineStyle, top, color) {
    var arrow = $('<div></div>')
    switch (lineStyle.style) {
      case 'triangle':
        arrow.css({
          'position': 'absolute',
          'margin-left': '-5px',
          'width': 0,
          'height': 0,
          'border-left': '4px solid transparent',
          'border-right': '4px solid transparent'
        })

        if (top == 0) {
          arrow.css({
            'border-bottom': '15px solid ' + color,
            'margin-top': (top - 2) + 'px'
          })
        } else {
          arrow.css({
            'border-top': '15px solid ' + color,
            'margin-top': top + 'px'
          })
        }
        break
    }
    return arrow
  }

  this.getRichTextPrototype = function (dom, shape, groupParam) {
    dom = this.getShapePrototype(dom, shape, groupParam)

    var dom2 = $('<div></div>')
    dom.append(dom2)

    if (shape.right) dom2.css('padding-right', shape.right / _scale)
    if (shape.bottom) dom2.css('padding-bottom', shape.bottom / _scale)
    if (shape.left) dom2.css('padding-left', shape.left / _scale)
    if (shape.top) dom2.css('padding-top', shape.top / _scale)

    var borderColor = isDebug ? '#999' : 'transparent'
    var fillColor = 'transparent'
    var borderImage = ''
    var borderRadius = ''
    var borderWidth = 0
    var fill, border, shadow

    switch (shape.geom) {
      case 'ellipse':
        borderRadius = '100%'
        break
    }

    if (shape.border) border = this.getBorder(shape.border)
    if (shape.fill) fill = this.getFill(shape.fill)
    if (shape.shadow) shadow = this.getShadow(shape.shadow)

    if (shadow) {
      // console.log(shadow.distance+'px '+shadow.color)
      dom.css({
        'box-shadow': '0 ' + shadow.distance + 'px ' + shadow.blurRadius + 'px ' + shadow.color
      })
    }

    if (fill) {
      switch (fill.type) {
        case 'solid':
          fillColor = fill.color
          // alert(fillColor)
          break
        case 'linear':
          var c = Array()
          for (var i = 0; i < fill.color.length; i++) {
          // console.log(i+" "+fill.color[i])
            c.push(fill.color[i].rgba + ' ' + (fill.color[i].pos / 1000) + '%')
          }
          fillColor = 'linear-gradient(' + fill.rotation + 'deg, ' + c.join(', ') + ')'
          // alert(fillColor)
          break
      }
    }

    if (border) {
      //			console.log(border)
      switch (border.fillType) {
        case 'solid':
          dom.css({
            'border-color': borderColor
          })
          break
        case 'linear':
          var c = Array()
          //				console.log(border)
          for (var i = 0; i < border.color.length; i++) {
            // console.log(i+" "+border.color[i])
            c.push(border.color[i].rgba + ' ' + (border.color[i].pos / 1000) + '%')
          }
          borderImage = 'linear-gradient(' + border.rotation + 'deg, ' + c.join(', ') + ')'
          dom.css({
            'background-image': borderImage
          })
          // alert(dom.css('border-image'))
          //					console.log(borderImage)
          break
      }
      borderWidth = border.lineWidth

      dom.css({
        'border-radius': borderRadius
      })
    }

    /* dom2.css({
              'border-radius': borderRadius,
              'background': fillColor,
              'writing-mode': (shape.vert=='eaVert' ? 'tb-rl' : ''),
              'margin':borderWidth,
              'height':'calc(100% - '+(borderWidth*2)+'px)'
          });

          //绔栨帓鏂囧瓧鍋忓彸鐨凚UG锛屼复鏃跺鐞嗭紝鏃ュ悗浼樺寲
          if(shape.vert=='eaVert')
              dom2.css({
                  'left': '-48%',
              }) */

    if (shape.horizontal) { dom.css('justify-content', this.getHorizontal(shape.horizontal)) }

    for (var i in shape.paragraphs) {
      var paragraph = shape.paragraphs[i]
      var p = $('<div></div>')

      p.css({
        'padding': 0,
        'margin': 0
      })

      p.css({
        'justify-content': this.getHorizontal(paragraph.horizontal),
        'align-items': this.getVertical(paragraph.vertical),
        'display': 'flex'
      })

      // console.log(paragraph)
      if (paragraph.lineSpacing) {
        console.log(paragraph.lineSpacing)
        //	console.log(shape.height)
        //	console.log(shape.top)
        //	console.log(shape.bottom)
        //	console.log("=========================")
        p.css('line-height', parseFloat(paragraph.lineSpacing / 100))
      }

      var text = ''
      for (var j in paragraph.richText) {
        var richText = paragraph.richText[j]
        var fontColor = this.getColor(richText.fontColor)

        // console.log(this.pt2px(richText.fontSize / _scale));
        var fontSize = this.pt2px(richText.fontSize / _scale)
        if (richText.fontSubScript) fontSize = fontSize * 0.6

        text += '<span style="' +
                          'font-size:' + fontSize + 'px;' +
                          'font-family:' + richText.fontName + ';' +
                          (richText.fontBold ? 'font-weight:bold; ' : '') +
                          (richText.fontItalic ? 'font-style:italic; ' : '') +
                          (richText.fontSubScript ? 'margin-top:' + (fontSize / 0.6 * 0.4) + 'px; ' : '') +
                          (fontColor ? 'color:' + fontColor + '; ' : '') +
                          (richText.fontCharSpace ? 'letter-spacing:' + this.pt2px(richText.fontCharSpace / _scale) + 'px' : '') +
                          '">' + richText.text + '</span>'
      }
      p.html(text)
      dom2.append(p)
    }

    if (shape.placeholderType) {
      var masterShape
      for (var i in _data.masterSlides) {
        for (var j in _data.masterSlides[i].shape) {
          masterShape = _data.masterSlides[i].shape[j]
          if (shape.placeholderType == masterShape.placeholderType) { break }
        }
      }

      if (masterShape) {
        dom = this.getShapePrototype(dom, masterShape)

        for (var i in masterShape.paragraphs) {
          var paragraph = masterShape.paragraphs[i]

          var horizontal = 'left'

          // dom.find('div').eq(i).css({
          //	'justify-content': this.getHorizontal(paragraph.horizontal),
          //	'align-items': this.getVertical(paragraph.vertical),
          //	'display': 'flex',
          // })
        }

        var idx = masterShape.placeholderIdx || 1
        var listStyle = masterShape.listStyle[idx - 1]

        dom.css({
          'font-size': this.pt2px(listStyle.fontSize / _scale) + 'px'
        })

        if (dom.css('justify-content') == '') { dom.css('justify-content', this.getHorizontal(listStyle.align)) }

        if (masterShape.vertical) { dom.css('align-items', this.getVertical(masterShape.vertical)) }
      }
    }

    return dom
  }

  this.getSchemeColor = function (v) {
    var colorMaps = _data.masterSlides.colorMap
    var schemeColor = _data.masterSlides.schemeColors
    var name = eval('colorMaps.' + v)
    return eval('schemeColor.' + name)
  }

  this.getHorizontal = function (horizontal) {
    switch (horizontal) {
      case 'HORIZONTAL_CENTER':
      case 'ctr':
        return 'center'
        break
      case 'l':
        return 'left'
        break
      case 'r':
        return 'flex-end'
        break
      default:
        return 'left'
    }
  }

  this.getVertical = function (vertical) {
    switch (vertical) {
      case 'VERTICAL_BASE':
        return 'flex-start'
      case 'b':
        return 'flex-end'
      default:
        return 'center'
    }
  }

  this.hex2rgba = function (hex) {
    var a = parseInt('0x' + hex.slice(0, 2)) / 255
    var r = parseInt('0x' + hex.slice(2, 4))
    var g = parseInt('0x' + hex.slice(4, 6))
    var b = parseInt('0x' + hex.slice(6, 8))

    return {
      red: r,
      green: g,
      blue: b,
      alpha: a,
      rgba: 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')'
    }
  }

  this.getColor = function (shape) {
    var color

    switch (shape.type) {
      case 'schemeColor':
        // console.log(shape.value);
        // console.log(this.getSchemeColor(shape.value));
        color = this.getSchemeColor(shape.value)
        color = this.hex2rgba(color)

        // if(shape.value=='bg1')
        // console.log(color)
        break

      case 'color':
        color = this.hex2rgba(shape.color)
        break
    }

    if (color) {
      // 鏄惁鏈変寒搴�
      if (shape.lumOff) {
        var v = shape.lumOff / 1000
        var r = parseInt((255 - color.red) * (v / 100) + color.red)
        var g = parseInt((255 - color.green) * (v / 100) + color.green)
        var b = parseInt((255 - color.blue) * (v / 100) + color.blue)

        color = 'rgba(' + r + ',' + g + ',' + b + ',' + color.alpha + ')'
      } else if (shape.lumMod) {
        var v = shape.lumMod / 1000
        // console.log('lumMod');
        // console.log(v)
        // console.log(color.red*v/100)
        var r = parseInt(color.red * v / 100)
        var g = parseInt(color.green * v / 100)
        var b = parseInt(color.blue * v / 100)

        color = 'rgba(' + r + ',' + g + ',' + b + ',' + color.alpha + ')'
      } else { color = color.rgba }
    }

    return color
  }

  this.getShadow = function (shape) {
    var shadow = shape
    shadow.color = this.getColor(shape.color)
    return shadow
  }

  this.getBorder = function (shape) {
    var border = []
    border.fillType = shape.fillType
    border.lineWidth = shape.lineWidth

    var rotation = shape.rotation || 0
    rotation = parseFloat(rotation) + 90
    if (rotation > 360) rotation = 360 - rotation
    border.rotation = rotation

    switch (border.fillType) {
      case 'solid':
        border.color = this.getColor(shape.color)
        break

      case 'linear':
        var colors = []
        shape.color.forEach(function (color) {
          // console.log(color);
          colors.push({
            'rgba': _self.getColor(color),
            'pos': color.pos
          })
        })

        for (i = 0; i < colors.length - 1; i++) {
          for (j = 0; j < colors.length - 1 - i; j++) {
            if (parseInt(colors[j].pos) > parseInt(colors[j + 1].pos)) {
              var temp = colors[j]
              colors[j] = colors[j + 1]
              colors[j + 1] = temp
            }
          }
        }

        border.color = colors
    }

    return border
  }

  this.getFill = function (shape) {
    var fill = []
    fill.type = shape.type

    var rotation = shape.rotation || -90
    rotation = parseFloat(rotation) + 90
    if (rotation > 360) rotation = 360 - rotation
    fill.rotation = rotation

    switch (fill.type) {
      case 'solid':
        fill.color = this.getColor(shape.color)
        break

      case 'linear':
        var colors = []
        shape.color.forEach(function (color) {
          // console.log(color);
          colors.push({
            'rgba': _self.getColor(color),
            'pos': color.pos
          })
        })

        for (i = 0; i < colors.length - 1; i++) {
          for (j = 0; j < colors.length - 1 - i; j++) {
            if (parseInt(colors[j].pos) > parseInt(colors[j + 1].pos)) {
              var temp = colors[j]
              colors[j] = colors[j + 1]
              colors[j + 1] = temp
            }
          }
        }

        fill.color = colors
    }

    return fill
  }

  this.playVideo = function (obj) {
    // console.log(obj.width())
    // console.log(obj.width() / _scale)
    if (obj.parent().parent().parent().parent().width() < 390 || isEdit) return
    //		console.log()
    var player = $('<video></video>')
      .attr({
        'controlslist': 'nodownload',
        'controls': 'controls',
        //		'type': 'video/mp4',
        'src': 'http://www.w3school.com.cn/i/movie.ogg' // _resource+shape.file
      }).css({
        'background': '#000',
        'position': 'absolute',
        'top': obj.offset().top,
        'left': obj.offset().left,
        'width': obj.width() / _scale,
        'height': obj.height() / _scale
      })

    // player.get(0).src = 'http://www.paulirish.com/work/octopus.mp4';
    _container.append(player)
  }

  this.toolBoxShow = function (opt) {
    var obj = opt.obj
    var w = opt.width || obj.width()
    var h = opt.height || obj.height()

    console.log('enter' + obj.attr('data-id'))

    clearTimeout(toolBoxTimer)

    if (!isEdit) return

    // if (editId==obj.attr('data-id')){
    if (_container.find('.toolbox').length > 0) {
      var toolbox = _container.find('.toolbox')
      var selectbox_tl = _container.find('.tl')
      var selectbox_tc = _container.find('.tc')
      var selectbox_tr = _container.find('.tr')
      var selectbox_ml = _container.find('.ml')
      var selectbox_mc = _container.find('.mc')
      var selectbox_mr = _container.find('.mr')
      var selectbox_bl = _container.find('.bl')
      var selectbox_bc = _container.find('.bc')
      var selectbox_br = _container.find('.br')
    } else {
      var toolbox = $('<div class="toolbox"></div>')
      var selectbox_tl = $('<div class="selectbox tl"></div>')
      var selectbox_tc = $('<div class="selectbox tc"></div>')
      var selectbox_tr = $('<div class="selectbox tr"></div>')
      var selectbox_ml = $('<div class="selectbox ml"></div>')
      var selectbox_mc = $('<div class="selectbox mc"></div>')
      var selectbox_mr = $('<div class="selectbox mr"></div>')
      var selectbox_bl = $('<div class="selectbox bl"></div>')
      var selectbox_bc = $('<div class="selectbox bc"></div>')
      var selectbox_br = $('<div class="selectbox br"></div>')

      var toolbox_del = $('<div>鍒犻櫎</div>')
      toolbox.append(toolbox_del)
      toolbox_del.on('click', function () {
        if (!confirm('纭鍒犻櫎姝ょ粍浠跺悧锛�')) return
        console.log(obj)
        obj.remove()
      })

      _container.append(toolbox)
      _container.append(selectbox_tl)
      _container.append(selectbox_tc)
      _container.append(selectbox_tr)
      _container.append(selectbox_ml)
      _container.append(selectbox_mc)
      _container.append(selectbox_mr)
      _container.append(selectbox_bl)
      _container.append(selectbox_bc)
      _container.append(selectbox_br)
    }

    // };

    editId = obj.attr('data-id')

    console.log(obj)

    selectbox_tl.css({
      'position': 'absolute',
      'border': '1px #000 solid',
      'background': '#fff',
      'top': obj.offset().top - 2,
      'left': obj.offset().left - 2,
      'width': '5px',
      'height': '5px',
      'cursor': 'se-resize'
    })/* .on('mouseover', function(){
                  clearTimeout(toolBoxTimer);
              }).on('mouseout', function(){
                  _self.toolBoxHide();
              }) */

    selectbox_tc.css({
      'position': 'absolute',
      'border': '1px #000 solid',
      'background': '#fff',
      'top': obj.offset().top,
      'height': '5px',
      'width': '5px',
      'left': obj.offset().left + (w / _scale * 14 / 2) - 2

    })

    selectbox_tr.css({
      'position': 'absolute',
      'border': '1px #000 solid',
      'background': '#fff',
      'top': obj.offset().top,
      'left': obj.offset().left + (w / _scale * 14) - 2,
      'width': '5px',
      'height': '5px'
    })

    selectbox_ml.css({
      'position': 'absolute',
      'border': '1px #000 solid',
      'background': '#fff',
      'top': obj.offset().top + (h / _scale * 14 / 2) - 2,
      'left': obj.offset().left,
      'width': '5px',
      'height': '5px'
    })

    selectbox_mc.css({
      'position': 'absolute',
      'border': '1px #000 solid',
      'background': '#fff',
      'top': obj.offset().top + (h / _scale * 14 / 2) - 2,
      'left': obj.offset().left + (w / _scale * 14 / 2) - 2,
      'width': '5px',
      'height': '5px'
    })

    selectbox_mr.css({
      'position': 'absolute',
      'border': '1px #000 solid',
      'background': '#fff',
      'top': obj.offset().top + (h / _scale * 14 / 2) - 2,
      'left': obj.offset().left + (w / _scale * 14) - 2,
      'width': '5px',
      'height': '5px'
    })

    selectbox_bl.css({
      'position': 'absolute',
      'border': '1px #000 solid',
      'background': '#fff',
      'top': obj.offset().top + (h / _scale * 14) - 2,
      'left': obj.offset().left,
      'width': '5px',
      'height': '5px'
    })

    selectbox_bc.css({
      'position': 'absolute',
      'border': '1px #000 solid',
      'background': '#fff',
      'top': obj.offset().top + (h / _scale * 14) - 2,
      'left': obj.offset().left + (w / _scale * 14 / 2) - 2,
      'width': '5px',
      'height': '5px'
    })

    selectbox_br.css({
      'position': 'absolute',
      'border': '1px #000 solid',
      'background': '#fff',
      'top': obj.offset().top + (h / _scale * 14) - 2,
      'left': obj.offset().left + (w / _scale * 14) - 2,
      'width': '5px',
      'height': '5px',
      'cursor': 'se-resize'
    })

    toolbox.css({
      'background': 'rgba(255,255,255,.6)',
      'border': '1px #999 solid',
      'border-radius': '5px',
      'display': 'flex',
      'position': 'absolute'
    }).find('div').css({
      'padding': '3px 10px',
      'cursor': 'pointer'
    })

    toolbox.css({
      'top': obj.offset().top - 5 - toolbox.height(),
      'left': obj.offset().left + (w / _scale * 14) - toolbox.width()
    })

  /* .on('mouseover', function(){
              //clearTimeout(toolBoxTimer);
          }).on('mouseout', function(){
              _self.toolBoxHide();
          }) */
  }

  this.toolBoxHide = function () {
    toolBoxTimer = setTimeout(function () {
      _container.find('.toolbox').remove()
      _container.find('.selectbox').remove()
    }, 100)
  }

  this.init()

  return this
}
