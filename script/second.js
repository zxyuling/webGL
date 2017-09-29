//引入three.js我这里采用的是npm包的require,你也可以使用标签的方式引入
//不管怎么样只要保证全局变量里面有THREE这个对象就行
require('./second.less')
import objloader from './objloader.js'
const THREE= window.THREE=require('three')
console.log(objloader)
THREE.OBJLoader = objloader();
const scene = new THREE.Scene();//创建一个场景
//创建一个相机，这个相机属于透视投影相机，里面的参数你就先别管了
const camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z=150
//创建一个渲染器,并设置大小，然后把这个渲染器加入到dom中
const renderer = new THREE.WebGLRenderer({ alpha:true,antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
//创建一个光源，这光源是属于环境光，先别管啥叫环境光
const light = new THREE.AmbientLight( '#fff',0.3);
//创建一种材质，透明，有颜色，显示线框
const lineMat = new THREE.MeshLambertMaterial({
    color: new THREE.Color("rgb(106,153,153)"),
    transparent: 1,
    opacity: 0.2,
    wireframe:true
});
const cubeMat = new THREE.MeshPhongMaterial({
    color: new THREE.Color("rgb(106,153,153)"),
    transparent: 1,
    opacity: 0.2,
    shininess:5,
    specular:new THREE.Color("rgb(153,153,153)"),
    emissive:new THREE.Color("rgb(6,53,53)"),
    shading: THREE.FlatShading 
});

const star = new THREE.Object3D()

function sanF(num,scene){
    for(let i=0;i<num;i++){
        let sanG = new THREE.ConeBufferGeometry( 2,2,3);
        let san = new THREE.Mesh( sanG, cubeMat );
        san.position.x=Math.random()>0.5?parseInt(Math.random()*500):-parseInt(Math.random()*500)
        san.position.y=Math.random()>0.5?parseInt(Math.random()*500):-parseInt(Math.random()*500)
        san.position.z=Math.random()>0.5?parseInt(Math.random()*500):-parseInt(Math.random()*500)

        star.add(san)
    } 
}
sanF(500,star)

var directionalLight = new THREE.DirectionalLight( '#fff', 0.8 );
var pudirectionalLight = new THREE.PointLight( 'rgb(255,4,255)', 0.5 ,0);
directionalLight.position.set(1,1,0)
pudirectionalLight.position.set(-100,-69,20)
var ballG = new THREE.IcosahedronGeometry(55,2);

var ballOG = new THREE.IcosahedronGeometry(75,2);
var ball = new THREE.Mesh( ballG, cubeMat );
var ballO = new THREE.Mesh( ballOG, lineMat );
ball.position.y = ballO.position.y=-70
scene.add( directionalLight );
scene.add( pudirectionalLight );
scene.add(light)//场景中加入光源
scene.add( camera );
scene.add( ball )
scene.add( ballO );
scene.add( star );
let texture = new THREE.Texture()

Promise.all([loadObj('../lib/ashe.obj'),loadImage('../lib/ashe.jpg')]).then(res=>{
        texture.image = res[1];  
        //纹理在创建后发生了改变（由上一语句引发），必须设置needsUpdate属性为true  
        texture.needsUpdate = true;  
        let obj = res[0]; 
        obj.traverse(child=>{
            if (child instanceof THREE.Mesh) {  
                child.material.map = texture;  
            } 
        })
        obj.position.z=-500
        obj.rotateX ( Math.PI/4 )
        scene.add(obj)
})

renderer.render(scene, camera);//把相机对准场景开始渲染

let i=0;
const render=()=>{
ball.rotation.z+=0.01
ball.rotation.y+=0.01
ballO.rotation.z-=0.01
star.rotation.y-=0.003
renderer.render(scene, camera);//把相机对准场景开始渲染
requestAnimationFrame(render)
}
render()

function loadObj(url){
    return new Promise(resolve=>{
        new THREE.OBJLoader().load(url, resolve)
    })
}
function loadImage(url) {  
    return new Promise(function (resolve) {  
        new THREE.ImageLoader().load(url, resolve)
    })
} 