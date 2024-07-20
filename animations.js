export const createAnimations = (game) => {
  //se debe crear las animaciones tambien
  game.anims.create({
    key: "mario-walk",
    frames: game.anims.generateFrameNumbers("mario", { start: 1, end: 3 }), // aqui se indica que frames se van a usar,
    //frames serian las imagenes de mario
    frameRate: 12, //cuantos frames por segundo
    repeat: -1,
  });

  //se crea otra animacion para cuando el mario este quieto
  game.anims.create({
    key: "mario-idle",
    frames: [{ key: "mario", frame: 0 }], //se pone un solo frame
    frameRate: 12,
  });

  //se crea una animacion para cuando mario salta
  game.anims.create({
    key: "mario-jump",
    frames: [{ key: "mario", frame: 5 }], //se pone un solo frame
    frameRate: 12,
  });

  //se crea una animacion para cuando mario muere
    game.anims.create({
        key: "mario-die",
        frames: [{ key: "mario", frame: 4 }], //se pone un solo frame
        frameRate: 12,
    });
};
