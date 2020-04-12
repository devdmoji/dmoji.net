
$(function(){
	var $mcs = $('.mcs-cont');
	var $popup = $('.bg-popup');
	var $btn_open_popup = $mcs.find('.detail-popup');
	var $traffic = $mcs.find('.traffic');
	var $price = $mcs.find('.price');
	var $dgva_table = $popup.find('.dgva-table');
	var $sample_report_img = $popup.find('.sample-report-img');
	var $o_wrap_popup = $popup.find('.o-wrap-popup');
	var changePrice = function(val) {
		$price.find('> span').removeClass('on');
		$price.find('.' + val).addClass('on');
	};
	
	var getMPS = function() {
		return MOJI_PAGE_STATE;
	};

	var setMPS = function(cur, callback) {
		MOJI_PAGE_STATE = $.extend(MOJI_PAGE_STATE || {}, cur || {});
		var sessionCur = {};
		sessionCur[MOJI_PAGE_NAME] = MOJI_PAGE_STATE;
		setSessionState(sessionCur);

		$traffic
		.find('option[value="' + MOJI_PAGE_STATE.traffic + '"]')
		.prop('selected', true);

		cur.traffic && changePrice(cur.traffic);

		jcf.refreshAll();

		callback && callback();
	};

	var initMPS = function() {
		setMPS(MOJI_SESSION_PROPS[MOJI_PAGE_NAME] || {});
  };
  
  initMPS();

	$traffic.on('change', function(e) {
		var val = $(this).val();
		setMPS({ traffic: val });
	});

	$btn_open_popup.on('click', function(e) {
		$popup.removeClass('hide');
		$dgva_table.removeClass('hide');
		$sample_report_img.addClass('hide');
		$o_wrap_popup.removeClass('demo');
		e.preventDefault();
	});

	$mcs.find('.ex-demo').on('click', function(e) {
		$popup.removeClass('hide');
		$dgva_table.addClass('hide');
		$sample_report_img.removeClass('hide');
		$o_wrap_popup.addClass('demo');
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
	});
});