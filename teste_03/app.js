import * as THREE from '../library/three.module.js';

var APP = {
    Start: function (){
        // Cena
        var cena = new THREE.Scene();
        
        //Alterando cor do plano de fundo
        cena.background = new THREE.Color(0x00235E)

        //Cria Camera (graus, largura&altura, inicio da visão , fim da visão)
        var camera = new THREE.PerspectiveCamera(75, (window.innerWidth / window.innerHeight), 0.1, 1000); 
        camera.position.set(5, 5, 5);
        camera.lookAt(cena.position); //Olhar para onde (posição da cena)

        //Renderização
        var renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(0x5639F6, 1);// Altera cor de fundo
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement); //Exibir renderizador no body da página

        
        //Adiciona eixos
        var eixos = new THREE.AxesHelper(10);
        cena.add(eixos);

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
        linhaCubo.material.depthTest = true; //Ver wireframe atraves da malha
        linhaCubo.material.transparent = true; //Ativa Transparencia
        linhaCubo.material.opacity = 0.70; //Opacidade Linha


        //Criando uma face triangulo
        const shape = new THREE.Shape();
        const x = 2;
        const y = 2;

        shape.moveTo(x - 2, y - 2);
        shape.lineTo(x + 2, y - 2);
        shape.lineTo(x, y + 2);

        const TriangleGeometry = new THREE.ShapeGeometry(shape);
        var materialTriangulo = new THREE.MeshBasicMaterial({color: 0xEB9D3A});//Materal cor do Triangulo
        var triangulo = new THREE.Mesh(TriangleGeometry, materialTriangulo);
         //Adicionado Triangulo a cena
        cena.add(triangulo)

        //Criando esfera (raio, qtd de divisoes horizontais, qtd de divisoes laterais)
        var esferaGeometria = new THREE.SphereGeometry(1, 12, 7);
        var materialEsfera = new THREE.MeshBasicMaterial({color: 0x17D480})
        var meshEsfera = new THREE.Mesh(esferaGeometria, materialEsfera)
        meshEsfera.position.set(0, 2, 0)
        cena.add(meshEsfera)


        //Adicionado cubo a cena
        cena.add(cubo);

        //Adicionando wireframe a cena
        cena.add(linhaCubo)

        //Posicionamento da camera
        camera.position.z = 5;

        renderer.render(cena, camera);

        var cuboSegueFrente = true;
        //Animação de rotação
        function animacao(){
                requestAnimationFrame(animacao);
                cubo.rotation.y += 0.05; // Frames Three
                linhaCubo.rotation.y += 0.05; //Rotação
                triangulo.rotation.z += 0.05;

                if(cuboSegueFrente == true){
                    linhaCubo.position.z = cubo.position.z += 0.1;
                    meshEsfera.position.y += 0.05; 
                }else {
                    linhaCubo.position.z = cubo.position.z -= 0.1;
                    meshEsfera.position.y -= 0.05;
                }

                if(cubo.position.z >= 5.0){
                    cuboSegueFrente = false;
                }else if(cubo.position.z <= -5.0){
                    cuboSegueFrente = true;
                }

                renderer.render(cena, camera); //Rederizar a cena a cada rotação 
            }

        var run = false;
        addEventListener('click', function(){
                if(run == false){
                    animacao();
                    run = true;
                }
            });
    }
}
export { APP };