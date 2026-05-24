import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Dish {
  name: string;
  price: string;
  description: string;
  imageUrl: string;
}

interface Testimonial {
  author: string;
  text: string;
  stars: number;
}

@Component({
  selector: 'app-homepage-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './homepage-component.html',
  styleUrl: './homepage-component.css',
})
export class HomepageComponent {
  featuredDishes: Dish[] = [
    {
      name: 'Baião de Dois Arretado',
      price: 'R$ 58,00',
      description: 'Mistura perfeita de arroz, feijão de corda, queijo coalho, carne seca, bacon e coentro fresco.',
      imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Carne de Sol com Macaxeira',
      price: 'R$ 65,00',
      description: 'Nossa tradicional carne de sol curada na casa, servida com macaxeira frita crocante e manteiga de garrafa.',
      imageUrl: 'https://images.unsplash.com/photo-1603360946369-dc9bb0258143?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Moqueca de Peixe e Camarão',
      price: 'R$ 120,00',
      description: 'Peixe fresco do litoral, camarões graúdos, cozidos no azeite de dendê, leite de coco, pimentões e coentro.',
      imageUrl: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Cartola Clássica',
      price: 'R$ 28,00',
      description: 'A sobremesa pernambucana perfeita: banana frita, queijo manteiga derretido, açúcar e canela em pó.',
      imageUrl: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    }
  ];

  testimonials: Testimonial[] = [
    {
      author: 'Maria Silva',
      text: 'Melhor baião de dois que já comi fora de casa, tempero no ponto, atendimento caloroso e um clima maravilhoso!',
      stars: 5
    },
    {
      author: 'João Pedro',
      text: 'A carne de sol desmancha na boca. A sobremesa de cartola me fez lembrar da minha infância em Recife. Recomendo demais!',
      stars: 5
    },
    {
      author: 'Ana Clara',
      text: 'Um pedacinho do nordeste na capital. A caipirinha de caju com rapadura é divina. Ambiente nota 10!',
      stars: 5
    }
  ];

  getStars(count: number): string {
    return '★'.repeat(count);
  }
}
