package com.mixarretado.mix_arretado_backend.controllers;

import com.mixarretado.mix_arretado_backend.models.Bebida;
import com.mixarretado.mix_arretado_backend.services.BebidaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/bebidas")
@RequiredArgsConstructor
public class BebidaController {
    private final BebidaService service;

    @GetMapping
    public ResponseEntity<List<Bebida>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Bebida> findById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<Bebida> save(@RequestBody Bebida bebida) {
        return ResponseEntity.ok(service.save(bebida));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Bebida> update(@PathVariable Long id, @RequestBody Bebida bebida) {
        bebida.setId(id);
        return ResponseEntity.ok(service.save(bebida));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
