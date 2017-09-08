export default class line{
	constructor(time=0){
		this.time =time
	}
	initPosition(time){
		this.time = time
	}
	orbit(time){
		time = time+this.time
		let x,y
		if(time%400<200){
			x = time%600
			y = Math.sqrt(10000-Math.pow(x-100,2))
		}
		else{
			x = 400-time%400
			y = -Math.sqrt(10000-Math.pow(x-100,2))
		}
		return {x,y}
	}
}