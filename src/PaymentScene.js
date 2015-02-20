var GOLD   = 1;
var SILVER = 2;
var BRONZE = 3;
var USER = "U001";
var PaymentLayer = cc.Layer.extend({
	ctor:function () {
		this._super();

		var size = cc.winSize;
		
		var label = new ccui.Text();
		label.setString("Items disponibles:");
		label.setPosition(cc.p(size.width/2-110,size.height/2+75));
		label.setAnchorPoint(cc.p(0, 0));
		this.addChild(label);		

		var screenLayout = new ccui.Layout();
		screenLayout.setLayoutType(ccui.Layout.LINEAR_VERTICAL);
		screenLayout.setPositionType(ccui.Widget.POSITION_PERCENT);
		screenLayout.setPositionPercent(cc.p(0.5, 0.5));
		screenLayout.setAnchorPoint(cc.p(0.5, 0.5));
		screenLayout.setContentSize(220, 150);
		
		this.labels = [];
		var textures = [res.Gold, res.Silver, res.Bronze];
		for (var i = 1; i <= 3; ++i){
			var layout = new ccui.Layout();
			layout.setLayoutType(ccui.Layout.LINEAR_HORIZONTAL);

			layout.sizeType = ccui.Widget.SIZE_ABSOLUTE;
			layout.setContentSize(220, 50);

			layout.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
			if(i%2 == 0){
				layout.setBackGroundColor(cc.color.GRAY);
			}else{
				layout.setBackGroundColor(cc.color(128, 128, 128));
			}

			this.labels[i] = new ccui.Text();
			this.labels[i].setString(" x 0");
			this.labels[i].setContentSize(0,50);
			
			var imageView = new ccui.ImageView();
			imageView.loadTexture(textures[i-1]);
			
			var button = new ccui.Button();
			button.loadTextures(res.BuyNormal, res.BuySelected);
			button.setContentSize(0, 50);
			button.setTag(i);
			button.addTouchEventListener(this.buyClick, this);

			layout.addChild(imageView);
			layout.addChild(this.labels[i]);
			layout.addChild(button);
			screenLayout.addChild(layout);
		}

		this.addChild(screenLayout);
		
		var back = new ccui.Button();
		back.loadTextures(res.Back);
		back.setPosition(cc.p(50,50));
		back.addTouchEventListener(this.backClick, this);
		this.addChild(back);
		var self = this;
		window.updateItems = function(){
			self.loadItems();
		}
		this.loadItems();
		return true;
	},
	backClick: function(sender, type){
		switch (type){
		case ccui.Widget.TOUCH_ENDED:
			cc.director.popScene();
			break;
		}
	},
	buyClick: function (sender, type) {
		switch (type){
		case ccui.Widget.TOUCH_ENDED:
			var sku = "00"+sender.tag;
			if(!cc.sys.isNative){
				var x=window.open("php/payment.php?sku="+sku+"&user="+USER,'','width=770, height=820,menubar=no, resizable=no,scrollbars=no,status=no,titlebarno,toolbar=no');
			}else{
				//Aqui iria la solucion para plataformas nativas...
			}
			break;
		}
	},
	loadItems: function(){
		var self = this;
		if(!cc.sys.isNative){
			cc.loader.loadTxt("php/items.php?user="+USER, function(err, txt){
				items = JSON.parse(txt);
				self.labels[1].setString(" x " + items["001"]);
				self.labels[2].setString(" x " + items["002"]);
				self.labels[3].setString(" x " + items["003"]);
			});	
		}else{
			//Aqui iria la solucion para plataformas nativas...
		}
	}
});

var PaymentScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new PaymentLayer();
		this.addChild(layer);
	}
});

