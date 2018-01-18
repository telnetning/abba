/* Configure moment.js */
var language = window.navigator.userLanguage || window.navigator.language;
moment.locale(language);

/* Use Bootstrap table */
$('table').addClass('table table-hover').wrap('<div class="table-responsive">');

/* Remove align="right" */
$('td').removeAttr('align');

/* Move all rows in tbody */
$('table').prependIfNotExist('tbody', '<tbody/>').append($('table > tr'));

/* Move table header in thead */
$('table').prependIfNotExist('thead', '<thead/>').append($('table > tbody > tr').first());

/* Parse each row */
$('table > tbody > tr').each(function(index) {
	/* Trim each cells inner html */
	$('td', this).each(function() {
		$(this).html($.trim($(this).html()));
	});

	var name = $('a', this).first();
	var date = $('td', this).eq(1);
	var size = $('td', this).last();

	/* Beautify date */
	var m = moment(date.html(), "YYYY-MM-DD HH:mm");

	if (moment().diff(m, 'days', true) < 1) {
		date.html(m.fromNow().toLowerCase());

	} else if (moment().diff(m, 'weeks', true) < 1) {
		date.html(m.format('dddd LT').toLowerCase());

	} else {
		date.html(m.format('LLL').toLowerCase());
	}

	/* Remove "Parent Directory" row */
	if (index === 0 && size.html() === '-' && name.text() === 'Parent Directory') {
		$(this).remove();

	/* Set directory row style */
	} else if (name.text().substring(name.text().length - 1) === '/') {
		$(this).addClass('directory');
		size.html('');

	/* Set file row style */
	} else {
		$(this).addClass('file');
	}
});

/* Show main */
$('main').show();
