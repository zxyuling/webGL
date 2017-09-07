import Point from './object/point.js'

class Orbit {
	constructor(fn,speed){
		this.fn = fn
		this.speed = speed
		this.time = 0
	}
	draw(Obj){
		const position = this.fn(this.time+=this.speed) 
		Obj.setPosition(position.x,position.y)
	}
}

const line = (t) => {
	let x,y
	if(t%200<100)
		y=x = t%200
	else
		y=x = 200-t%200
	return {x,y}
}
const ctx = document.getElementById('can').getContext('2d')
const point = new Point(ctx,10,'#fff')
const or = new Orbit(line,1)

const render = () =>{
	ctx.clearRect(0,0,1200,600)
	or.draw(point)	
	requestAnimationFrame(render)
}

render()