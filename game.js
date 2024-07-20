import { createAnimations } from "./animations.js";

/* global Phaser */
const config = {
  type: Phaser.AUTO, // webgl o canvas
  width: 256,
  height: 244,
  backgroundColor: "#049cd8",
  parent: "game",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: {
    preload, //se ejecuta antes de crear el juego para cargar los recursos
    create, // se ejecuta cuando el juego comienza
    update, // se ejecuta en cada frame
  },
};

new Phaser.Game(config);

function preload() {
  /* this -> game -> el juego que estamos construyendo */
  this.load.image("cloud1", "assets/scenery/overworld/cloud1.png");
  this.load.image("cloud2", "assets/scenery/overworld/cloud2.png");
  this.load.image("floorbricks", "assets/scenery/overworld/floorbricks.png");
  this.load.spritesheet("mario", "assets/entities/mario.png", {
    frameWidth: 18,
    frameHeight: 16,
  });

  this.load.audio("gameover", "assets/sound/music/gameover.mp3");
}

function create() {
  /* para dar la propiedad o crear una imagen u oobjeto, debe ser */
  /* image(x,y, nombre del aset) */
  this.add.image(20, 70, "cloud1").setOrigin(0, 0).setScale(0.15);
  this.add.image(120, 30, "cloud2").setOrigin(0, 0).setScale(0.15);
  this.add.image(150, 20, "cloud1").setOrigin(0, 0).setScale(0.15);
  this.add.image(170, 30, "cloud2").setOrigin(0, 0).setScale(0.15);
  this.add.image(250, 45, "cloud2").setOrigin(0, 0).setScale(0.15);
  //configuracion de las teclas
  this.keys = this.input.keyboard.createCursorKeys();

  //se crea una textura para que se exapnda cuando avanza
  this.floor = this.physics.add.staticGroup();

  this.floor
    .create(0, config.height - 16, "floorbricks")
    .setOrigin(0, 0.5)
    .refreshBody();

  this.floor
    .create(150, config.height - 16, "floorbricks")
    .setOrigin(0, 0.5)
    .refreshBody();

  /* this.mario = this.add.sprite(50, 212, "mario").setOrigin(0, 1); */
  this.mario = this.physics.add
    .sprite(50, 100, "mario")
    .setOrigin(0, 1)
    .setGravityY(700) //se le pone gravedad a mario
    .setCollideWorldBounds(true); //se pone los limites para cuando choca el marion con el mundo

  //se pone los limites de mario en el mundo
  this.physics.world.setBounds(0, 0, 2000, config.height);

  //aqui se crea la fisicas para la colision de mario con el piso
  this.physics.add.collider(this.mario, this.floor);

  //se pone la camara para que siga a mario
  this.cameras.main.setBounds(0, 0, 2000, config.height);
  this.cameras.main.startFollow(this.mario);

  //se crea las animaciones llamando al archivo animations.js
  createAnimations(this);
}

function update() {
  if (this.mario.isDead) return;

  if (this.keys.left.isDown) {
    this.mario.anims.play("mario-walk", true);
    this.mario.x -= 1;
    this.mario.flipX = true; //para que mario se voltee
  } else if (this.keys.right.isDown) {
    this.mario.anims.play("mario-walk", true);
    this.mario.x += 1;
    this.mario.flipX = false; //para que mario se voltee
  } else {
    this.mario.anims.play("mario-idle", true);
  }

  if (this.keys.up.isDown && this.mario.body.touching.down) {
    this.mario.setVelocityY(-300);
    this.mario.anims.play("mario-jump", true);
  }

  //se configura para cuando mario muere
  if (this.mario.y >= config.height) {
    this.mario.isDead = true;
    this.mario.anims.play("mario-die", true);
    //this.mario.setTint(0xff0000);
    this.mario.setCollideWorldBounds(false);
    this.sound.add("gameover", { volume: 0.3 }).play();

    setTimeout(() => {
      this.mario.setVelocityY(-350);
    }, 100);

    setTimeout(() => {
      this.scene.restart();
    }, 5000);
  }
}
