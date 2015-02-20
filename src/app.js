
var AppLayer = cc.Layer.extend({
    result:null,
    ctor:function () {
        this._super();
        
        var size = cc.winSize;

        var menuItem1 = new cc.MenuItemImage(res.Facebook,null,null,this.facebookClick,this);
        var menuItem2 = new cc.MenuItemImage(res.PaymentWall,null,null,this.paymentWallClick,this);
        
        var menu = new cc.Menu(menuItem1, menuItem2);
        menu.alignItemsVerticallyWithPadding(50);
        this.addChild(menu);

        return true;
    },
    facebookClick: function(sender){
    	var scene = new FacebookScene();
    	cc.director.pushScene(new cc.TransitionFade(1.0, scene));
    },
    paymentWallClick: function(sender){
    	var scene = new PaymentScene();
    	cc.director.pushScene(new cc.TransitionFade(1.0, scene));
    }
});

var AppScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new AppLayer();
        this.addChild(layer);
    }
});

