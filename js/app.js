
var Calculadora = {
	a       : 0,
	b       : 0,
	c       : 0,
	op      : '',
	d       : document.getElementById('display'),
	btnDown : function(e) { 
		e.style.width  = (parseInt(e.offsetWidth) - 6)+'px'; 
		e.style.maxHeight = (parseInt(e.offsetHeight) - 6)+'px'; 
		if (e.alt=='mas') { 
			e.style.marginLeft = '6px'; 
		}
		else {			
			e.style.marginTop = '6px';
			e.style.marginLeft = e.style.marginRight = '3px';
		}
		},
	btnUp   : function(e) { 
		e.style.width  = (parseInt(e.offsetWidth) + 6)+'px';		
		e.style.maxHeight = (parseInt(e.offsetHeight) + 6)+'px'; 
		e.style.marginLeft = e.style.marginRight = e.style.marginTop = e.style.marginBottom = '';
		this.exec(e);
		},
	exec    : function(e) { 
		switch(e.alt) {
			case 'On' : this.clean(); break;
			case 'por' : case 'dividido' : case 'menos' : case 'mas' : this.operation(e.alt); break;
			case '0': case '1': case '2': case '3': case '4': case '5': case '6': case '7': case '8': case '9':  this.number(e.alt); break;
			case 'signo' : this.sign(); break;
			case 'punto' : this.decimal(); break;
			case 'igual' : break;
			}
		},
	operation : function(o)  { 
		},
	sign : function()  { this.d.innerHTML = (this.d.innerHTML * -1); },
	number : function(n)  { 
		var pos = 8;
		if(this.d.innerHTML.indexOf('.')>=0) { pos++; }
		if (this.d.innerHTML.length<pos) { this.d.innerHTML = parseFloat(this.d.innerHTML + '' + n); }
		},
	decimal : function()  { 
		if(this.d.innerHTML.indexOf('.')<0) { this.d.innerHTML = this.d.innerHTML + '.'; }
		},
	init    : function()  { 
		var btns = document.getElementsByClassName('tecla');
		for(i=0;i<btns.length;i++) { 
			btns[i].addEventListener('mousedown',function() { 
				Calculadora.btnDown(this); 
				} ); 
			btns[i].addEventListener('mouseup',function() { 
				Calculadora.btnUp(this); 
				} ); 
			}	 
		},
	clean : function() { this.a = this.b = this.c = this.d.innerHTML = 0; this.op = ''; }
}

Calculadora.init();