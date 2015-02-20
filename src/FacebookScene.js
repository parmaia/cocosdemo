var FacebookLayer = cc.Layer.extend({
	ctor:function () {
		this._super();
		window.facebook = plugin.FacebookAgent.getInstance();
		var size = cc.winSize;
		this.meLabel = new cc.LabelTTF('', 'Helvetica', 26);
		this.meLabel.setPosition(cc.p(100,size.height-100));
		this.meLabel.setAnchorPoint(cc.p(0, 0));
		this.addChild(this.meLabel);		
		if (facebook.isLoggedIn()) {
			this.getMe();
			this.getFriendList();
		}else{
			cc.log("Not logged");
			var menuItemLogin = new cc.MenuItemImage(res.FBLoginNormal, res.FBLoginSelected, this.loginClick, this);
			this.menu = new cc.Menu(menuItemLogin);
			this.menu.setPosition(cc.p(size.width/2, size.height/2));
			this.menu.setAnchorPoint(cc.p(0.5, 0.5));
			this.addChild(this.menu);			
		}
		this.statusLabel = new cc.LabelTTF('', 'Helvetica', 20);
		this.setAnchorPoint(cc.p(0.5, 0.5));
		this.statusLabel.setPosition(cc.p(size.width/2, 10));
		this.addChild(this.statusLabel);
		
		var back = new ccui.Button();
		back.loadTextures(res.Back);
		back.setPosition(cc.p(50,50));
		back.addTouchEventListener(this.backClick, this);
		this.addChild(back);
		
		return true;
	},
	backClick: function(sender, type){
		switch (type){
		case ccui.Widget.TOUCH_ENDED:
			cc.director.popScene();
			break;
		}
	},
	loginClick: function (sender) {
		var self = this;
		if (facebook.isLoggedIn()) {
			self.removeChild(self.menu);
			self.getMe();
			self.getFriendList();
		}
		else {
			facebook.login(["user_friends"],function (type, response) {
				if (type == plugin.FacebookAgent.CODE_SUCCEED) {
					self.removeChild(self.menu);
					self.getMe();
					self.getFriendList();
					self.statusLabel.setString("");
				}else{
					self.statusLabel.setString("Error type " + type + " msg is " + JSON.stringify(response));	
				}				
			});
		}
	},
	getMe: function(){
		var self = this;
		facebook.api("/me", plugin.FacebookAgent.HttpMethod.GET, function (type, response) {
			if (type == plugin.FacebookAgent.CODE_SUCCEED) {
				self.meLabel.setString("Hola, "+response.name);
				self.statusLabel.setString("");
			} else {
				self.statusLabel.setString("Error type " + type + " msg is " + JSON.stringify(response));
			}
		});
	},
	getFriendList: function(){
		var self = this;
		facebook.api("/me/invitable_friends?fields=name,picture.width(50)", plugin.FacebookAgent.HttpMethod.GET, function (type, response) {
			if (type == plugin.FacebookAgent.CODE_SUCCEED) {
				cc.log("Agregando lista");
				var label = new ccui.Text();
				label.setString("Amigos: ");
				label.setPosition(cc.p((cc.winSize.width / 2)-150, (cc.winSize.height / 2)+85));
				self.addChild(label);
				var listView = new ccui.ListView();
				listView.setDirection(ccui.ScrollView.DIR_VERTICAL);
				listView.setTouchEnabled(true);
				listView.setBounceEnabled(true);
				listView.setBackGroundImage(res.ListBackground);
				listView.setContentSize(cc.size(300, 250));
				
				listView.setAnchorPoint(cc.p(0.5, 0.5));
				listView.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 2-50));
				self.addChild(listView);
				cc.log("agregando datos");
				var data = response.data;				
				for(var i = 0; i < data.length; i++) {
					var text = new ccui.Text();
					text.setString(data[i].name);
					text.setColor(cc.color.BLACK);
					text.setContentSize(50, 250);
					text.setFontSize(14);

					var layout = new ccui.Layout();
					layout.setLayoutType(ccui.Layout.LINEAR_HORIZONTAL);
					layout.sizeType = ccui.Widget.SIZE_ABSOLUTE;
					layout.setContentSize(300, 20);
					layout.addChild(text);
					
					listView.pushBackCustomItem(layout);
				}
				cc.log("Terminado");
			} else {
				self.statusLabel.setString("Error type " + type + " msg is " + JSON.stringify(response));
			}
		});

	}
});

var FacebookScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new FacebookLayer();
		this.addChild(layer);
	}
});

