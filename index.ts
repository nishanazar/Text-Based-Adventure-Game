import inquire from "inquirer";
import chalk from "chalk";


// --------------Game variables---------------------------*
let enemies: string[] = ["Skeleton", "Zombie", "Worrier", "Assassin"];

let maxEnemyHealth = 75;
let enemyAttackDamage = 25;

//---------------Players variables-----------------------*
let health = 100;
let attackDamage = 50;
let numHealthPotions = 3;
let healthPotionHealAmount = 30;
let healthPotionDropChance = 50;

//---------------while loop condition-----------------------*

let gameRunning = true;

console.log("\n-----------------------------------------");
console.log(chalk.bgCyanBright("\tWellcome to the DeadZone!"));
console.log("-----------------------------------------");

GAME: while (gameRunning) {
  let enemyHealth = Math.floor(Math.random() * maxEnemyHealth + 1);
  let enemyIndex = Math.floor(Math.random() * enemies.length);
  let enemy = enemies[enemyIndex];

  console.log(chalk.yellow.underline(`\t* ${enemy} has appeared! *\n`));

  while (enemyHealth > 0) {
    console.log(chalk.magentaBright(`\tYour Health: ${health}`));
    console.log(chalk.magentaBright(`\t${enemy}'s Health: ${enemyHealth}`));

    console.log("-----------------------------------------");
    let options = await inquire.prompt([
      {
        name: "ans",
        type: "list",
        message: "What would you like to do?",
        choices: ["1. Attack", "2. Drink health potion", "3. Run!"],
      },
    ]);
    if (options.ans === "1. Attack") {
      let damageToEnemy = Math.floor(Math.random() * attackDamage + 1);
      let damageHero = Math.floor(Math.random() * enemyAttackDamage + 1);

      enemyHealth -= damageToEnemy;
      health -= damageHero;

      console.log(chalk.red(`> You strike the ${enemy} for ${damageToEnemy} damage.`));
      console.log(chalk.red(`>The ${enemy} hits you for ${health} damage.`));
      

      if (health < 1) {
        console.log(chalk.gray(
          `> You have taken too much damage, you are too weak to continue.`
        ));
        break;
      }
    } else if (options.ans === "2. Drink health potion") {
      if (numHealthPotions > 0) {
        health += healthPotionHealAmount;
        numHealthPotions--;

        console.log(chalk.grey(
          `> you drink a health potion, healing yourself for ${healthPotionHealAmount}`
        ));
        console.log(chalk.green(`> You now have ${health} health.`));
        console.log(chalk.green(`> You have ${numHealthPotions} health potion left.`));
      } else {
        console.log(chalk.green(
          `> You have no health potions left! Defeat enemies for a chance to get one. \n`
        ));
      }
    } else if (options.ans === "3. Run!") {
      console.log(chalk.red(`> You run away from ${enemy}`));
      continue GAME;
    }
  }
  if (health < 1) {
    console.log(chalk.grey(`> You are out from battle. you are too weak. `));
    break;
  }
  console.log(chalk.yellow(`\t${enemy} was defeated!`));
  console.log(chalk.yellow(`\tyou have ${health} health.`));

  let randomnumber = Math.floor(Math.random() * 100 + 1);
  if (randomnumber < healthPotionDropChance) {
    numHealthPotions++;
    console.log(chalk.yellow(`\tenemy give you health potion`));

    console.log(chalk.yellow(`\tyour health potion is ${numHealthPotions}`));
  }
  console.log("-----------------------------------------");
  let useoption = await inquire.prompt([
    {
      name: "ane",
      type: "list",
      message: "What would you like to do now?",
      choices: ["1. Continue", "2. Exit"],
    },
  ]);
  if (useoption.ane === "1. Continue") {
    console.log(chalk.green(`you are continue on your advanture`));
  } else {
    console.log(chalk.yellow.bold.underline(`you successfuly Exit from deadZone`));
    break;
  }
  console.log(chalk.red(`\t* Thank you for playing *`));
  console.log("-----------------------------------------");
}
