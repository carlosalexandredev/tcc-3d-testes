import * as THREE from '../library/three.module.js';

var APP = {
    Start: function (){
        // Cena
        var cena = new THREE.Scene();
        
        //Alterando cor do plano de fundo
        cena.background = new THREE.Color(0xFEB203)

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

        //Criando Geometria 3D
        //Geometria(altura, largura, profundidade)
        var geometria = new THREE.BoxGeometry(2, 2, 2);
        var material = new THREE.MeshBasicMaterial({color: 0x5639F6});//Materal cor do objeto
        //Criando cubo (geometria, material)
        var cubo = new THREE.Mesh(geometria, material);

        //Criando Wireframe da geometria
        var wireframeCubo = new THREE.WireframeGeometry(geometria);
        var linhaCubo = new THREE.LineSegments(wireframeCubo);
        linhaCubo.material.depthTest = false; //Ver wireframe atraves da malha
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
            requestAnimationFrame(animacao);
            cubo.rotation.y += 0.05; // Frames Three
            linhaCubo.rotation.y += 0.05; //Rotação
            renderer.render(cena, camera); //Rederizar a cena a cada rotação
        }
        animacao();
    }
}
export { APP };