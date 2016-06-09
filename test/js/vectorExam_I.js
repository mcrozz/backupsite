var navigatorVec = new (function() {
	var path = './exam/vector_I/';
	var images = {
		'0' : ['_2', '_3', '_4', '_5'],
		'2' : ['_1', '_2', '_3', '_4', '_5'],
		'2.2': ['_1', '_2', '_3', '_4'],
		'4' : ['_1', '_2', '_3', '_4', '_5'],
		'6' : ['_1', '_2', '_3', '_4'],
		'6.6': ['_1', '_2'],
		'7' : ['_4'],
		'8' : ['_1', '_2', '_3', '_4', '_5', '_6'],
		'8.8': ['_1', '_2'],
		'9' : ['_1', '_2', '_3', '_4', '_5', '_6'],
		'9.9': ['_1'],
		'10': ['_1', '_2', '_3', '_4', '_5', '_6'],
		'10.10': ['_1', '_2'],
		'11': ['_1', '_2', '_3', '_4', '_5'],
		'11.11': ['_1'],
		'12': ['_1', '_2', '_3', '_4', '_5', '_6'],
		'13': ['_1', '_2', '_3', '_4', '_5', '_6', '_7', '_8', '_9'],
		'15.15' : ['_1', '_2', '_3'],
		'16': ['_1', '_3', '_4', '_7', '_8', '_10', '_11', '_12'],
		'20': ['_1', '_2'],
		'21': ['_1', '_2', '_3', '_4', '_5', '_6', '_7'],
		'21.21': ['_1'],
		'23': ['_1', '_2', '_3', '_4', '_5', '_6'],
		'24' : ['_1', '_2', '_3', '_4', '_5'],
		's' : ['_1', '_2', '_3'],
		'p2' : ['_'],
		'p6' : ['_'],
		'p7' : ['_'],
		'p8' : ['_'],
		'p12' : ['_'],
		'p13' : ['_'],
		'p15' : ['_'],
		'p16' : ['_'],
		'p20' : ['_'],
		'p22' : ['_'],
		'p24' : ['_']
	};
	var extension = '.jpg';

	// Current status
	var current = {
		id: '',
		page: 0,
		max: 0
	};

	// Next page in current ticket
	function nextPage() {
		if (typeof images[current.id][current.page+1] == 'undefined')
			return;

		current.page++;
		if (current.max == 0)
			current.max = images[current.id].length;

		$('#viewer>div>a').html((current.page+1)+'/'+current.max);
		$('img')[0].src = path+current.id+images[current.id][current.page]+extension;
	};
	// Previous page in current ticket
	function prevPage() {
		if (typeof images[current.id][current.page-1] == 'undefined')
			return;

		current.page--;
		if (current.max == 0)
			current.max = images[current.id].length;

		$('#viewer>div>a').html((current.page+1)+'/'+current.max);
		$('img')[0].src = path+current.id+images[current.id][current.page]+extension;
	};

	// Close viewer
	function close() {
		$('#selector').show();
		$('#viewer').hide();

		current.id = '';
		current.page = 0;

		$('img')[0].src = '';
		location.hash = '';
		$('#viewer>div>a').html('0/0');
	}; 
	// Open viewer
	function open(e) {
		$('#selector').hide();
		$('#viewer').show();

		current.id = e.target.href.split('=')[1];
		current.page = 0;
		current.max = images[current.id].length;

		$('#viewer>div>a').html((current.page+1)+'/'+current.max);
		$('img')[0].src = path+current.id+images[current.id][current.page]+extension;
	};

	// Keyboard keys handler
	function keyboard(e) {
		switch (e.key) {
			case 'ArrowLeft':
				prevPage(); break;
			case 'ArrowRight':
				nextPage(); break;
			case 'Escape':
				close(); break;
		}
	};

	this.init = function() {
		// Register handlers
		$('#selector>a').on('click', open.bind(this));
		$('button[id=prev]').on('click', prevPage.bind(this));
		$('button[id=next]').on('click', nextPage.bind(this));
		$('button[id=close]').on('click', close.bind(this));

		// Keyboard support
		$(document).on('keyup', keyboard.bind(this));

		// Using this function only once
		this.init = function(){};
		
		console.log('vectorExam_I.js is activated!');

		// Restore last viewed ticket (only ticket)
		try {
			if (location.hash != '') {
				if ($('a[href=\"'+location.hash+'\"]') != null)
					$('a[href=\"'+location.hash+'\"]').click();
			}
		} catch(e) { console.error(e); }
	}.bind(this);

	return this;
})();

$(navigatorVec.init);