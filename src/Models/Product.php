<?php
namespace Models;

class Product {
    public $id;
    public $name;
    public $description;
    public $price;

    // Constructeur pour initialiser les propriétés de l'objet Product
    public function __construct($id, $name, $description, $price) {
        $this->id = $id;
        $this->name = $name;
        $this->description = $description;
        $this->price = $price;
    }

    // Méthode pour afficher les détails du produit
    public function displayDetails() {
        return "ID: {$this->id}, Name: {$this->name}, Price: $this->price";
    }
}
