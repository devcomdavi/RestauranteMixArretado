package com.mixarretado.mix_arretado_backend.services;

import com.mixarretado.mix_arretado_backend.models.Bebida;
import com.mixarretado.mix_arretado_backend.repositories.BebidaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BebidaService {
    private final BebidaRepository repository;

    public List<Bebida> findAll() {
        return repository.findAll();
    }

    public Bebida findById(Long id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Bebida não encontrada"));
    }

    public Bebida save(Bebida bebida) {
        return repository.save(bebida);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
