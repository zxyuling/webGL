export default (t,tRange=200,xRange=10000,yRange=10000)=>{
	let x,y
	if(t%tRange<100)
		y=x=Math.sqrt(xRange-Math.pow(t%tRange,2))
	else
		y=x=-Math.sqrt(xRange-Math.pow(t%tRange-100,2))
	return {x,y}
}