Make to fast start wordpresss theme using webpack:

# Start WordPress Theme
Built using webpack:
SASS
JS
JQUERY
BOOTSTRAP
FONTAWESOME

## Development

- Install the site locally under http://start.local (you can change it in webpack.config.js lines 25 and 26).
- Clone repo under `wp-content/themes/theme-name`.
- Install dependencies. `npm install`.
- unzip and copy plugins.zip to wp plugins folder.
- copy node_modules/@fortawesome/fontawesome-free/webfonts `assets/` in theme folder
- Start watch mode using `npm start`.
- Build to production using `npm run build`.

Styles are under `/assets/styles`.
Scripts are under `/assets/scripts`.


## WebPack Build Outputs

- Images minified (over 10kb): `assets/images/` use `npm run build`.
- Sass compiled and css minified: `assets/css/`
- Js compiled and minified: `assets/js/`