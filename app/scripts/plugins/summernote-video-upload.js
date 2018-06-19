'use strict';

(function (factory) {
  /* global define */
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node/CommonJS
    module.exports = factory(require('jquery'));
  } else {
    // Browser globals
    factory(window.jQuery);
  }
}(function ($) {
  $.extend($.summernote.plugins, {
    /**
     * @param {Object} context - context object has status of editor.
     */
    videoUpload: function (context) {
      var self = this;
      var ui = $.summernote.ui;

      var $editor = context.layoutInfo.editor;
      var options = context.options;
      var lang = options.langInfo;

      context.memo('button.videoUpload', function () {
        return ui.button({
          contents: ui.icon(options.icons.video),
          tooltip: lang.video.video,
          click: function() {
            self.show();
          }
        }).render();
      });

      this.initialize = function () {
        var $container = options.dialogsInBody ? $(document.body) : $editor;

        var body = '<div class="form-group note-group-select-from-files">' +
          '<label>Select from file</label>' +
          '<input class="note-video-input form-control" type="file" name="files" accept="video/*" />' +
          '</div>' +
          '<div class="form-group row-fluid">' +
          '<label>' + lang.video.url + ' <small class="text-muted">' + lang.video.providers + '</small></label>' +
          '<input class="note-video-url form-control span12" type="text" />' +
          '</div>';
        var footer = '<button href="#" class="btn btn-primary note-video-btn disabled" disabled>' + lang.video.insert + '</button>';

        this.$dialog = ui.dialog({
          title: lang.video.insert,
          fade: options.dialogsFade,
          body: body,
          footer: footer
        }).render().appendTo($container);
      };

      this.destroy = function () {
        ui.hideDialog(this.$dialog);
        this.$dialog.remove();
      };

      this.bindEnterKey = function ($input, $btn) {
        $input.on('keypress', function (event) {
          if (event.keyCode === key.code.ENTER) {
            $btn.trigger('click');
          }
        });
      };

      this.createVideoNode = function(url) {
        return context.invoke('videoDialog.createVideoNode', url);
      };

      this.show = function () {
        var text = context.invoke('editor.getSelectedText');
        context.invoke('editor.saveRange');
        this.showVideoDialog(text).then(function (data) {
          // [workaround] hide dialog before restore range for IE range focus
          ui.hideDialog(self.$dialog);
          context.invoke('editor.restoreRange');

          if (typeof data === 'string') {
            // build node
            var $node = self.createVideoNode(data);

            if ($node) {
              // insert video node
              context.invoke('editor.insertNode', $node);
            }
          } else {
            context.triggerEvent('image.upload', data);
          }
        }).fail(function () {
          context.invoke('editor.restoreRange');
        });
      };

      this.showVideoDialog = function (text) {
        return $.Deferred(function(deferred) {
          var $videoInput = self.$dialog.find('.note-video-input');
          var $videoUrl = self.$dialog.find('.note-video-url');
          var $videoBtn = self.$dialog.find('.note-video-btn');

          ui.onDialogShown(self.$dialog, function() {
            context.triggerEvent('dialog.shown');

            $videoInput.replaceWith($videoInput.clone()
              .on('change', function () {
                deferred.resolve(this.files || this.value);
              })
              .val('')
            );

            $videoUrl.val(text).on('input', function() {
              ui.toggleBtn($videoBtn, $videoUrl.val());
            }).trigger('focus');

            $videoBtn.click(function(event) {
              event.preventDefault();

              deferred.resolve($videoUrl.val());
            });

            self.bindEnterKey($videoUrl, $videoBtn);
          });

          ui.onDialogHidden(self.$dialog, function() {
            $videoInput.off('change');
            $videoUrl.off('input');
            $videoBtn.off('click');

            if (deferred.state() === 'pending') {
              deferred.reject();
            }
          });

          ui.showDialog(self.$dialog);
        });
      };
    }
  });
}));
