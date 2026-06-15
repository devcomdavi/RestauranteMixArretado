package com.mixarretado.mix_arretado_backend.models;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "tb_categoria")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Categoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String nome;

    @OneToMany(mappedBy = "categoria")
    @JsonIgnore
    private List<Prato> pratos;

    @OneToMany(mappedBy = "categoria")
    @JsonIgnore
    private List<Bebida> bebidas;
}
