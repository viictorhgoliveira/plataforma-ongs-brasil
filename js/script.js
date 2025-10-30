document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll("nav a");
    const conteudoPrincipal = document.querySelector("main");

    // Função para carregar o conteúdo dinamicamente
    function carregarPagina(pagina) {
        fetch(pagina)
            .then(res => {
                if (!res.ok) throw new Error("Erro ao carregar a página");
                return res.text();
            })
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, "text/html");
                const novoConteudo = doc.querySelector("main").innerHTML;
                conteudoPrincipal.innerHTML = novoConteudo;

                // Atualiza a classe "ativo" no menu
                links.forEach(link => link.classList.remove("ativo"));
                document.querySelector(`a[href='${pagina}']`).classList.add("ativo");
            })
            .catch(() => {
                conteudoPrincipal.innerHTML = "<p>Erro ao carregar o conteúdo.</p>";
            });
    }

    // Adiciona o evento de clique em cada link do menu
    links.forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault();
            const pagina = link.getAttribute("href");
            carregarPagina(pagina);
        });
    });
});
