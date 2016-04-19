
jQuery(function($){
	$('#ww span').text(' ' + $(window).width() + ' px');

	var foo$ = $('.foo');
	var foo_length = foo$.length;
	var hidden_li_height = 20;
	//非表示になっている ul 要素の上下のパディング
	var hidden_ul_padding = parseInt($('.hidden').css('padding-top'), 10) + parseInt($('.hidden').css('padding-bottom'), 10);
	
	//n は横一列に表示する要素の個数、that はクリックされた p 要素自身（$(this)）
	function expand_height(n, that) {
		//クリックされた p 要素の次の（非表示になっている）ul 要素
		var hidden_list$ = that.next('.hidden');
		//非表示になっている ul 要素の上位（親）の div 要素（クラス.foo）
		var parent_div$ = hidden_list$.closest('.foo');
		//この div 要素（クラス.foo）のインデックス
		var index = foo$.index(parent_div$);
		//この div 要素（クラス.foo）が属する行（横の列）のインデックス
		var row = Math.floor(index / n);	
		//非表示になっている ul 要素に含まれる li 要素の数（初期化）
		var max_hidden_li_count = 0;
		//この div 要素（クラス.foo）が属する行（横の列）の中の div 要素の高さの最大値（初期化）
		var max_div_height = 0;
		//高さを変更（増加）したかどうかのフラグ
		var is_expanded = false;
		//クリックされた要素が属する行（横の列）にある要素を比較
		for(var i = 0; i < n; i++) {
			//非表示になっている ul 要素含まれる li 要素の最大値を取得
			if(foo$.eq(row * n + i).find('.hidden li').length > max_hidden_li_count) {
				max_hidden_li_count = foo$.eq(row * n + i).find('.hidden li').length;
			}
			//div 要素（クラス.foo）の高さの最大値を取得
			if(foo$.eq(row * n + i).height() > max_div_height) {
				max_div_height = foo$.eq(row * n +i).outerHeight(true);
			}
			//div 要素（クラス.foo）の data() の'expanded'が'true'ならフラグ「is_expanded」をtrue に
			if(foo$.eq(row * n + i).data('expanded') == 'true') is_expanded = true;
		}	
		
		//フラグ「is_expanded」 が true でなければ高さを li 要素の最大値分増加（＋パディング）		
		if(!is_expanded) {		
			for(var i = 0; i < n; i++) {
				foo$.eq(row * n + i).stop().animate({
					height: (max_div_height + max_hidden_li_count * hidden_li_height + hidden_ul_padding) + 'px'
				}, 400);					
			}
		}
		//クリックされた p 要素の上位の div 要素（クラス.foo）の data() の'expanded'を'true'に
		foo$.eq(index).data('expanded', 'true');
	}
	
	function reset_height(n, that) {
		var hidden_list$ = that.next('.hidden');
		var parent_div$ = hidden_list$.closest('.foo');
		var index = foo$.index(parent_div$);
		var row = Math.floor(index / n);			
		var max_hidden_li_count = 0;
		var max_div_height = 0;
		
		//クリックされた要素が属する行（横の列）にある要素を比較
		for(var i = 0; i < n; i++) {
			//非表示になっている ul 要素含まれる li 要素の最大値を取得
			if(foo$.eq(row * n + i).find('.hidden li').length > max_hidden_li_count) {
				max_hidden_li_count = foo$.eq(row * n + i).find('.hidden li').length;
			}
			//div 要素（クラス.foo）の高さの最大値を取得
			if(foo$.eq(row * n + i).height() > max_div_height) {
				max_div_height = foo$.eq(row * n +i).outerHeight(true);
			}					
		}
		
		//クリックされた要素が属する行（横の列）のそれぞれのdiv 要素（クラス.foo）のdata() を調査
		var expanded_count = 0;
		for(var i = 0; i < n; i++) {
			//'expanded' が 'true' のものがあればカウント
			if(foo$.eq(row * n + i).data('expanded') == 'true') expanded_count++;
		}
		
		//'expanded' が 'true' のものが１つだけの場合のみ、高さを li 要素の最大値分（＋パディング）減じる
		if(expanded_count == 1) {				
			for(var i = 0; i < n; i++) {
				foo$.eq(row * n + i).stop().animate({
					height: (max_div_height - max_hidden_li_count * hidden_li_height - hidden_ul_padding * 2 + 4) + 'px'
				}, 400);
			}
		}	
		//クリックされた p 要素の上位の div 要素（クラス.foo）の data() の'expanded'を'false'に
		foo$.eq(index).data('expanded', 'false');
	}
	
	//p 要素（.show_list）のクリックイベント
	$('p.show_list').click(function(){
		//ブラウザの幅を検出し、その幅により何列で表示するかを判定
		var window_w = $(window).width();
		//クリックされた p 要素の次の ul 要素が非表示の場合は「expand_height()」を実行
		if($(this).next('.hidden').css('display') == 'none') {
			if(window_w > 960) {
				expand_height(3, $(this));
			}else if(window_w > 640) {
				expand_height(2, $(this));
			}	
		// ul 要素が表示されている場合は「reset_height()」を実行			
		}else{
			if(window_w > 960) {
				reset_height(3, $(this));
			}else if(window_w > 640) {
				reset_height(2, $(this));
			}				
		}
		// ul 要素の表示・非表示の切り替え
		$(this).next('ul.hidden').slideToggle();		
	});
	
	//div 要素（クラス.foo）の元の高さを取得して data('height') に格納
	$('.foo').each(function(index, element) {
        $(this).data('height', $(this).height());
    });
	
	function set_height(n) {
		var foo$ = $('.foo');
		var foo_length = foo$.length;
		for(var i = 0 ; i < Math.ceil(foo_length / n) ; i++) {
			var maxHeight = 0;
			for(var j = 0; j < n; j++){
				//もし'expanded' が 'true' なら現在の高さ（表示された ul 要素の高さを含む）を比較
				if (foo$.eq(i * n + j).data('expanded') == 'true') {
					if (foo$.eq(i * n + j).height() > maxHeight) { 
						maxHeight = foo$.eq(i * n + j).height(); 
					}
				//そうでなければ初期状態の高さを比較
				}else{
					if (foo$.eq(i * n + j).data('height') > maxHeight) { 
						maxHeight = foo$.eq(i * n + j).data('height'); 
					}
				}			
			}
			for(var k = 0; k < n; k++){
				foo$.eq(i * n + k).height(maxHeight); 
			}
		}		
	}
	
	var ww = $(window).width();
	
	if(ww >= 954) {
		set_height(3);
		//「Row : 0 - 0」を表示
		display_index(3);
	}else if(ww >= 640) {
		set_height(2);
		display_index(2);
	}
	
	var timer = false;
	$(window).resize(function(){  
		$('#ww span').text(' ' + $(window).width() + ' px');
		var window_width = $(window).width();
		
		if (timer !== false) {
			clearTimeout(timer);
		}
		timer = setTimeout(function() {
			if(window_width >= 954) {
				set_height(3);
				display_index(3);
			}else if(window_width >= 640) {
				set_height(2);
				display_index(2);
			}
		}, 200);	
	}); 
	
	function display_index(n) {
		var count = 0;
		foo$.each(function(index, element) {
			var row = Math.floor(index / n);
			$(this).find('p.row span.row_index').text(row);
			$(this).find('p.row span.index').text(count);
			count = (count + 1) % n;			
		});
	}

	
});
