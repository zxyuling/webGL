import Point from './object/point'
import coordinateSystem from './coordinate-system'
import line  from './orbit/line'
import circle  from './orbit/circle'

const ctx = document.getElementById('can').getContext('2d')
const point = new Point(ctx,1,'#fff')
const cs = new coordinateSystem(600,300)
const cs2 = new coordinateSystem(600,300,Math.PI/3)
const getCoor=(NUM)=>{
	return Array(NUM).fill(0).map((item,index)=>{
		return {
			coor:new coordinateSystem(600,300,Math.PI*2/NUM*index),
			orbit:new line(index*1+1)
		}
	})
}

const lineArray = Array(80).fill(0).map((item,index)=>{
	return new line(index*5)
})
const coors = getCoor(20)
const render = () =>{
	ctx.clearRect(0,0,1200,600)
	let c = cs
	
	coors.forEach((item,index)=>{
		let c = item.coor
		lineArray.forEach((item,index)=>{
			c = c.drawObject(item,point,0.01)
		})
	})
	requestAnimationFrame(render)
}

render()