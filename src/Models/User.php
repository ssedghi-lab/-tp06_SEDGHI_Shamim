<?php
namespace Models;

class User {
    public $id;
    public $username;
    public $password;
    public $email;

    // Constructeur pour initialiser les propriétés de l'objet User
    public function __construct($id, $username, $password, $email) {
        $this->id = $id;
        $this->username = $username;
        $this->password = $password;
        $this->email = $email;
    }

    // Méthode pour afficher les informations de l'utilisateur
    public function displayInfo() {
        return "ID: {$this->id}, Username: {$this->username}, Email: {$this->email}";
    }
}
