/*
* Author: Ruben A. Irigoyen P.
* Email: ruben.irigoyen@gmail.com
*/
var Calculadora = {
	a           : '',                                 // First operand
	b           : '',                                 // Second operand
	c           : '',                                 // Result 
	d           : document.getElementById('display'), // Display
	op          : '',                                 // Operation to execute
	btnDown     : function(e) {
		e.style.width     = (parseInt(e.offsetWidth) - 6)+'px';
		e.style.maxHeight = (parseInt(e.offsetHeight) - 6)+'px';
		if (e.alt=='mas') { e.style.marginLeft = '6px'; }
		else              { e.style.marginTop  = '6px'; e.style.marginLeft = e.style.marginRight = '3px'; }
	},
	btnUp       : function(e) {
		e.style.width      = (parseInt(e.offsetWidth) + 6)+'px';
		e.style.maxHeight  = (parseInt(e.offsetHeight) + 6)+'px';
		e.style.marginLeft = e.style.marginRight = e.style.marginTop = e.style.marginBottom = '';
		this.exec(e);
	},
	initialize  : function()  { var btns = document.getElementsByClassName('tecla');
		for(i=0;i<btns.length;i++) {
			btns[i].addEventListener('mousedown',function() { Calculadora.btnDown(this); } );
			btns[i].addEventListener('mouseup',  function() { Calculadora.btnUp(this); } );
		}
	},
	exec        : function(e) {
		switch(e.alt) {
			case 'On'    : this.clear(); break;
			case 'signo' : this.changeSign(); break;
			case 'punto' : this.inputPoint(); break;
			case 'igual' : this.calcResult(true); break;
			case 'por'   : case 'dividido' : case 'menos' : case 'mas' : this.operation(e.alt); break;
			case '0'     : case '1': case '2': case '3': case '4': case '5': case '6': case '7': case '8': case '9':  this.inputNumber(e.alt); break;
		}
	},
	clear       : function() { this.a = this.b = this.c = ''; this.d.innerHTML = 0; this.op = ''; },
	changeSign  : function() { 
		this.d.innerHTML = (this.d.innerHTML * -1); 
		if (this.c!='') { this.a = this.b = this.op = ''; this.c = 0; }
	},
	inputPoint  : function()  { if(this.d.innerHTML.indexOf('.')<0) { this.d.innerHTML = this.d.innerHTML + '.'; } },
	formatNumber  : function(n) {
		var pos = 8;
		var num = parseFloat(n).toFixed(7);
		var str = '' + num;
		if (num<0.0000001 && num>-0.0000001) { return 0; }
		else {
			if(str.indexOf('.')>=0&&str.indexOf('.')<8) { pos++; }
			
			if (str.length<=pos) {
				while(str[str.length-1] == '0') { str = str.substr(0,str.length-1); }
				return str; 
			}
			else { return parseFloat(('' + num).substr(0,pos)); }
			
		}
	},
	calcResult  : function(p)  {
		if(this.op.length>0) {
			if(this.a.length>0 && this.b.length==0 && this.d.innerHTML.length>0) {
				this.b = this.d.innerHTML;
				this.c = this.formatNumber(eval('' + this.a + this.op + this.b));
				this.a = '' + this.c;
				if (p===true) { this.d.innerHTML = this.a; }
				else          { this.c = ''; }
			}
			else if(this.a.length>0 && this.b.length>0) {
				if (this.c==='') { this.b = this.d.innerHTML; }
				this.c = this.formatNumber(eval('' + this.a + this.op + this.b));
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
	inputNumber : function(n) {
		var pos = 8;
		if(this.d.innerHTML.indexOf('.')>=0) { pos++; }
		if (this.d.innerHTML.length<pos) { 
			if (this.d.innerHTML == '0') { this.d.innerHTML = n; }
			else                         { this.d.innerHTML = this.d.innerHTML + '' + n; }
		}
		
	}
}

Calculadora.initialize();