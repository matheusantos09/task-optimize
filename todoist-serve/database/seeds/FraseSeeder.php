<?php

use Illuminate\Database\Seeder;

class FraseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $list = [
            'A persistência é o caminho do êxito',
            'O que não provoca minha morte faz com que eu fique mais forte',
            'Pedras no caminho? Eu guardo todas. Um dia vou construir um castelo',
            'O que me preocupa não é o grito dos maus. É o silêncio dos bons',
            'O insucesso é apenas uma oportunidade para recomeçar com mais inteligência',
            'No meio da dificuldade encontra-se a oportunidade',
            'O sucesso é ir de fracasso em fracasso sem perder entusiasmo',
            'É parte da cura o desejo de ser curado',
            'O verdadeiro homem mede a sua força quando se defronta com o obstáculo',
            'Você precisa fazer aquilo que pensa que não é capaz de fazer',
            'Um bom começo é a metade',
            'Faço da dificuldade a minha motivação',
            'Inspiração vem dos outros. Motivação vem de dentro de nós',
            'Muitas vezes não é a motivação que precisa mudar, e sim, o foco',
            'A Minha Motivação de todos os dias, é você',
            'Motivação é a impulsão para realizações de sonhos',
            'A motivação é uma decisão, depende de si mesmo',
            'As críticas são a motivação para o sucesso',
            'Motivação, parceria, trabalho em equipe',
            'Motivação e Esperança uma combinação poderosa',
            'Não deixe que as pessoas te façam desistir daquilo que você mais quer na vida. Acredite. Lute. Conquiste. E acima de tudo, seja feliz',
            'Algumas vezes coisas ruins acontecem em nossas vidas para nos colocar na direção das melhores coisas que poderíamos viver. Se a vida não ficar mais fácil, trate de ficar mais forte',
            'Não importa o que você decidiu . O que importa é que isso te faça feliz',
            'Se a caminhada está difícil, é porque você está no caminho certo',
            'Toda conquista começa com a decisão de tentar',
            'Insista, persista e nunca desista',
            'Vai . E se der medo, vai com medo mesmo',
            ' Quando algo ruim acontece você tem três escolhas: deixar isso definir você, deixar isso destruir você ou fazer isso te deixar mais forte',
            'Você é mais forte do que imagina . Acredite',
            'Imagine uma nova história para sua vida e acredite nela',
            'Todo esforço tem a sua recompensa',
            'Se não puder fazer tudo, faça tudo que puder',
            'O importante não é vencer todos os dias, mas lutar sempre',
            'Por maior que seja, não há obstáculo que não possa ser superado',
        ];

        foreach ($list as $phase) {
            \App\Models\Frase::create([
                'text' => $phase
            ]);
        }

    }
}
