package com.mixarretado.mix_arretado_backend.services;

import com.mixarretado.mix_arretado_backend.models.Categoria;
import com.mixarretado.mix_arretado_backend.repositories.CategoriaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoriaService {
    private final CategoriaRepository repository;

    public List<Categoria> findAll() {
        return repository.findAll();
    }

    public Categoria findById(Long id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Categoria não encontrada"));
    }

    public Categoria save(Categoria categoria) {
        return repository.save(categoria);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
