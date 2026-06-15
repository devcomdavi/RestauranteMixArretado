package com.mixarretado.mix_arretado_backend.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tb_bebida")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Bebida {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String nome;
    
    private String descricao;
    
    @Column(nullable = false)
    private Double preco;
    
    private String volume;
    
    @ManyToOne
    @JoinColumn(name = "categoria_id")
    private Categoria categoria;
}
