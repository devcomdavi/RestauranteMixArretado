package com.mixarretado.mix_arretado_backend.repositories;

import com.mixarretado.mix_arretado_backend.models.Prato;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.EntityGraph;
import java.util.List;

@Repository
public interface PratoRepository extends JpaRepository<Prato, Long> {
    @EntityGraph(attributePaths = {"categoria"})
    List<Prato> findAll();
}
