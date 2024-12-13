// Exemple de produits
const produits = [
    { id: 1, nom: "Razer", prix: 2499.99, image: "razer-blade-16-i9-16-go-rtx-4070-1-to.jpg" },
    { id: 2, nom: "Pc Edition Noël", prix: 1199.99, image: "pc-gamer-noel.jpg" },
    { id: 3, nom: "PC Gamer blackmax RTX 4070", prix: 1299.99, image: "pc-gamer-blackmax-RTX-4070.jpg" },
    { id: 4, nom: "RX 7800XT", prix: 499.99, image: "Rx 7800xt.jpg" },
    { id: 5, nom: "Ryzen 5 9600x", prix: 249.99, image: "Ryzen 5 9600x.jpg" },
    { id: 6, nom: "Crucial DDR5 32go", prix: 119.99, image: "Crucial-DDR5-Pro-Overclocking_Bare-1024x768.jpeg" }
];

// Fonction pour ajouter un produit au panier
function ajouterAuPanier(id) {
    let panier = JSON.parse(localStorage.getItem("panier")) || [];
    const produit = produits.find(p => p.id === id);
    
    if (produit) {
        panier.push(produit);
        localStorage.setItem("panier", JSON.stringify(panier));
        updatePanier();
    }
}

// Fonction pour afficher les produits dans le panier
function updatePanier() {
    const panier = JSON.parse(localStorage.getItem("panier")) || [];
    const panierItems = document.getElementById("panierItems");
    const totalElement = document.getElementById("total");

    // Réinitialise le contenu du panier
    panierItems.innerHTML = '';

    let total = 0;

    panier.forEach((produit, index) => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("panier-item");

        itemElement.innerHTML = `
            <img src="${produit.image}" alt="${produit.nom}" style="width: 50px; height: 50px; object-fit: cover;">
            <p>${produit.nom}</p>
            <p>${produit.prix.toFixed(2)} €</p>
            <button onclick="supprimerDuPanier(${index})">Supprimer</button>
        `;

        panierItems.appendChild(itemElement);
        total += produit.prix;
    });

    totalElement.textContent = "Total: " + total.toFixed(2) + " €";
}

// Fonction pour supprimer un produit du panier
function supprimerDuPanier(index) {
    let panier = JSON.parse(localStorage.getItem("panier")) || [];
    panier.splice(index, 1); // Supprime l'élément à l'index donné
    localStorage.setItem("panier", JSON.stringify(panier));
    updatePanier();
}

// Fonction de validation du panier (exemple)
function validerPanier() {
    alert("Votre commande a été validée !");
    localStorage.removeItem("panier"); // Vider le panier après validation
    updatePanier();
}

// Appeler la fonction pour afficher le panier au chargement de la page
updatePanier();
