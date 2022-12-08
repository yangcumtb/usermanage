/* eslint-disable*/
define([
  'dojo/_base/declare',
  'dojo/dom-class',
  'dojo/dom-style',
  'dojo/Deferred',
  'dojo/Evented',
  'esri/layers/Layer',
  'dojo/dom-construct',
  'dojo/_base/lang',
  'dojo/_base/array',
  'dojo/on',
  'dojo/dom-geometry',
  'esri/geometry/geometryEngine',
  'esri/core/watchUtils',
  'esri/views/layers/LayerView',
  'esri/core/Collection',
  '/assets/modular/map/src/domLayer/rbush.js'
], function (
  declare,
  domClass,
  domStyle,
  Deferred,
  Evented,
  Layer,
  domConstruct,
  lang,
  arrayUtil,
  on,
  domGeometry,
  geometryEngine,
  watchUtils,
  LayerView,
  Collection,
  Rbush
) {
  var clazz = LayerView.createSubclass({
    transformOffset: {
      x: 0,
      y: 0
    },
    constructor(param) {
      this.supportsDraping = true;
      this.overlayUpdating = false;
      // console.log(LayerView);
      this.elevationInfo = null;

      this.direction = "center";

      if (param.layer.id == 'section') {
        this.direction = "bottom-mid";
      }
      param.layer.on(
        'after-add',
        function (param) {
          this._add(param.item);
        }.bind(this)
      );

      param.layer.on(
        'after-remove',
        function (param) {
          this._remove(param.item);
        }.bind(this)
      );
    },

    render(evt) {
      console.log(evt);
    },

    _remove(ele) {
      if (ele.node) {
        domConstruct.destroy(ele.node);
      }
    },
    viewChange(evt) {
      //   console.log('viewChange', evt);

      var currentScreenTarget = this.view.toScreen(this.dragStartCenter);

      if (this.screenTargetGeoemtry) {
        var dx = currentScreenTarget.x - this.screenTargetGeoemtry.x;
        var dy = currentScreenTarget.y - this.screenTargetGeoemtry.y;
        var translate = 'translate(' + dx + 'px,' + dy + 'px)';

        domStyle.set(this._displayDiv, 'transform', translate);
      }
    },
    moveStart(evt) {
      // console.log('moveStart', evt);
      domClass.add(this._displayDiv, 'moving');
      this.clearViewpointWatchers();

      this.calcTransform();
      this.dragStartCenter = this.view.center.clone();
      this.screenTargetGeoemtry = this.view.toScreen(this.dragStartCenter);

      this.screenTargetGeoemtry = {
        x: this.screenTargetGeoemtry.x - this.transformOffset.x,
        y: this.screenTargetGeoemtry.y - this.transformOffset.y
      };
    },

    moveEnd(evt) {
      // console.log('moveEnd', evt);
      this.clearViewpointWatchers();
      domClass.remove(this._displayDiv, 'moving');
      window.requestAnimationFrame(
        function () {
          if (this.visible) {
            this.refresh();
            domStyle.set(this._displayDiv, 'opacity', '1');
          }

        }.bind(this)
      );
    },

    clearViewpointWatchers: function () {
      while (this.viewpointWatchers.length) {
        var viewpointWatcher = this.viewpointWatchers.pop();
        if (viewpointWatcher) {
          viewpointWatcher.remove();
          viewpointWatcher = null;
        }
      }
    },

    _add: function (ele) {
      if (ele.node && ele.node.parentNode === this._displayDiv) {
        //todo
      } else {

        if (lang.isString(ele.dom)) {
          ele.dom = domConstruct.toDom(ele.dom);
        }

        ele.node = domConstruct.create(
          'div',
          {
            style: 'position:absolute;will-change:transform;top:0;left:0;pointer-events: auto;'
          },
          this._displayDiv
        );
        domConstruct.place(ele.dom, ele.node);
      }

      this.reposition(ele);
      this._repositionForDirection(ele);
    },

    bindEvents: function () {
      this.events = [];
      this.viewpointWatchers = [];

      this.events.push(
        this.view.watch(
          'stationary',
          function (stationary) {
            if (this.visible) {
              if (stationary) {
                domStyle.set(this._displayDiv, 'opacity', 1);
                this.refresh();
              } else {
                domStyle.set(this._displayDiv, 'opacity', 0);
              }
            }

          }.bind(this)
        ),
        this.view.watch(
          'scale',
          function (event) {
            console.log(event);
            if (event < 30000) {
              this.visible = false;
            }
            else {
              this.visible = true;
              this.refresh();
            }
          }.bind(this)
        )
      );

      this.view.watch('camera', function (evt) { }.bind(this));
    },

    updateClippingExtent(evt) {
      debugger;
    },
    setup(evt) {
      debugger;
    },

    initialize(evt) {
      console.log('initialize', this);
      this.divLayerClass = 'div-layer';
      this._displayDiv = domConstruct.create('div', {
        innerHTML: '',
        style:
          'width:100%;height:100%;position: absolute;top: 0px;right: 0px;left: 0px;bottom: 0px;',
        className: this.divLayerClass
      });


      var surface = this.view.root.children[1];
      domConstruct.place(this._displayDiv, surface);
      this.bindEvents();
      //   debugger;

      this.refresh();

      this.on('after-changes', function (evt) {
        debugger;
      });
    },

    doRefresh(evt) {
      console.log('doRefresh', evt);
    },

    calcTransform() {
      var matrix = new window.WebKitCSSMatrix(
        window.getComputedStyle(this._displayDiv).webkitTransform
      );
      var x = matrix.e;
      var y = matrix.f;

      this.transformOffset = {
        x: x,
        y: y
      };
      return this.transformOffset;
    },

    getDomBox(dom) {
      var styles = window.getComputedStyle(dom);

      // getComputedStyle() should return values already in pixels, so using parseInt()
      //   is not as much as a hack as it seems to be.

      return {
        minX: parseInt(styles.left),
        minY: parseInt(styles.top),
        maxX: parseInt(styles.left) + parseInt(styles.width),
        maxY: parseInt(styles.top) + parseInt(styles.height),
        height: parseFloat(styles.height),
        width: parseFloat(styles.width)
      };
    },

    refresh: function () {
      var rbush = new Rbush();
      this.calcTransform();
      // console.time('refresh-domLayer');
      // domConstruct.empty(this._displayDiv);
      this.layer.graphics.forEach(
        function (v) {
          if (this.isInExtent(v) || true) {
            var notAdded = true;

            if (v.box) {
              var newPosition = this.getPosition(v);

              var eleHeight = v.box.height;
              var eleWidth = v.box.width;
              v.box = {
                minX: parseInt(newPosition.left),
                minY: parseInt(newPosition.top),
                maxX: parseInt(newPosition.left) + parseInt(eleWidth),
                maxY: parseInt(newPosition.top) + parseInt(eleHeight),
                height: parseFloat(eleHeight),
                width: parseFloat(eleWidth)
              };
            } else {
              notAdded = false;
              this._add(v);
              var box = this.getDomBox(v.node);

              v.box = box;
              domStyle.set(v.node, 'height', v.box.height + 'px');
              domStyle.set(v.node, 'width', v.box.width + 'px');

              if (this.direction == "center") {
                domStyle.set(v.node, 'margin-left', '-' + v.box.width / 2 + 'px');
                domStyle.set(v.node, 'margin-top', '-' + (v.box.height + 30) + 'px');
              }
              else {
                domStyle.set(v.node, 'margin-left', '-' + v.box.width / 2 + 'px');
                domStyle.set(v.node, 'margin-bottom', '-' + (v.box.height + 15) + 'px');
              }

              if (v.grade) domStyle.set(v.node, 'z-index', 5 - Number(v.grade));
            }

            if (v.grade == "1" || v.grade == "2" || v.grade == "3") {
              rbush.insert(v.box);
              if (notAdded) {
                this._add(v);
                domStyle.set(v.node, 'height', v.box.height + 'px');
                domStyle.set(v.node, 'width', v.box.width + 'px');
                if (v.grade) domStyle.set(v.node, 'z-index', 5 - Number(v.grade));
              }
              return
            }

            var find = rbush.search(v.box);
            if (find.length) {
              domConstruct.destroy(v.node);
              v.node = null;
            } else {
              // if(box.minX&&box)
              rbush.insert(v.box);
              if (notAdded) {
                this._add(v);
                domStyle.set(v.node, 'height', v.box.height + 'px');
                domStyle.set(v.node, 'width', v.box.width + 'px');
                if (v.grade) domStyle.set(v.node, 'z-index', 5 - Number(v.grade));
              }

              // domStyle.set(v.node, 'display', 'block');
            }
            // if (v.node) {

            // }
          } else {
            if (v.node) {
              domConstruct.destroy(v.node);
              v.node = null;
            }
          }
        }.bind(this)
      );
    },

    isInExtent: function (ele) {
      return geometryEngine.contains(this.view.extent, ele.geometry);
    },
    // items: [],
    _repositionForDirection: function (ele) {
      if (ele.box) {
        var newSP = {};
        // var computedStyle = window.getComputedStyle(ele.node);
        var hieght = ele.box.height;
        var width = ele.box.width;

        switch (this.direction) {
          case 'bottom-mid': {
            domStyle.set(
              ele.node,
              'margin-left',
              -parseFloat(width / 2) + 'px'
            )
            domStyle.set(
              ele.node,
              'margin-bottom',
              -parseFloat(hieght + 15) + 'px'
            );
            break;
          }
          case 'center': {
            domStyle.set(
              ele.node,
              'margin-left',
              -parseFloat(width / 2) + 'px'
            );
            domStyle.set(
              ele.node,
              'margin-top',
              -parseFloat(hieght + 30) + 'px'
            );
            break;
          }
          default: {
            domStyle.set(ele.node, 'margin-top', '-' + hieght + 'px');
            break;
          }
        }

        return newSP;
      }
    },
    getPosition(ele) {
      if (this.view) {
        var sp = this.view.toScreen(ele.geometry);
        sp = {
          x: sp.x - this.transformOffset.x,
          y: sp.y - this.transformOffset.y
        };

        return {
          left: sp.x,
          top: sp.y
        };
      }
    },

    reposition: function (ele) {
      var position = this.getPosition(ele);
      if (position) {
        domStyle.set(ele.node, {
          top: position.top + 'px',
          left: position.left + 'px'
        });
      }
    },

    destroy() {
      domConstruct.destroy(this._displayDiv);

      arrayUtil.forEach(this.events, function (event) {
        if (event.remove) {
          event.remove();
        }
      });
    }
  });

  return clazz;
});
