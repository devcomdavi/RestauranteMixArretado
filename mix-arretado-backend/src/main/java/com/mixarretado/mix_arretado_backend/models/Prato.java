package com.mixarretado.mix_arretado_backend.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tb_prato")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Prato {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String nome;
    
    private String descricao;
    
    @Column(nullable = false)
    private Double preco;

    @Column(columnDefinition = "TEXT")
    private String picture;
    
    @ManyToOne
    @JoinColumn(name = "categoria_id")
    private Categoria categoria;
}
