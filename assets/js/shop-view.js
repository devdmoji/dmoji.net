
$(function(){
	var price_table = {
		'to-10k': 100000,
		'from-10k-to-100k': 300000,
		'from-100k-to-500k': 500000,
		'from-500k': 9999999
	};
	var option_price_table = {
		'to-10k': 30000,
		'from-10k-to-100k': 100000,
		'from-100k-to-500k': 200000,
		'from-500k': 1
	};

	var $mcs = $('.mcs-cont');
	var $popup = $('.bg-popup');
	var $btn_open_popup = $mcs.find('.detail-popup');
	var $traffic = $mcs.find('.traffic');
	var $option = $mcs.find('.option');
	var $opt_inputs = $option.find('input');
	var $opts_price = $option.find('.price-opts');
	var $total_price = $mcs.find('.total-price');

	var change_opt_price = function(val) {
		$opts_price.find('> span').removeClass('on');
		$opts_price.find('.' + val).addClass('on');
		$opt_inputs.attr('value', option_price_table[val]);
	};
	
	var getMPS = function() {
		return MOJI_PAGE_STATE;
	};

	var setMPS = function(cur, callback) {
		MOJI_PAGE_STATE = $.extend(MOJI_PAGE_STATE || {}, cur || {});
		var sessionCur = {};
		sessionCur[MOJI_PAGE_NAME] = MOJI_PAGE_STATE;
		setSessionState(sessionCur);

		change_opt_price(MOJI_PAGE_STATE.traffic);

		var base_price = price_table[MOJI_PAGE_STATE.traffic];
		if(base_price) {
			$opt_inputs.removeAttr('disabled');
			$traffic
			.find('option[value="' + MOJI_PAGE_STATE.traffic + '"]')
			.prop('selected', true);

			var opt_price = 0;

			$opt_inputs.each(function(i) {
				var $this = $(this);
				if(cur.option) this.checked = cur.option[i];
				if($this.is(':checked')) opt_price += parseInt($this.val());
			});

			var total_price = base_price + opt_price;
			total_price = total_price >= 9999999 ? '별도 협의' : '' + total_price

			if(total_price !== '별도 협의') {
				var formated = [];
				for(var i = 0, l = total_price.length; i < l; i++) {
					if (i % 3 === 0 && i !== 0) {
						formated.unshift(',');
					}
					formated.unshift(total_price[l - i - 1]);
				}
				total_price = '₩ ' + formated.join('') + ' / 매월';
			}

			$total_price.text(total_price);
		} else {
			$opt_inputs.attr('disabled', 'disabled');
		}

		jcf.refreshAll();

		callback && callback();
	};

	var initMPS = function() {
		setMPS(MOJI_SESSION_PROPS[MOJI_PAGE_NAME] || {});
    };
  
    initMPS();

	$opt_inputs.on('change', function(e) {
		var result = [];
		$opt_inputs.each(function(i) {
			result.push(this.checked);
		});
		setMPS({ option: result });
	});

	$traffic.on('change', function(e) {
		var val = $(this).val();
		setMPS({ traffic: val });
	});

	$btn_open_popup.on('click', function (e){
		$popup.removeClass('hide');
		e.preventDefault();
	});

	$popup.on('click', function(e) {
		var cond1 = $(e.target).hasClass('o-popup-close');
		var cond2 = $(e.target).hasClass('bg-popup');
		if (cond1 || cond2) {
			$popup.addClass('hide');			
		}
		e.preventDefault();
	});

	$(document).on('keyup', function(e) {
		if (e.keyCode === 27) {
			$popup.addClass('hide');
		}
	})
});