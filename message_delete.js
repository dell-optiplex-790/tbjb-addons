!function(){"use strict";var C={hash:function(t){t=t.utf8Encode();for(var e=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],r=[1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225],n=(t+=String.fromCharCode(128)).length/4+2,o=Math.ceil(n/16),u=new Array(o),f=0;f<o;f++){u[f]=new Array(16);for(var i=0;i<16;i++)u[f][i]=t.charCodeAt(64*f+4*i)<<24|t.charCodeAt(64*f+4*i+1)<<16|t.charCodeAt(64*f+4*i+2)<<8|t.charCodeAt(64*f+4*i+3)}u[o-1][14]=8*(t.length-1)/Math.pow(2,32),u[o-1][14]=Math.floor(u[o-1][14]),u[o-1][15]=8*(t.length-1)&4294967295;for(var c=new Array(64),f=0;f<o;f++){for(var d=0;d<16;d++)c[d]=u[f][d];for(d=16;d<64;d++)c[d]=C.σ1(c[d-2])+c[d-7]+C.σ0(c[d-15])+c[d-16]&4294967295;s=r[0],T=r[1],O=r[2],x=r[3],y=r[4],S=r[5],p=r[6],h=r[7];for(d=0;d<64;d++)var a=h+C.Σ1(y)+C.Ch(y,S,p)+e[d]+c[d],R=C.Σ0(s)+C.Maj(s,T,O),h=p,p=S,S=y,y=x+a&4294967295,x=O,O=T,T=s,s=a+R&4294967295;r[0]=r[0]+s&4294967295,r[1]=r[1]+T&4294967295,r[2]=r[2]+O&4294967295,r[3]=r[3]+x&4294967295,r[4]=r[4]+y&4294967295,r[5]=r[5]+S&4294967295,r[6]=r[6]+p&4294967295,r[7]=r[7]+h&4294967295}return C.toHexStr(r[0])+C.toHexStr(r[1])+C.toHexStr(r[2])+C.toHexStr(r[3])+C.toHexStr(r[4])+C.toHexStr(r[5])+C.toHexStr(r[6])+C.toHexStr(r[7])},ROTR:function(t,e){return e>>>t|e<<32-t},"Σ0":function(t){return C.ROTR(2,t)^C.ROTR(13,t)^C.ROTR(22,t)},"Σ1":function(t){return C.ROTR(6,t)^C.ROTR(11,t)^C.ROTR(25,t)},"σ0":function(t){return C.ROTR(7,t)^C.ROTR(18,t)^t>>>3},"σ1":function(t){return C.ROTR(17,t)^C.ROTR(19,t)^t>>>10},Ch:function(t,e,r){return t&e^~t&r},Maj:function(t,e,r){return t&e^t&r^e&r},toHexStr:function(t){for(var e="",r=7;0<=r;r--)e+=(t>>>4*r&15).toString(16);return e}};"undefined"==typeof String.prototype.utf8Encode&&(String.prototype.utf8Encode=function(){return unescape(encodeURIComponent(this))}),"undefined"==typeof String.prototype.utf8Decode&&(String.prototype.utf8Decode=function(){try{return decodeURIComponent(escape(this))}catch(t){return this}}),"undefined"!=typeof module&&module.exports&&(module.exports=C),"function"==typeof define&&define.amd&&define([],function(){return C}),"undefined"!=typeof window&&(window.Sha256=C)}();


addons.register('messageReciever', (data) => {
	msg = he.decode(data.msg)
	if(msg.startsWith('Action;')){
		action = msg.slice(7)
		try {
			try {
				j = JSON.parse(atob(action))
			} catch {
				j = JSON.parse(atob(action.slice(35)))
			}
			if(j.action==='delete') {
				$('#' + j.messageId).parent().parent().remove()
			}
			
		} catch(e){console.error(e)}
		data.msg='';
		return
	}
	msgId = Sha256.hash(JSON.stringify(data))
	data.msg = `<x id="${msgId}">${data.msg}</x>`
	if(data.nick === pseudo && data.color === color) {
		data.msg += `<a href="javascript:deleteMsg('${msgId}')" style='float:right'>Delete</a>`
	}
})

addons.register('messageSender', (data) => {
	if(he.decode(data.msg).startsWith('Action;')){data.msg=''}
})

window.deleteMsg = (id) => {
	socket.send(`Action;${btoa(`{"action":"delete","messageId":"${id}"}`)}`)
}