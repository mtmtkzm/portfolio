var showTutorial = {
	init: function() {
		this.bindEvent();
	},
	bindEvent: function() {
		var self = this;
		if($.cookie('access') == undefined) {
			self.saveCookie();
			$('body').addClass('is-first');
			self.tutorial();
		} else {
			$('body').removeClass('is-first');
		}

		// デバック用 ヘッダークリックでcookie削除
		$('header').on('click', function() {
			self.removeCookie();
		})
	},
	saveCookie: function() {
		var period = 1; // 有効期限日数
		$.cookie('access', 'on', { expires: period });
	},
	removeCookie: function() {
		$.removeCookie('access');
	},
	tutorial: function() {
		console.log('チュートリアル');
		setTimeout(function(){
			// チュートリアル終わり？
		}, 2000);
	}
}
