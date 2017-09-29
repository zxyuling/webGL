export default class line{
	constructor(d=100,t=0){
		this.time = t
		this.d = d
	}
	initPosition(time){
		this.time = time
	}
	orbit(time){
		time = time+this.time
		let x,y
		if(time%(2*this.d)<this.d){
			x = time%(2*this.d)
			y = Math.sqrt(Math.pow((this.d/2),2)-Math.pow(x-this.d/2,2))
		}
		else{
			x = 2*this.d-time%(2*this.d)
			y = -Math.sqrt(Math.pow((this.d/2),2)-Math.pow(x-this.d/2,2))
		}
		return {x,y}
	}
}