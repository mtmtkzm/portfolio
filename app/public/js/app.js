console.log('aaaaaaiiiiiii');
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

// 自己紹介文マウスオーバー
var introductionHover = {
	init: function(){
		this.bindEvent();
	},
	bindEvent: function(){
		var self = this;

		$('a.js-hover-united').hover(
			function(){
				self.showBg('united');
			},
			function(){
				self.hideBg('united');
			}
		);
		$('a.js-hover-lig').hover(
			function(){
				self.showBg('lig');
			},
			function(){
				self.hideBg('lig');
			}
		)
	},
	showBg: function(logo){
		$('img.js-hover-'+logo).animate({opacity:'show'},{duration:300, easing:'swing'});
	},
	hideBg: function(logo){
		$('img.js-hover-'+logo).animate({opacity:'hide'},{duration:300, easing:'swing'});
	}
}

// 年表toggle
var accordionChronology = {
	init: function(){
		this.bindEvent();
	},
	bindEvent: function(){
		var self = this;
		$('.chronology-year, .chronology-ttl').on('click',function(){
			self.open($(this));
		});
	},
	open: function($target){
		$target.nextAll('.chronology-detail').slideToggle();
		// this.showBg($target);
	},
	showBg: function($target) {
		// $target.find('#js-chronology-bg').animate({opacity:'hide'},{duration:400});
		// $target.find('#js-chronology-bg').css('opacity','1');
	}
};

// ユーザーガイド
var showUserGuide = {
	init: function(){
		this.bindEvent();
	},
	bindEvent: function(){
		var self = this;
		var scrollPos;
		var footerPos;

		$(window).scroll(function(){
			self.scrollPos = $(window).scrollTop();
			self.footerPos = $('footer').offset().top;
			if(self.scrollPos+$(window).height() > $('footer').offset().top){
				self.show();
			} else {
				self.hide();
			}
		});
	},
	show: function(){
		$('#js-userguide-pc').animate({opacity:'show'},{duration:400});
		$('#js-userguide-sp').animate({opacity:'show'},{duration:400});
	},
	hide: function(){
		$('#js-userguide-pc').animate({opacity:'hide'},{duration:400});
		$('#js-userguide-sp').animate({opacity:'hide'},{duration:400});
	},
	swipe: function(){
		$('#js-userguide-sp').animate({
			'left': '80%'
		},{
			'duration': 1500,
			'easing': 'ease',
			'complete': function(){
				alert('終わりました');
			}
		});
	}
};

// 矢印キーで左右の移動
var dispatchArrow = {
	init: function(){
		this.bindEvent();
	},
	bindEvent: function(){
		var self = this;
		$(window).keyup(function(e){
			if(e.keyCode==39) {
				self.match('next');
			} else if(e.keyCode==37) {
				self.match('prev');
			}
		});
	},
	match: function(dir){
		$('.swiper-button-'+dir).trigger('click');
	}
}

// スクロールでフェードイン
var scrollFadein = {
	init: function(){
		this.bindEvent();
	},
	bindEvent: function(){
		var self = this;
		$(window).scroll(function(){
			var windowHeight = $(window).height();
			var topWindow = $(window).scrollTop();
			$('.js-fadein').each(function(){
				var targetPosition = $(this).offset().top;
				var target = $(this);
				self.fade(target,topWindow,targetPosition,windowHeight);
			});
		});
		$(window).keyup(function(e){
			if(e.keyCode==39) {
				// self.hideWorks();
			}
		});
	},
	fade: function($target,topWindow,targetPosition,windowHeight){
		if(topWindow > targetPosition - windowHeight + 100){
			$target.addClass("js-fadeInUp");
		}
	},
	hideWorks: function(){
		$('.js-fadein').removeClass('js-fadeInUp');
		$('.js-fadein').css('visibility','hidden');
	}
}

$(function(){
	showTutorial.init();
	accordionChronology.init();
	introductionHover.init();
	showUserGuide.init();
	dispatchArrow.init();
	scrollFadein.init();
});