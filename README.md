## Diwanee Media Gallery
v.0.1

Responsive media gallery with advanced banner loade

### Templating - Wrapper

```html
<div class="widget-media-gallery media-gallery">

  % SOCIAL SHARE BLOCK %

  % ITEM %
  % ITEM %
  ...
  % ITEM %
  
  
</div>
```

### Templating - Item

```html
<div class="item">
  <img class="item-image lazy-gallery" data-original="http://placehold.it/800x600" alt="" />
  <div class="thumb">
    <img class="lazy-gallery" data-original="http://placehold.it/200x100" alt="" />
  </div>
  <div class="caption">
    <h3>
      { TITLE }
    </h3>
    <p class="description">
      { CONTENT }
    </p>
  </div>
</div>
```

### Initialization

```html
$('.widget-media-gallery').mediaGallery({
  desktop: 1000,
  imgBasePath: "./images/media-gallery/",
  addTriggerCount: 3,
  addTriggerCountMob: 3,
});
```
##### Paremeters:
* desktop: Width transition point in pxsels. Width at which media gallery cross from the desktop to mobile.
* imgBasePath: Relative path to the folder with images.
* addTriggerCount: Count of trigger actions before banner is loaded on desktop
* addTriggerCountMob: Count of trigger actions before banner is loaded on mobile devices

### Banner implementation
```javascript
oxAsyncGallery = {
  asyncAdControlRender: function(id, unit) {
    var unid = "#" + id + "-" + unit;
    var rnd = Math.floor((Math.random() * 100) + 1);
    $(unid).html("<iframe width='300' height='250' framespacing='0' frameborder='no' scrolling='no' src='http://lorempixel.com/g/300/250?rnd=" + rnd + "'/></iframe>");
  }
};
```
This example pull simple image (lorempixel.com/g/300/250) instead of pulling from real banner server.


