var screenPosition = new (function() {
	var curPos = {x: -1, y:-1};

	var updatePosition = function(e) {
		if (typeof e === 'undefined')
			return false;

		curPos.x = 0;
		curPos.y = pageYOffset || e.pageY;
		
		console.debug(curPos);

		try {
			localStorage.prevPosition = JSON.stringify(curPos);
		} catch(e) { console.error(e); }

		if (e.eventType === 'dblclick')
			e.preventDefault();
	};

	this.init = function() {
		console.log('SavePosition.js is activated!');

		if (!localStorage.prevPosition) {
			localStorage.prevPosition = '{x:0,y:0}';
			curPos = {x: 0, y: 0};
		} else {
			try {
				curPos = JSON.parse(localStorage.prevPosition);
			} catch(e) { curPos = {x: 0, y: 0}; }
		}

		document.addEventListener('dblclick', updatePosition.bind(this), true);
		document.addEventListener('wheel', updatePosition.bind(this), true);
		
		setTimeout(function(){
			scrollTo(curPos.x, curPos.y);
		}, 250);

		this.init = function(){};
	}.bind(this);

	return this;
})();

document.addEventListener('DOMContentLoaded', screenPosition.init(), true);