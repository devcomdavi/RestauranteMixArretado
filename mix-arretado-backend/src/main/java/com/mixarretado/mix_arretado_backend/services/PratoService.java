package com.mixarretado.mix_arretado_backend.services;

import com.mixarretado.mix_arretado_backend.models.Prato;
import com.mixarretado.mix_arretado_backend.repositories.PratoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PratoService {
    private final PratoRepository repository;

    public List<Prato> findAll() {
        return repository.findAll();
    }

    public Prato findById(Long id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Prato não encontrado"));
    }

    public Prato save(Prato prato) {
        return repository.save(prato);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
