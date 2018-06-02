var app = new PIXI.Application(800, 600);
document.body.appendChild(app.view);

app.stage.interactive = true;

var container = new PIXI.Container();
app.stage.addChild(container);

var padding = 100;
var bounds = new PIXI.Rectangle(
    -padding,
    -padding,
    app.screen.width + padding * 2,
    app.screen.height + padding * 2
);

var displacementSprite = PIXI.Sprite.fromImage('required/assets/displace.png');
var displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);

app.stage.addChild(displacementSprite);

container.filters = [displacementFilter];

displacementFilter.scale.x = 110;
displacementFilter.scale.y = 110;
displacementSprite.anchor.set(0.5);

bg.height = app.screen.height;

bg.alpha = 0.4;

container.addChild(bg);

app.stage



