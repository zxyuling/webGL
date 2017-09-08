export default class Point {
	constructor(ctx,size,color){
		this.size = size
		this.color = color
		this.ctx = ctx
	}
	setPosition(position){
		this.ctx.fillStyle = this.color
		this.ctx.beginPath()
		this.ctx.arc(position.x,position.y,this.size,0,Math.PI*2,)
		this.ctx.closePath()
		this.ctx.fill()
	}
}