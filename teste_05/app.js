import * as THREE from '../library/three.module.js';
import { TrackballControls } from '../library/TrackballControls.js';
import { GUI } from '../library/dat.gui.module.js';


var APP = {
    Start: function (){
        // Variavel que armazena frames da aplicação
        var clock = new THREE.Clock();

        // Cena
        var cena = new THREE.Scene();
        
        //Alterando cor do plano de fundo
        cena.background = new THREE.Color(0xF4EDD9)

        //Cria Camera (graus, largura&altura, inicio da visão , fim da visão)
        var camera = new THREE.PerspectiveCamera(75, (window.innerWidth / window.innerHeight), 0.1, 1000); 

        //Renderização
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement); //Exibir renderizador no body da página
        
        //Caso o Usuário redimencione a página atualize o canva
        window.addEventListener('resize', function(){
            renderer.setSize(window.innerWidth, window.innerHeight);
        })

        // ************ TRACKBALL *************** //
        var trackballControls = new TrackballControls(camera, renderer.domElement);
        
        trackballControls.rotateSpeed = 1.0;
        trackballControls.zoomSpeed = 1.2;
        trackballControls.panSpeed = 0.8;

        // ************************************** //

        // ************ GUI *************** //
        var controlerGUI = new function(){
            this.rotacao = 1.0;
            this.zoom = 1.0;
            this.movimentacao = 1.0;
        };

        var gui = new GUI({autoplace: false, width: 300});
        gui.add(controlerGUI, 'rotacao', 0, 5);
        gui.add(controlerGUI, 'zoom', 0, 5);
        gui.add(controlerGUI, 'movimentacao', 0, 5);
        // ************************************** //

        //Adicionando eixos
        var eixos = new THREE.AxesHelper(5);
        cena.add(eixos);

        //Criando grid
        const size = 15;
        const divisions = 16;
        const gridHelper = new THREE.GridHelper( size, divisions );
        cena.add( gridHelper );

        //Criando Geometria 3D
        //Geometria(altura, largura, profundidade)
        var geometria = new THREE.BoxGeometry(2, 2, 2);
        var material = new THREE.MeshBasicMaterial({color: 0x5639F6});//Materal cor do objeto
        //Criando cubo (geometria, material)
        var cubo = new THREE.Mesh(geometria, material);

        //Criando Wireframe da geometria
        var wireframeCubo = new THREE.WireframeGeometry(geometria);
        var linhaCubo = new THREE.LineSegments(wireframeCubo);
        linhaCubo.material.depthTest = true; //Ver wireframe atraves da malha
        linhaCubo.material.transparent = true; //Ativa Transparencia
        linhaCubo.material.opacity = 0.70; //Opacidade Linha

        //Adicionado cubo a cena
        cena.add(cubo);

        //Adicionando wireframe a cena
        cena.add(linhaCubo)

        //Posicionamento da camera
        camera.position.z = 5;

        //Animação de rotação 
        function animacao(){
            // Tempo passado entre o último frame e o atual
            var delta = clock.getDelta();
            
            // Atualiza camera
            trackballControls.update(delta);

            trackballControls.rotateSpeed = controlerGUI.rotacao;
            trackballControls.zoomSpeed = controlerGUI.zoom;
            trackballControls.panSpeed = controlerGUI.movimentacao;

            requestAnimationFrame(animacao);
            cubo.rotation.y += 0.05; // Frames Three
            linhaCubo.rotation.y += 0.05; //Rotação
            renderer.render(cena, camera); //Rederizar a cena a cada rotação
        }
        animacao();
    }
}
export { APP };