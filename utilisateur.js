const TodoList = require('./todolist');
class User {
    constructor(nom, prenom,mail, age, motDePasse) {
      this.name = nom; // Nom
      this.email = mail; // E-Mail
      this.prenom = prenom; // Prenom
      this.age = age; // Age
      this.mdp = motDePasse; //Mot De Passe
      this.listToDo = []; // Liste des ToDoListes de L'utilisateur
      this.lastTodoListId = 0; // Id ToDo
    };
    // ToDoList
    createTodoList(name, content, date) {
      const newTodoList = new TodoList(name, content, date);
      this.listToDo.push(newTodoList);
      return newTodoList;
    };
    removeTodoList(todoName){
      // recherche du nom de la TodoList à retirer
      const index = this.listToDo.findIndex(todo => todo.name === todoName);
      // Si elle existe
      if (index !== -1) {
        // Retrait de la TodoList
        this.listToDo.splice(index, 1);
      }
    }
    getTodoLists() {
      return this.listToDo;
    };
    addTodoList(todoList) {
      // S'il n'y a pas de todoList
      if(this.listToDo.length == 0) {
        // Ajout de la todoList
        this.listToDo.push(todoList);
        // Incrémentation du dernier ID
        this.lastTodoListId++;
      }
    }
    addTaskTodoList(newTask){
      // Boucle sur les valeurs de la liste de Taches
      for(let values in newTask) {
        // Si la TodoList à Déjà 7 éléments
        if(this.listToDo.length == 7) {
          console.log("MIAL HELLO");
        }
        // Si la la TodoList possède moins de 10 éléments ajout du nouvel élément à la liste sinon Limite Atteinte
        this.listToDo.length < 10 ? this.listToDo.push(newTask[values]) : console.log("Limite Atteinte");
        // Retourne la tache ajouté
        return newTask[values];
      }
    }
    // Utilisateur
    display(){
      return(`${this.name} - ${this.prenom} : ${this.age} ans | ${this.email}`);
    };
    /**
     *  ^ : le début de la chaîne
     *  [^\s@]+ : une ou plusieurs caractères qui ne sont pas des espaces ou des arobases
     *  @ : un arobase
     *  [^\s@]+ : une ou plusieurs caractères qui ne sont pas des espaces ou des arobases
     *  \. : un point (le caractère . doit être échappé avec un antislash \ car il est un caractère spécial dans les regex)
     *  [^\s@]+$ : une ou plusieurs caractères qui ne sont pas des espaces ou des arobases,
     *  jusqu'à la fin de la chaîne (indiquée par $)
     * @returns si l'email est valide
     * 
     */
    isMailValid(){
      if(this.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
        return true;
    };
    isAgeValid(){
      let age = this.getAge();
      if(age >= 13) {
        return true;
      }
    }
    getAge(){
      const birthDate = new Date(this.age);
      const ageDiffMs = Date.now() - birthDate.getTime();
      const ageDate = new Date(ageDiffMs);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
    /**
     * ^ : le début de la chaîne.
     * (?=.*[A-Z]) : assertion positive pour vérifier si la chaîne contient au moins une lettre majuscule.
     * (?=.*\d) : assertion positive pour vérifier si la chaîne contient au moins un chiffre.
     * .{8,40} : la chaîne doit avoir entre 8 et 40 caractères.
     * $ : la fin de la chaîne.
     * @returns Un boolean => Vrai mdp valide => Faux Invalide
    */
    checkPassword() {
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,40}$/;
      return passwordRegex.test(this.mdp) ;
    }
  };

  module.exports = User;