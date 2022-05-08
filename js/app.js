
var Calculadora = {
	a           : '',
	b           : '',
	c           : '',
	d           : document.getElementById('display'),
	op          : '',
	btnDown     : function(e) {
		e.style.width     = (parseInt(e.offsetWidth) - 6)+'px';
		e.style.maxHeight = (parseInt(e.offsetHeight) - 6)+'px';
		if (e.alt=='mas') { e.style.marginLeft = '6px'; }
		else              { e.style.marginTop  = '6px'; e.style.marginLeft = e.style.marginRight = '3px'; }
	},
	btnUp : function(e) {
		e.style.width      = (parseInt(e.offsetWidth) + 6)+'px';
		e.style.maxHeight  = (parseInt(e.offsetHeight) + 6)+'px';
		e.style.marginLeft = e.style.marginRight = e.style.marginTop = e.style.marginBottom = '';
		this.exec(e);
	},
	init        : function()  { var btns = document.getElementsByClassName('tecla');
		for(i=0;i<btns.length;i++) {
			btns[i].addEventListener('mousedown',function() { Calculadora.btnDown(this); } );
			btns[i].addEventListener('mouseup',  function() { Calculadora.btnUp(this); } );
		}
	},
	exec        : function(e) {
		switch(e.alt) {
			case 'On'    : this.clean(); break;
			case 'signo' : this.sign(); break;
			case 'punto' : this.decimal(); break;
			case 'igual' : this.result(true); break;
			case 'por'   : case 'dividido' : case 'menos' : case 'mas' : this.operation(e.alt); break;
			case '0'     : case '1': case '2': case '3': case '4': case '5': case '6': case '7': case '8': case '9':  this.number(e.alt); break;
		}
	},
	clean       : function() { this.a = this.b = this.c = ''; this.d.innerHTML = 0; this.op = ''; },
	sign        : function() { 
		this.d.innerHTML = (this.d.innerHTML * -1); 
		if (this.c!='') { this.a = this.b = this.op = ''; this.c = 0; }
	},
	decimal     : function()  { if(this.d.innerHTML.indexOf('.')<0) { this.d.innerHTML = this.d.innerHTML + '.'; } },
	chkNFormat  : function(n) {
		var pos = 8;
		var num = parseFloat(n).toFixed(7);
		if (num<0.0000001 && num>-0.0000001) { return 0; }
		else {
			if(('' + num).indexOf('.')>=0) { pos++; }
			if (('' + num).length<=pos)     { return ('' + num); }
			else                           { return parseFloat(('' + num).substr(0,pos)); }
			
		}
	},
	result      : function(p)  {
		if(this.op.length>0) {
			if(this.a.length>0 && this.b.length==0 && this.d.innerHTML.length>0) {
				this.b = this.d.innerHTML;
				this.c = this.chkNFormat(eval('' + this.a + this.op + this.b));
				this.a = '' + this.c;
				if (p===true) { this.d.innerHTML = this.a; }
				else          { this.c = ''; }
			}
			else if(this.a.length>0 && this.b.length>0) {
				if (this.c==='') { this.b = this.d.innerHTML; }
				this.c = this.chkNFormat(eval('' + this.a + this.op + this.b));
				this.a = '' + this.c;
				if (p===true)  { this.d.innerHTML = this.a; }
				else           { this.c = ''; }
			}
		}
	},
	setOperator : function(o)  {
		switch(o) {
			case 'por'      : this.op = '*'; break;
			case 'dividido' : this.op = '/'; break;
			case 'menos'    : this.op = '-'; break;
			case 'mas'      : this.op = '+'; break;
			}
	},
	operation   : function(o)  {
		if (this.a.length==0)               { this.a = '' + this.d.innerHTML; this.d.innerHTML = ''; }
		else if (this.d.innerHTML.length>0) {
			if (this.c!='') { this.b = ''; this.c = ''; }
			else          { this.result(); this.b = '' + this.d.innerHTML; }
			this.d.innerHTML = '';
		}
		this.setOperator(o);
	},
	number      : function(n) {
		var pos = 8;
		if(this.d.innerHTML.indexOf('.')>=0) { pos++; }
		if (this.d.innerHTML.length<pos) { 
			if (this.d.innerHTML == '0') { this.d.innerHTML = n; }
			else                         { this.d.innerHTML = this.d.innerHTML + '' + n; }
		}
		
	}
}

Calculadora.init();