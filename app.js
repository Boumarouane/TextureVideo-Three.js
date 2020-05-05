var container;

var camera, scene, renderer;

var video, texture, planeGeometry, geometry, materia, mesh, plane;


var startButton = document.getElementById( 'startButton' );
    startButton.addEventListener( 'click', function () {
        init();
        animate();
    });
    
    function init() {

        var play = document.getElementById( 'play' );
        play.remove();
    
        container = document.createElement( 'div' );
        document.body.appendChild( container );
        
        camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 5000 );
        camera.position.set(0, 0, 15);
    
        scene = new THREE.Scene();
    
        var light = new THREE.DirectionalLight( 0xffffff, 6 );
        light.position.set( 0, 6, 2 );
        scene.add( light );

        var light2 = new THREE.DirectionalLight( 0xffffff, 7 );
        light2.position.set( 0, -6, -2 );
        scene.add( light2 );
    
        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        container.appendChild( renderer.domElement );

        video = document.getElementById( 'video' );
        video.play();

        let sphereVideo = document.getElementById( 'sphereVideo' );
        sphereVideo.play();
        
        texture = new THREE.VideoTexture( video );
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.format = THREE.RGBFormat;
        texture.anisotropy = 5;
        texture.mapping = THREE.SphericalReflectionMapping;

        let textureVideo = new THREE.VideoTexture( sphereVideo );
        textureVideo.minFilter = THREE.NearestMipmapNearestFilter;
        textureVideo.magFilter = THREE.NearestFilter;
        textureVideo.format = THREE.RGBFormat;
        textureVideo.anisotropy = 10;
        textureVideo.mapping = THREE.SphericalReflectionMapping;

        geometry = new THREE.SphereBufferGeometry( 6, 32, 32);

        planeGeometry = new THREE.PlaneBufferGeometry( 10, 10, 32);
        
        material = new THREE.MeshBasicMaterial( { color: 0xffffff, map: texture, side: THREE.DoubleSide } );


        let materialVideo = new THREE.MeshPhysicalMaterial( { color: 0xffffff, map: textureVideo} );
        materialVideo.transparent = true;
        materialVideo.opacity = 0.4;

        
        mesh = new THREE.Mesh( geometry, materialVideo );
        mesh.position.set(10, 0, 0)
        scene.add( mesh );

        plane = new THREE.Mesh( planeGeometry, material );
        plane.position.set(-10, 0, 0)
        scene.add( plane );
    
        let control = new THREE.OrbitControls(camera, renderer.domElement)
    }
    
    function animate() {
        
        renderer.render(scene, camera);
    
        requestAnimationFrame( animate );
    }