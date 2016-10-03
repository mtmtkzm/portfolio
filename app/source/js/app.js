
var showTutorial = {
	init: function() {
		this.bindEvent();
	},
	bindEvent: function() {
		var self = this;
		var period = 1; // 有効期限日数

		if($.cookie('access') == undefined) {
			$.cookie('access', 'on', { expires: period });
			$('body').addClass('is-first');
			self.tutorial();
		} else {
			$('body').removeClass('is-first');
		}
	},
	removeCookie: function() {
		$.removeCookie('access');
	},
	tutorial: function() {
		setTimeout(function(){
			$('#tutorial').fadeOut().queue(function() {
				$('body').removeClass('is-first');
			});
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
		$(window).on('load scroll',function(){
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

// Slackへ送信
var sendLetter = {
	init: function () {
		this.bindEvent();
	},
	bindEvent: function () {
		var _self = this;
		$('#js-send').on('click', function () {
			_self.sendLetter();
		});
	},
	sendLetter: function () {
		var text = $('#js-letter').val();
		if(text != '' && window.confirm('この内容で送信してよろしいですか？\n----\n'+text+'\n----')){
			var url = 'https://slack.com/api/chat.postMessage';
			var data = {
				token: 'xoxp-5132180852-5132180854-86738660465-da28b27c12dccb9f5903804d0c79da4d',
				channel: '#letter_box',
				username: 'Postal worker',
				text: text
			};
			$.ajax({
				type: 'GET',
				url: url,
				data: data
			});
			$('#js-letter').val('送信されました。ありがとうございました。');
			alert('ありがとうございました！');
		}
	}
}


$(function(){
	showTutorial.init();
	accordionChronology.init();
	introductionHover.init();
	dispatchArrow.init();
	scrollFadein.init();
	sendLetter.init();
});
