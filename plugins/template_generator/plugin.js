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
        CKEDITOR.scriptLoader.load( editorPath + 'js/templates.js');
    }
    // Plugin definition.
    CKEDITOR.plugins.add( 'template_generator', {
        icons: 'template_generator',
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
            editor.ui.addButton('template_generator', {
                label: 'How Many Accordions',
                command: 'howManyAccordions',
                toolbar: 'howmanyaccordions'
            });
        }
    });
    // We define the dialog in here:
    CKEDITOR.dialog.add('howManyAccordionsDialog', function (editor) {
        return {
            title: 'Number of items for the template.',
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
                        CKEDITOR.dialog.validate.notEmpty("Cannot be empty.");
                        CKEDITOR.dialog.validate.integer('Need to be an integer.');
                    }
                },
                // Second element here.
                {
                    id: 'select-template',
                    type: 'select',
                    label: 'Select template to generate',
                    // items: [['Basketball'], ['Baseball'], ['Hockey'], ['Football']],
                    items: templates,
                    'default': 'accordion.html'
                }] // End elements array.
            }],
            onOk: function() {
                var dialog = this;
                var howmany =  dialog.getValueOf('how-many', 'how-many-textfield');
                // set's default value to 1 if not provided.
                if(!howmany) {
                    howmany = 1;
                }
                var template_chossen = dialog.getValueOf('how-many', 'select-template');
                // Load the template with Ajax.
                var source = editor.pluginDirectory + 'template/' + template_chossen;
                
                $.get(source).done(function (data) {
                    var html = markup(data, howmany);
                    return editor.insertHtml(html);
                });
            }
        }
    });
})(jQuery);