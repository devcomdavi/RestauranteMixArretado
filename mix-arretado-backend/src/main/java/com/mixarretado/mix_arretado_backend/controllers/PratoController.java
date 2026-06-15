package com.mixarretado.mix_arretado_backend.controllers;

import com.mixarretado.mix_arretado_backend.models.Prato;
import com.mixarretado.mix_arretado_backend.services.PratoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/pratos")
@RequiredArgsConstructor
public class PratoController {
    private final PratoService service;

    @GetMapping
    public ResponseEntity<List<Prato>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Prato> findById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<Prato> save(@RequestBody Prato prato) {
        return ResponseEntity.ok(service.save(prato));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
