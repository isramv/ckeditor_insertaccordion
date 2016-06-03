(function($) {
    // To load the script we need the editor path.
    // thats why it needs to be called from inside the instance.
    var markup = function(template, numberOfFields) {
        // Register handlebars helper for for loop.
        Handlebars.registerHelper('times', function(n, block) {
            var accum = '';
            for(var i = 0; i < n; ++i)
                accum += block.fn(i);
            return accum;
        });
        var hb_template = Handlebars.compile(template);
        return hb_template({ number: numberOfFields});
    };
    function loadTemplateEngine(editorPath) {
        CKEDITOR.scriptLoader.load( editorPath + 'js/handlebars-v4.0.5.js');
    }
    // Plugin definition.
    CKEDITOR.plugins.add( 'insertaccordion', {
        icons: 'insertaccordion',
        init: function( editor ) {
            // Define the pluginDirectory so is accesible from the dialogs.
            var pluginDirectory = this.path;
            editor.pluginDirectory = pluginDirectory;
            // Custom CSS for the editor.
            editor.addContentsCss( pluginDirectory + 'css/accordion.css');
            // Load HandleBars template engine.
            loadTemplateEngine(pluginDirectory); 

            editor.addCommand(
                'howManyAccordions',
                new CKEDITOR.dialogCommand('howManyAccordionsDialog')
            );
            editor.ui.addButton('insertaccordion', {
                label: 'How Many Accordions',
                command: 'howManyAccordions',
                toolbar: 'howmanyaccordions'
            });
        }
    });
    // We define the dialog in here:
    CKEDITOR.dialog.add('howManyAccordionsDialog', function (editor) {
        return {
            title: 'Number of items for the accordion.',
            minWidth: 400,
            minHeight: 200,
            contents: [{
                id: 'how-many',
                label: 'How many items do you want?',
                elements: [{
                    type: 'text',
                    id: 'how-many-textfield',
                    label: 'How many items your accordion will have?',
                    validate: function () {
                        CKEDITOR.dialog.validate.notEmpty( "Cannot be empty." );
                        CKEDITOR.dialog.validate.integer('Need to be an integer.');

                    }
                }]
            }],
            onOk: function() {
                var dialog = this;
                var howmany =  dialog.getValueOf('how-many', 'how-many-textfield');
                // Load the template with Ajax.
                var source = editor.pluginDirectory + 'template/accordion.html';
                $.get(source).done(function (data) {
                    var html = markup(data, howmany);
                    return editor.insertHtml(html);
                });
            }
        }
    });
})(jQuery);