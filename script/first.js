//引入three.js我这里采用的是npm包的require,你也可以使用标签的方式引入
//不管怎么样只要保证全局变量里面有THREE这个对象就行
const THREE= window.THREE=require('three')
const scene = new THREE.Scene();//创建一个场景
//创建一个相机，这个相机属于透视投影相机，里面的参数你就先别管了
const camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z=150//因为刚刚创建的对象都会位于原点，我们需要把相机拉远一点
//创建一个渲染器,并设置大小，然后把这个渲染器加入到dom中
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
//创建一个光源，这光源是属于环境光，先别管啥叫环境光
const light = new THREE.AmbientLight( '#fff',1);
//创建一种材质
const mat = new THREE.MeshPhongMaterial({
    color: new THREE.Color("rgb(106,153,153)"),
    transparent: 1,
    opacity: 0.2,
    shininess:5,
    specular:new THREE.Color("rgb(153,153,153)"),
    emissive:new THREE.Color("rgb(6,53,53)"),
    shading: THREE.FlatShading 
});
//创建一个多面体模型，并将模型和材质结合
const ballGeometry = new THREE.IcosahedronGeometry(25,2);
const ball = new THREE.Mesh( ballGeometry, mat );

scene.add(light)//场景中加入光源
scene.add( camera )//场景中加入相机
scene.add( ball )//场景中加入多面体

renderer.render(scene, camera);//把相机对准场景开始渲染
