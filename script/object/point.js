class Point {
	constructor(ctx,size,color){
		this.size = size
		this.color = color
		this.ctx = ctx
	}
	setPosition(x,y){
		this.ctx.fillStyle = this.color
		this.ctx.beginPath()
		this.ctx.arc(x,y,this.size,0,Math.PI*2,)
		this.ctx.closePath()
		this.ctx.fill()
	}
}
export default Point