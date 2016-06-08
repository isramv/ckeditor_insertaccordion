# CKEDITOR Template Generator Plugin.

## Helps you generate HTML markup for your Users.

### NoJS needed just define a new template and add the CSS you need.

Plugin was designed for Drupal 7 but you can use it as standalone CKEDITOR plugin.

## Using template to generate markup.

You just need to modify this template in order to generate your own markup.

the file is located: `plugins/insertaccordion/template/accordion.html`

```
<h1>Insert block title here:</h1>
<a class="bellows__expand_all">expand All</a>
<br>
<div class="bellows">
    {{#times number}}
    <div class="bellows__item">
        <div class="bellows__header" role="button" tabindex="0">
            <h3>Title: {{ this }}</h3>
            </div>
        <div class="bellows__content">
            <p>Content: {{ this }}<p>
        </div>
    </div>
    {{/times}}
</div>
```

## Custom CSS

For the editorial part you want to modify the CSS, so the user knows which area is modifying.

you can locate the file here: `plugins/insertaccordion/css/accordion.css`

## Roadmap.

- Create version for Drupal 8
- Remove dependency of jQuery.
- Create a branch only for the plugin.
- Declare new templates.

## Requirements.

- CKEditor 4.4 (May work on any 4+ version.)
- jQuery 2+
- HandlebarsJS (already provided)

## Why

You users need place holders for lists or accordions?
you want to provide the HTML markup but you want to keep them from messing it up?

If yes this plugin is for you.

just ask how many items meaning (li, div, or whatever they want).

**example:**
![alt tag](https://raw.githubusercontent.com/isramv/ckeditor_insertaccordion/wiki/images/prompt.png)

**result:** If 3 iterations are required.
![alt tag](https://raw.githubusercontent.com/isramv/ckeditor_insertaccordion/wiki/images/result.png)
