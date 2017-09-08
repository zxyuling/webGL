export default class Orbit {
	constructor(x=0,y=0,angle=0){
		this.time = 0
		this.dX = x
		this.dY = y
		this.dAngele = angle
	}
	drawObject(orbit,obj,speed=1){
		const position = orbit.orbit(this.time+=speed) 
		obj.setPosition(coordinateTransform(position.x,position.y,this.dX,this.dY,this.dAngele))
		return this
	}
	getCoordinate(x,y){
		return coordinateTransform(x,y,this.dX,this.dY,this.dAngele)
	}
	drawCoordinateLine(ctx,color,range=10000){
		const xBegin = coordinateTransform(-range,0,this.dX,this.dY,this.dAngele)
		const xEnd = coordinateTransform(range,0,this.dX,this.dY,this.dAngele)
		const yBegin = coordinateTransform(0,range,this.dX,this.dY,this.dAngele)
		const yEnd = coordinateTransform(0,-range,this.dX,this.dY,this.dAngele)
		ctx.strokeStyle = color
		ctx.beginPath();
	    ctx.moveTo(xBegin.x,xBegin.y);
	    ctx.lineTo(xEnd.x,xEnd.y);
	    ctx.moveTo(yBegin.x,yBegin.y);
	    ctx.lineTo(yEnd.x,yEnd.y);
	    ctx.stroke();
	    return this
	}
}
const coordinateTransform = (x,y,dX,dY,dAngele) => {
	const length = Math.sqrt(x*x+y*y)
	const currentAngle = Math.atan2(y,x)
	const angel = ((currentAngle>=0?currentAngle:2*Math.PI+currentAngle)+dAngele)%(2*Math.PI)
	return {
		x:length*Math.cos(angel)+dX,
		y:angel<Math.PI?-length*Math.sin(angel)+dY:-length*Math.sin(angel)+dY
	}
}