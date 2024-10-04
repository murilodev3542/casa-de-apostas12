<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body class="bg-light">

    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card shadow-sm">
                    <div class="card-body">
                        <h1 class="text-center mb-4">Cadastro de Usuário</h1>
                        <form method="POST" action="gravaPessoa.php">
                            <div class="mb-3">
                                <label for="username" class="form-label">Nome de Usuário:</label>
                                <input type="text" name="username" id="username" class="form-control" required>
                            </div>

                            <div class="mb-3">
                                <label for="cpf" class="form-label">CPF:</label>
                                <input type="text" name="cpf" id="cpf" class="form-control" required>
                            </div>

                            <div class="mb-3">
                                <label for="celular" class="form-label">Celular:</label>
                                <input type="text" name="celular" id="celular" class="form-control" required>
                            </div>

                            <div class="mb-3">
                                <label for="age" class="form-label">Idade:</label>
                                <input type="number" name="age" id="age" class="form-control" required>
                            </div>

                            <div class="mb-3">
                                <label for="password" class="form-label">Senha:</label>
                                <input type="password" name="password" id="password" class="form-control" required>
                            </div>

                            <div class="d-grid">
                                <button type="submit" class="btn btn-primary">Registrar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <footer class="text-center mt-4">
        <p>&copy; 2024 Cash On. Todos os direitos reservados.</p>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>
