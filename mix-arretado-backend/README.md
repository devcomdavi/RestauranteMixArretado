# Mix Arretado - Backend

Este projeto é uma API REST para o sistema do Restaurante Mix Arretado, desenvolvida com Spring Boot.

## Tecnologias
- Java 17+
- Spring Boot 3.x
- Spring Data JPA
- H2 Database (Banco em memória)
- Lombok

## Como Rodar o Projeto

1.  **Pré-requisitos:** Certifique-se de ter o Java 17 (ou superior) instalado.
2.  **Execução:** Na raiz do projeto, execute:
    ```bash
    ./mvnw spring-boot:run
    ```
3.  **Acesso:** O servidor iniciará por padrão na porta `8080`.

## Endpoints Principais

- **Categorias:** `http://localhost:8080/api/categorias`
- **Pratos:** `http://localhost:8080/api/pratos`
- **Bebidas:** `http://localhost:8080/api/bebidas`

## Banco de Dados (H2 Console)

Você pode acessar o console do banco de dados em memória para visualizar as tabelas:
- **URL:** `http://localhost:8080/h2-console`
- **JDBC URL:** `jdbc:h2:mem:mixarretadodb`
- **User:** `sa`
- **Password:** (deixe em branco)

## Estrutura do Projeto
- `models`: Entidades JPA com Lombok.
- `repositories`: Interfaces JPA para acesso a dados.
- `services`: Camada de lógica de negócio.
- `controllers`: Endpoints REST.
- `data.sql`: Script de carga inicial de dados.
