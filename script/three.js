import objloader from './objloader.js'
const THREE= window.THREE=require('three')
THREE.OBJLoader = objloader();
const scene = new THREE.Scene();//创建一个场景
const camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z=150
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
//创建一个光源，这光源是属于环境光，先别管啥叫环境光
const light = new THREE.AmbientLight( '#fff',1);

var directionalLight = new THREE.DirectionalLight( '#fff', 0.8 );
directionalLight.position.set(1,1,0)
scene.add( directionalLight );
scene.add(light)//场景中加入光源
scene.add( camera );

let texture = new THREE.Texture()

Promise.all([loadObj('../lib/lux6.obj'),loadImage('../lib/lux6.jpg')]).then(res=>{
        texture.image = res[1];  
        //纹理在创建后发生了改变（由上一语句引发），必须设置needsUpdate属性为true  
        texture.needsUpdate = true;  
        let obj = res[0]; 
        obj.traverse(child=>{
            if (child instanceof THREE.Mesh) {  
                child.material.map = texture;  
            } 
        })
        obj.position.z=-100
        obj.position.y=-100
        obj.rotateY(Math.PI)
        // obj.rotateX ( Math.PI/2 )
        scene.add(obj)
        renderer.render(scene, camera);//把相机对准场景开始渲染
})



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