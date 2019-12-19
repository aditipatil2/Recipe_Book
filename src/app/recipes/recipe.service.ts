import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    //recipeSelected = new Subject<Recipe>();
    
    private recipes: Recipe[] = [
        new Recipe(
            '1st Test Recipe',
            'This is a simple test',
            'https://www.thecookierookie.com/wp-content/uploads/2019/08/pasta-pomodoro-recipe-3-of-7.jpg.webp',
            [
                new Ingredient('Meat',1),
                new Ingredient('French Fries', 20)
            ]),

        new Recipe(
            '2nd Test Recipe',
            'This is a simple test',
            'https://www.thecookierookie.com/wp-content/uploads/2019/08/pasta-pomodoro-recipe-3-of-7.jpg.webp',
            [
                new Ingredient('Bun',2),
                new Ingredient('Cheese', 5)
            ]),
        new Recipe(
            '3rd Test Recipe',
            'This is a simple test',
            'https://www.thecookierookie.com/wp-content/uploads/2019/08/pasta-pomodoro-recipe-3-of-7.jpg.webp',
            [
                new Ingredient('Noodles',1),
                new Ingredient('Veggies', 4)
            ])
    
      ];
    constructor(private slService: ShoppingListService) {

    }
    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index:number) {
        return this.recipes[index];
    }
    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}