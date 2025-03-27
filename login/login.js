function login(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    if (email === "admin@cistore.com" && password === "123456") {
        alert("Login bem-sucedido!");
        window.location.href = "dashboard.html";
    } else {
        alert("Email ou senha incorretos!");
    }
}

function loginWithGoogle() {
    alert("Login com Google ainda não implementado.");
}

function loginWithApple() {
    alert("Login com Apple ainda não implementado.");
}

function handleCredentialResponse(response) {
    console.log("Token JWT: " + response.credential);

    // Decodificar o token JWT (opcional)
    const data = parseJwt(response.credential);
    console.log("Usuário:", data);

    // Salvar o login no localStorage (exemplo)
    localStorage.setItem("user", JSON.stringify(data));

    // Redirecionar para a página principal
    window.location.href = "../main/index.html";
}

// Função para decodificar o token JWT
function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
}