let data; // On va stocker les projets ici

// Appel de la fonction fetch
export async function getProjects() {
  const response = await fetch("http://localhost:5678/api/works");
  return await response.json();
}

// Récupération des projets et stockage dans data
export async function fetchAndStoreProjects() {
  data = await getProjects();
  displayWorks(data); // Afficher tous les projets au début
}

const sectionGallery = document.querySelector(".gallery");

// Fonction pour afficher les projets
function displayWorks(projects) {
  // Effacer le contenu précédent de la galerie
  sectionGallery.innerHTML = "";
  for (let i = 0; i < projects.length; i++) {
    // Création des balises
    const figure = document.createElement("figure");
    const imageElement = document.createElement("img");
    const textElement = document.createElement("figcaption");
    // On rattache les balises à la section Gallery
    sectionGallery.appendChild(figure);
    figure.appendChild(imageElement);
    figure.appendChild(textElement);
    // Intégration des images et des descriptions
    imageElement.src = projects[i].imageUrl;
    textElement.innerHTML = projects[i].title;
  }
}

// Générer les filtres dynamiquement
export async function getCategories() {
  const response = await fetch("http://localhost:5678/api/categories");
  return await response.json();
}

async function displayCategoryButton() {
  const categories = await getCategories(); 
  const btnFilter = document.querySelector(".btn-filter");
  const btnAll = document.querySelector(".btn-all");
  
  btnAll.addEventListener("click", () => {
    const allButtons = btnFilter.querySelectorAll("button");
    allButtons.forEach(btn => {
      btnAll.classList.add("btn-selected")
      btn.classList.remove("btn-selected");
      displayWorks(data); 
    });
  });

  categories.forEach(category => {
    const button = document.createElement("button");     
    button.value = category.id ; 
    button.textContent = category.name;   
    button.classList.add("btn");
    btnFilter.appendChild(button);
      
    button.addEventListener("click", () => {
      button.classList.add("btn-selected");
      const allButtons = btnFilter.querySelectorAll("button");
      allButtons.forEach(btn => {
        if (btn !== button) {
          btn.classList.remove("btn-selected");
        }
      });
           
      // Filtrer et afficher les travaux correspondant à la catégorie
      const filteredWorks = data.filter(work => work.categoryId == category.id);
      displayWorks(filteredWorks);
    })  
  })
}
displayCategoryButton();    

// Initialisation : récupérer les projets et les afficher tous par défaut
fetchAndStoreProjects();


