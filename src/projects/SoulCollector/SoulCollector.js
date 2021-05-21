import React, { useState, useEffect } from "react";
import { useRoutes, usePath, A } from "hookrouter";
import Phaser from "phaser";
import logoImg from "../SoulCollector/assets/logo.png";
import soulImg from "../SoulCollector/assets/soul.png";
import throneImg from "../SoulCollector/assets/throne.png";
import heroImg from "../SoulCollector/assets/player/hero.png";
import castSpellImg from "../SoulCollector/assets/player/cast-spell.png";
import spellImg from "../SoulCollector/assets/spells/missile.png";
import merchantImg from "../SoulCollector/assets/interact/merchant.png";
import portalImg from "../SoulCollector/assets/interact/portal.png";
import wave1Img from "../SoulCollector/assets/enemies/wave-1/wave-1.png";
import wave1Json from "../SoulCollector/assets/enemies/wave-1/wave-1.json";
import wave2Img from "../SoulCollector/assets/enemies/wave-2/wave-2.png";
import wave2Json from "../SoulCollector/assets/enemies/wave-2/wave-2.json";
import wave3Img from "../SoulCollector/assets/enemies/wave-3/wave-3.png";
import wave3Json from "../SoulCollector/assets/enemies/wave-3/wave-3.json";
import wave4Img from "../SoulCollector/assets/enemies/wave-4/wave-4.png";
import wave4Json from "../SoulCollector/assets/enemies/wave-4/wave-4.json";
import wave5Img from "../SoulCollector/assets/enemies/wave-5/wave-5.png";
import wave5Json from "../SoulCollector/assets/enemies/wave-5/wave-5.json";

const SoulCollector = () => {
  useEffect(() => {
    runGame();
  }, []);

  const runGame = () => {
    // TITLE SCENE/SCREEN
    class TitleScreen extends Phaser.Scene {
      constructor() {
        super({ key: "titleScreen" });
      }

      preload() {
        this.load.image("logo", logoImg);
      }

      create() {
        this.logo = this.add.image(400, 300, "logo");
        this.add.text(560, 16, "CONTROLS", { fontSize: "16px", fill: "#fff" });
        this.add.text(560, 32, "WASD: Movement", {
          fontSize: "16px",
          fill: "#fff"
        });
        this.add.text(560, 48, "E: Interact", {
          fontSize: "16px",
          fill: "#fff"
        });
        this.add.text(560, 64, "Space: Cast Spell", {
          fontSize: "16px",
          fill: "#fff"
        });
        this.add.text(560, 80, "Numerics: Change Spell", {
          fontSize: "16px",
          fill: "#fff"
        });
        this.add.text(300, 400, "Press START", {
          fontFamily: "Arial",
          fontSize: 32,
          color: "#fff"
        });
        this.input.manager.enabled = true;
        this.input.once(
          "pointerdown",
          function() {
            this.scene.switch("mainScene");
          },
          this
        );
      }
    }

    // MAIN GAME SCENE
    class MainScene extends Phaser.Scene {
      constructor() {
        super({ key: "mainScene" });

        // Objects
        this.hero;
        this.spell;
        this.enemy;
        this.enemies;
        this.soul; // Soul sprite from dead enemy
        this.souls; // Group of souls
        this.portal;
        this.portalZone;
        this.imp;

        // Data
        this.soulScore = 0;
        this.hp = 100;
        this.heroDirection = "right";
        this.spellCast = false;
        this.waveNum = 1;

        // TEXT/UI
        this.hpText;
        this.soulScoreText;
        this.waveText;
        this.waveCompleteText;

        // Controls
        this.WKey;
        this.AKey;
        this.SKey;
        this.DKey;
        this.spaceBar;
        this.numberKeys;
      }

      preload() {
        this.load.spritesheet("missile-sprite", spellImg, {
          frameWidth: 48,
          frameHeight: 47
        });
        // Enemies
        this.load.atlas("wave-1", wave1Img, wave1Json);
        this.load.atlas("wave-2", wave2Img, wave2Json);
        this.load.atlas("wave-3", wave3Img, wave3Json);
        this.load.atlas("wave-4", wave4Img, wave4Json);
        this.load.atlas("wave-5", wave5Img, wave5Json);

        // Hero
        this.load.spritesheet("hero-sprite", heroImg, {
          frameWidth: 89,
          frameHeight: 103
        });
        this.load.spritesheet("cast-spell-sprite", castSpellImg, {
          frameWidth: 93,
          frameHeight: 101
        });
        this.load.spritesheet("soul-sprite", soulImg, {
          frameWidth: 84,
          frameHeight: 31
        });
        this.load.image("portal-image", portalImg);
      }

      create() {
        //  DATA REGISTRY
        this.registry.set("soulScore", this.soulScore);
        this.registry.set("hp", 100);
        this.registry.set("waveNum", 1);
        this.registry.events.on("changedata", this.updateData, this);

        //  UI
        this.soulScoreText = this.add
          .text(16, 16, "Souls: 0", { fontSize: "32px", fill: "#fff" })
          .setDepth(5);
        this.waveText = this.add
          .text(625, 16, "Wave: 1", { fontSize: "32px", fill: "#fff" })
          .setDepth(5);
        this.hpText = this.add
          .text(16, 556, "HP: 100", { fontSize: "32px", fill: "#fff" })
          .setDepth(5);

        //  OBJECTS
        //  Spell
        this.anims.create({
          key: "attack",
          frames: this.anims.generateFrameNames("missile-sprite"),
          frameRate: 10,
          repeat: -1
        });
        this.spell = this.physics.add.sprite(400, 300, "missile-sprite");
        this.spell.play("attack");
        this.spell.body.setSize(10, 10);

        //  Portal
        this.portal = this.add.image(300, 70, "portal-image");
        this.portalZone = this.add.zone(280, 50).setSize(50, 50);
        this.physics.world.enable(this.portalZone);

        //  Hero
        this.anims.create({
          key: "hero-standing",
          frames: this.anims.generateFrameNames("hero-sprite", {
            start: 0,
            end: 7
          }),
          frameRate: 10,
          repeat: -1
        });
        this.anims.create({
          key: "cast-spell",
          frames: this.anims.generateFrameNames("cast-spell-sprite", {
            start: 0,
            end: 3
          }),
          frameRate: 10,
          repeat: -1
        });
        this.hero = this.physics.add
          .sprite(100, 300, "hero-sprite")
          .setDepth(4);
        this.hero.play("hero-standing");
        this.hero.setCollideWorldBounds(true);
        this.hero.body.setSize(40, 40);
        this.hero.setImmovable();

        this.startNextWave();

        //  Soul
        this.anims.create({
          key: "soul-float",
          frames: this.anims.generateFrameNames("soul-sprite"),
          frameRate: 10,
          repeat: -1
        });
        this.souls = this.physics.add.group({
          key: "soul",
          setXY: { x: -800, Y: 0 }
        });

        //  COLLISIONS
        this.physics.add.overlap(
          this.enemies,
          this.hero,
          this.enemyHitCallback,
          null,
          this
        );
        this.physics.add.overlap(
          this.spell,
          this.enemies,
          this.spellHitCallback,
          null,
          this
        );
        this.physics.add.overlap(
          this.hero,
          this.portalZone,
          this.portalCallback,
          null,
          this
        );
        this.physics.add.overlap(
          this.souls,
          this.hero,
          this.collectSoulCallback,
          null,
          this
        );

        // Input for update
        this.WKey = this.input.keyboard.addKey(
          Phaser.Input.Keyboard.KeyCodes.W
        );
        this.AKey = this.input.keyboard.addKey(
          Phaser.Input.Keyboard.KeyCodes.A
        );
        this.SKey = this.input.keyboard.addKey(
          Phaser.Input.Keyboard.KeyCodes.S
        );
        this.DKey = this.input.keyboard.addKey(
          Phaser.Input.Keyboard.KeyCodes.D
        );
        this.spaceBar = this.input.keyboard.addKey(
          Phaser.Input.Keyboard.KeyCodes.SPACE
        );
        this.numberKeys = this.input.keyboard.addKeys(
          "ONE,TWO,THREE,FOUR,FIVE"
        );
      }

      // (registry update)
      updateData(parent, key, data) {
        if (key === "soulScore") {
          this.soulScoreText.setText("Souls: " + data);
        }
        if (key === "hp") {
          this.hpText.setText("HP: " + data);
        }
        if (key === "waveNum") {
          this.waveText.setText("Wave: " + data);
        }
      }

      startNextWave() {
        //  Enemy/Enemies
        let nextWaveKey = "wave-" + this.waveNum;
        let nextWaveAnimation = "wave-" + this.waveNum + "-walk";

        this.anims.create({
          key: nextWaveAnimation,
          frames: this.anims.generateFrameNames(nextWaveKey),
          frameRate: 9,
          repeat: -1
        });

        // GET NEXT WAVE
        this.enemies = this.physics.add.group({
          key: nextWaveKey,
          repeat: 11
        });
        Phaser.Actions.GridAlign(this.enemies.getChildren(), {
          width: 2,
          cellWidth: 50,
          cellHeight: 43,
          x: 650,
          y: 200
        });
        this.enemies.playAnimation(nextWaveAnimation);
        this.enemies.children.each(function(enemy) {
          this.physics.moveTo(enemy, this.hero.x, this.hero.y, 40, 8500);
        }, this);
        this.physics.add.overlap(
          this.enemies,
          this.hero,
          this.enemyHitCallback,
          null,
          this
        );
        this.physics.add.overlap(
          this.spell,
          this.enemies,
          this.spellHitCallback,
          null,
          this
        );
      }

      spellHitCallback(spell, enemy) {
        if (this.spellCast == true) {
          // Enemy destroy
          let deathAnimation = "wave-" + this.waveNum + "-die";
          enemy.body.enable = false;
          enemy.destroy();

          // Soul float to
          this.soul = this.souls.create(enemy.x, enemy.y, "soul-sprite");
          this.soul.flipX = true;
          this.soul.play("soul-float");
          this.physics.moveTo(this.soul, this.hero.x, this.hero.y, 40, 800);
          if (this.enemies.countActive(true) === 0) {
            let waveCompleteText = this.add
              .text(240, 240, "Wave " + this.waveNum + " Complete", {
                fontSize: "32px",
                fill: "#fff"
              })
              .setDepth(5);
            setTimeout(function() {
              waveCompleteText.visible = false;
            }, 3000);
            this.waveNum++;
            this.registry.set("waveNum", this.waveNum);
            if (this.waveNum === 6) {
            } else {
              this.startNextWave();
            }
          } else {
          }
        }
      }

      gameOver() {
        let gameOverText = this.add
          .text(100, 100, "GAME OVER", { fontSize: "32px", fill: "#fff" })
          .setAlign("center");
        this.anims.pauseAll();
        this.input.keyboard.enabled = false;
        this.hero.body.enable = false;
        // this.enemies.body.enable = false;
        this.enemies.children.each(function(enemy) {
          enemy.body.enable = false;
        }, this);
      }

      enemyHitCallback(hero, enemy) {
        hero.setTint(0xff0000);
        setTimeout(function() {
          hero.setTint();
        }, 1000);
        this.soulScore += 100;
        this.registry.set("soulScore", this.soulScore);
        hero.x -= 50;
        this.hp -= 10;
        this.registry.set("hp", this.hp);

        if (this.hp <= 0) {
          this.gameOver();
        }
      }

      portalCallback(hero, portal) {
        this.scene.switch("itemShopScene");
        hero.x = 100;
        hero.y = 300;
        hero.setVelocity(0);
      }

      collectSoulCallback(hero, soul) {
        soul.destroy();
        this.soulScore += 100;
        this.registry.set("soulScore", this.soulScore);
      }

      update() {
        // Stop HERO movement
        if (
          this.hero.body.velocity.x !== 0 ||
          this.hero.body.velocity.y !== 0
        ) {
          this.hero.setVelocityX(0);
          this.hero.setVelocityY(0);
        }
        this.enemies.children.each(function(enemy) {
          this.physics.moveTo(enemy, this.hero.x, this.hero.y, 80, 0);
          if (enemy.x < this.hero.x) {
            enemy.flipX = true;
          } else {
            enemy.flipX = false;
          }
        }, this);

        if (this.souls.length) {
          this.souls.children.each(function(soul) {
            this.physics.moveTo(soul, this.hero.x, this.hero.y, 80, 0);
            if (soul.x < this.hero.x) {
              soul.flipX = false;
            } else {
              soul.flipX = true;
            }
          });
        }

        // SPELLS
        if (this.spellCast == false) {
          this.spell.setVelocityX(0);
          this.spell.visible = false;
          this.spell.x = this.hero.x;
          this.spell.y = this.hero.y;
          if (this.heroDirection == "left") {
            this.spell.flipX = true;
          } else {
            this.spell.flipX = false;
          }
        }

        if (this.spell.x > 830 || this.spell.x < -30) {
          this.spellCast = false;
        }

        //  CONTROLS
        if (this.WKey.isDown) {
          this.hero.setVelocityY(-130);
        }
        if (this.AKey.isDown) {
          this.hero.setVelocityX(-130);
          this.hero.flipX = false;
          this.heroDirection = "left";
        }
        if (this.SKey.isDown) {
          this.hero.setVelocityY(130);
        }
        if (this.DKey.isDown) {
          this.hero.setVelocityX(130);
          this.hero.flipX = true;
          this.heroDirection = "right";
        }
        if (this.spaceBar.isDown) {
          this.spellCast = true;
          this.spell.visible = true;

          //if player facing
          if (this.heroDirection == "right") {
            this.spell.setVelocityX(600);
          } else {
            this.spell.setVelocityX(-600);
          }

          this.hero.play("cast-spell");

          this.hero.on(
            "animationcomplete",
            function(anim, frame) {
              // this.emit('animationcomplete_' + anim.key, anim, frame);
              // this.hero.play('hero-standing');
            },
            this.hero
          );
        }
      }
    }

    // ITEM SHOP SCENE

    class ItemShopScene extends Phaser.Scene {
      constructor() {
        super({ key: "itemShopScene" });
        this.merchant;
        this.merchantZone;
        this.merchantText;
      }

      preload() {
        this.load.spritesheet("merchant-sprite", merchantImg, {
          frameWidth: 58,
          frameHeight: 95
        });
        this.load.image("throne", throneImg);
      }

      create() {
        // DATA
        this.soulScore = this.registry.list.soulScore;
        this.soulScoreText = this.add.text(16, 16, "Souls: " + this.soulScore, {
          fontSize: "32px",
          fill: "#fff"
        });
        this.hp = this.registry.list.hp;
        this.hpText = this.add.text(16, 556, "HP: " + this.hp, {
          fontSize: "32px",
          fill: "#fff"
        });

        // Portal
        this.portal = this.add.image(300, 70, "portal-image");
        this.portalZone = this.add.zone(280, 50).setSize(50, 50);
        this.physics.world.enable(this.portalZone);

        // Throne
        this.add.image(602, 182, "throne");

        // Merchant
        this.anims.create({
          key: "merchant-standing",
          frames: this.anims.generateFrameNames("merchant-sprite"),
          frameRate: 1,
          repeat: 0
        });
        this.merchant = this.physics.add.sprite(600, 200, "merchant-sprite");
        this.merchant.play("merchant-standing");

        this.merchantZone = this.add
          .zone(this.merchant.x - 29, this.merchant.y - 47)
          .setSize(60, 95);
        this.physics.world.enable(this.merchantZone);

        this.merchant.on(
          "animationcomplete",
          function(anim, frame) {
            this.emit("animationcomplete_" + anim.key, anim, frame);
          },
          this.merchant
        );

        this.merchant.on("animationcomplete_merchant-standing", function() {
          this.setVelocityY(500);
        });

        // Hero
        this.hero = this.physics.add.sprite(100, 300, "hero-sprite");
        this.hero.play("hero-standing");
        this.hero.setCollideWorldBounds(true);
        this.hero.body.setSize(40, 40);
        this.hero.setImmovable();

        // Physics Overlap
        this.physics.add.overlap(
          this.hero,
          this.portalZone,
          this.portalCallback,
          null,
          this
        );
        this.physics.add.overlap(
          this.hero,
          this.merchantZone,
          this.merchantCallback,
          null,
          this
        );

        // Controls
        this.WKey = this.input.keyboard.addKey(
          Phaser.Input.Keyboard.KeyCodes.W
        );
        this.AKey = this.input.keyboard.addKey(
          Phaser.Input.Keyboard.KeyCodes.A
        );
        this.SKey = this.input.keyboard.addKey(
          Phaser.Input.Keyboard.KeyCodes.S
        );
        this.DKey = this.input.keyboard.addKey(
          Phaser.Input.Keyboard.KeyCodes.D
        );
        this.EKey = this.input.keyboard.addKey(
          Phaser.Input.Keyboard.KeyCodes.E
        );
      }

      portalCallback(hero, portal) {
        hero.x = 100;
        hero.y = 300;
        hero.setVelocity(0);
        this.scene.switch("mainScene");
      }

      merchantCallback(hero, merchant) {
        this.merchantText = this.add.text(360, 360, "You're back!");
      }

      update() {
        // Stop HERO movement
        if (
          this.hero.body.velocity.x !== 0 ||
          this.hero.body.velocity.y !== 0
        ) {
          this.hero.setVelocityX(0);
          this.hero.setVelocityY(0);
        }

        // Update UI
        var soulScore = this.registry.list.soulScore;
        this.soulScoreText.setText("Souls: " + soulScore);
        var hp = this.registry.list.hp;
        this.hpText.setText("HP: " + hp);

        // CONTROLS
        if (this.WKey.isDown) {
          this.hero.setVelocityY(-130);
        }
        if (this.AKey.isDown) {
          this.hero.setVelocityX(-130);
          this.hero.flipX = false;
        }
        if (this.SKey.isDown) {
          this.hero.setVelocityY(130);
        }
        if (this.DKey.isDown) {
          this.hero.setVelocityX(130);
          this.hero.flipX = true;
        }
        if (this.EKey.isDown) {
        }
      }
    }

    var config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: "soul-collector",
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0, x: 0 },
          debug: false
        }
      },
      scene: [TitleScreen, MainScene, ItemShopScene]
    };

    var game = new Phaser.Game(config);
  };

  return (
    <div>
      <h1 className="page-header">Soul Collector</h1>
      <p>
        My first attempt at making a video game in the Web a while back using
        the{" "}
        <a href="https://phaser.io/phaser3" target="_blank">
          Phaser 3
        </a>{" "}
        framework. Not finished in any sense (Game ends after Wave 5).
      </p>
      <p>
        It's an action game where you must defend against waves of enemies with
        spells and collect their souls for more power.
      </p>
      <p>
        If I returned to this project I would rewrite it much differently in
        React, without Phaser. I would add more waves, levels, spells, an item
        shop for souls, and a story.
      </p>
      <div className="app soul-collector">
        <section id="soul-collector"></section>
      </div>

      <h3>💻 Code:</h3>
      <div className="file-name">
        <span>
          <i className="code-icon js-icon">{"JS"} </i>SoulCollector.js
        </span>
      </div>
      <pre className="line-numbers">
        <code className="language-jsx">
          {`// TITLE SCENE/SCREEN
class TitleScreen extends Phaser.Scene {
  constructor() {
    super({ key: "titleScreen" });
  }

  preload() {
    this.load.image("logo", logoImg);
  }

  create() {
    this.logo = this.add.image(400, 300, "logo");
    this.add.text(560, 16, "CONTROLS", { fontSize: "16px", fill: "#fff" });
    this.add.text(560, 32, "WASD: Movement", {
      fontSize: "16px",
      fill: "#fff"
    });
    this.add.text(560, 48, "E: Interact", {
      fontSize: "16px",
      fill: "#fff"
    });
    this.add.text(560, 64, "Space: Cast Spell", {
      fontSize: "16px",
      fill: "#fff"
    });
    this.add.text(560, 80, "Numerics: Change Spell", {
      fontSize: "16px",
      fill: "#fff"
    });
    this.add.text(300, 400, "Press START", {
      fontFamily: "Arial",
      fontSize: 32,
      color: "#fff"
    });
    this.input.manager.enabled = true;
    this.input.once(
      "pointerdown",
      function() {
        this.scene.switch("mainScene");
      },
      this
    );
  }
}

// MAIN GAME SCENE
class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: "mainScene" });

    // Objects
    this.hero;
    this.spell;
    this.enemy;
    this.enemies;
    this.soul; // Soul sprite from dead enemy
    this.souls; // Group of souls
    this.portal;
    this.portalZone;
    this.imp;

    // Data
    this.soulScore = 0;
    this.hp = 100;
    this.heroDirection = "right";
    this.spellCast = false;
    this.waveNum = 1;

    // TEXT/UI
    this.hpText;
    this.soulScoreText;
    this.waveText;
    this.waveCompleteText;

    // Controls
    this.WKey;
    this.AKey;
    this.SKey;
    this.DKey;
    this.spaceBar;
    this.numberKeys;
  }

  preload() {
    this.load.spritesheet("missile-sprite", spellImg, {
      frameWidth: 48,
      frameHeight: 47
    });
    // Enemies
    this.load.atlas("wave-1", wave1Img, wave1Json);
    this.load.atlas("wave-2", wave2Img, wave2Json);
    this.load.atlas("wave-3", wave3Img, wave3Json);
    this.load.atlas("wave-4", wave4Img, wave4Json);
    this.load.atlas("wave-5", wave5Img, wave5Json);

    // Hero
    this.load.spritesheet("hero-sprite", heroImg, {
      frameWidth: 89,
      frameHeight: 103
    });
    this.load.spritesheet("cast-spell-sprite", castSpellImg, {
      frameWidth: 93,
      frameHeight: 101
    });
    this.load.spritesheet("soul-sprite", soulImg, {
      frameWidth: 84,
      frameHeight: 31
    });
    this.load.image("portal-image", portalImg);
  }

  create() {
    //  DATA REGISTRY
    this.registry.set("soulScore", this.soulScore);
    this.registry.set("hp", 100);
    this.registry.set("waveNum", 1);
    this.registry.events.on("changedata", this.updateData, this);

    //  UI
    this.soulScoreText = this.add
      .text(16, 16, "Souls: 0", { fontSize: "32px", fill: "#fff" })
      .setDepth(5);
    this.waveText = this.add
      .text(625, 16, "Wave: 1", { fontSize: "32px", fill: "#fff" })
      .setDepth(5);
    this.hpText = this.add
      .text(16, 556, "HP: 100", { fontSize: "32px", fill: "#fff" })
      .setDepth(5);

    //  OBJECTS
    //  Spell
    this.anims.create({
      key: "attack",
      frames: this.anims.generateFrameNames("missile-sprite"),
      frameRate: 10,
      repeat: -1
    });
    this.spell = this.physics.add.sprite(400, 300, "missile-sprite");
    this.spell.play("attack");
    this.spell.body.setSize(10, 10);

    //  Portal
    this.portal = this.add.image(300, 70, "portal-image");
    this.portalZone = this.add.zone(280, 50).setSize(50, 50);
    this.physics.world.enable(this.portalZone);

    //  Hero
    this.anims.create({
      key: "hero-standing",
      frames: this.anims.generateFrameNames("hero-sprite", {
        start: 0,
        end: 7
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "cast-spell",
      frames: this.anims.generateFrameNames("cast-spell-sprite", {
        start: 0,
        end: 3
      }),
      frameRate: 10,
      repeat: -1
    });
    this.hero = this.physics.add
      .sprite(100, 300, "hero-sprite")
      .setDepth(4);
    this.hero.play("hero-standing");
    this.hero.setCollideWorldBounds(true);
    this.hero.body.setSize(40, 40);
    this.hero.setImmovable();

    this.startNextWave();

    //  Soul
    this.anims.create({
      key: "soul-float",
      frames: this.anims.generateFrameNames("soul-sprite"),
      frameRate: 10,
      repeat: -1
    });
    this.souls = this.physics.add.group({
      key: "soul",
      setXY: { x: -800, Y: 0 }
    });

    //  COLLISIONS
    this.physics.add.overlap(
      this.enemies,
      this.hero,
      this.enemyHitCallback,
      null,
      this
    );
    this.physics.add.overlap(
      this.spell,
      this.enemies,
      this.spellHitCallback,
      null,
      this
    );
    this.physics.add.overlap(
      this.hero,
      this.portalZone,
      this.portalCallback,
      null,
      this
    );
    this.physics.add.overlap(
      this.souls,
      this.hero,
      this.collectSoulCallback,
      null,
      this
    );

    // Input for update
    this.WKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.W
    );
    this.AKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.A
    );
    this.SKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.S
    );
    this.DKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.D
    );
    this.spaceBar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.numberKeys = this.input.keyboard.addKeys(
      "ONE,TWO,THREE,FOUR,FIVE"
    );
  }

  // (registry update)
  updateData(parent, key, data) {
    if (key === "soulScore") {
      this.soulScoreText.setText("Souls: " + data);
    }
    if (key === "hp") {
      this.hpText.setText("HP: " + data);
    }
    if (key === "waveNum") {
      this.waveText.setText("Wave: " + data);
    }
  }

  startNextWave() {
    //  Enemy/Enemies
    let nextWaveKey = "wave-" + this.waveNum;
    let nextWaveAnimation = "wave-" + this.waveNum + "-walk";

    this.anims.create({
      key: nextWaveAnimation,
      frames: this.anims.generateFrameNames(nextWaveKey),
      frameRate: 9,
      repeat: -1
    });

    // GET NEXT WAVE
    this.enemies = this.physics.add.group({
      key: nextWaveKey,
      repeat: 11
    });
    Phaser.Actions.GridAlign(this.enemies.getChildren(), {
      width: 2,
      cellWidth: 50,
      cellHeight: 43,
      x: 650,
      y: 200
    });
    this.enemies.playAnimation(nextWaveAnimation);
    this.enemies.children.each(function(enemy) {
      this.physics.moveTo(enemy, this.hero.x, this.hero.y, 40, 8500);
    }, this);
    this.physics.add.overlap(
      this.enemies,
      this.hero,
      this.enemyHitCallback,
      null,
      this
    );
    this.physics.add.overlap(
      this.spell,
      this.enemies,
      this.spellHitCallback,
      null,
      this
    );
  }

  spellHitCallback(spell, enemy) {
    if (this.spellCast == true) {
      // Enemy destroy
      let deathAnimation = "wave-" + this.waveNum + "-die";
      enemy.body.enable = false;
      enemy.destroy();

      // Soul float to
      this.soul = this.souls.create(enemy.x, enemy.y, "soul-sprite");
      this.soul.flipX = true;
      this.soul.play("soul-float");
      this.physics.moveTo(this.soul, this.hero.x, this.hero.y, 40, 800);
      if (this.enemies.countActive(true) === 0) {
        let waveCompleteText = this.add
          .text(240, 240, "Wave " + this.waveNum + " Complete", {
            fontSize: "32px",
            fill: "#fff"
          })
          .setDepth(5);
        setTimeout(function() {
          waveCompleteText.visible = false;
        }, 3000);
        this.waveNum++;
        this.registry.set("waveNum", this.waveNum);
        if (this.waveNum === 6) {
        } else {
          this.startNextWave();
        }
      } else {
      }
    }
  }

  gameOver() {
    let gameOverText = this.add
      .text(100, 100, "GAME OVER", { fontSize: "32px", fill: "#fff" })
      .setAlign("center");
    this.anims.pauseAll();
    this.input.keyboard.enabled = false;
    this.hero.body.enable = false;
    // this.enemies.body.enable = false;
    this.enemies.children.each(function(enemy) {
      enemy.body.enable = false;
    }, this);
  }

  enemyHitCallback(hero, enemy) {
    hero.setTint(0xff0000);
    setTimeout(function() {
      hero.setTint();
    }, 1000);
    this.soulScore += 100;
    this.registry.set("soulScore", this.soulScore);
    hero.x -= 50;
    this.hp -= 10;
    this.registry.set("hp", this.hp);

    if (this.hp <= 0) {
      this.gameOver();
    }
  }

  portalCallback(hero, portal) {
    this.scene.switch("itemShopScene");
    hero.x = 100;
    hero.y = 300;
    hero.setVelocity(0);
  }

  collectSoulCallback(hero, soul) {
    soul.destroy();
    this.soulScore += 100;
    this.registry.set("soulScore", this.soulScore);
  }

  update() {
    // Stop HERO movement
    if (
      this.hero.body.velocity.x !== 0 ||
      this.hero.body.velocity.y !== 0
    ) {
      this.hero.setVelocityX(0);
      this.hero.setVelocityY(0);
    }
    this.enemies.children.each(function(enemy) {
      this.physics.moveTo(enemy, this.hero.x, this.hero.y, 80, 0);
      if (enemy.x < this.hero.x) {
        enemy.flipX = true;
      } else {
        enemy.flipX = false;
      }
    }, this);

    if (this.souls.length) {
      this.souls.children.each(function(soul) {
        this.physics.moveTo(soul, this.hero.x, this.hero.y, 80, 0);
        if (soul.x < this.hero.x) {
          soul.flipX = false;
        } else {
          soul.flipX = true;
        }
      });
    }

    // SPELLS
    if (this.spellCast == false) {
      this.spell.setVelocityX(0);
      this.spell.visible = false;
      this.spell.x = this.hero.x;
      this.spell.y = this.hero.y;
      if (this.heroDirection == "left") {
        this.spell.flipX = true;
      } else {
        this.spell.flipX = false;
      }
    }

    if (this.spell.x > 830 || this.spell.x < -30) {
      this.spellCast = false;
    }

    //  CONTROLS
    if (this.WKey.isDown) {
      this.hero.setVelocityY(-130);
    }
    if (this.AKey.isDown) {
      this.hero.setVelocityX(-130);
      this.hero.flipX = false;
      this.heroDirection = "left";
    }
    if (this.SKey.isDown) {
      this.hero.setVelocityY(130);
    }
    if (this.DKey.isDown) {
      this.hero.setVelocityX(130);
      this.hero.flipX = true;
      this.heroDirection = "right";
    }
    if (this.spaceBar.isDown) {
      this.spellCast = true;
      this.spell.visible = true;

      //if player facing
      if (this.heroDirection == "right") {
        this.spell.setVelocityX(600);
      } else {
        this.spell.setVelocityX(-600);
      }

      this.hero.play("cast-spell");

      this.hero.on(
        "animationcomplete",
        function(anim, frame) {
          // this.emit('animationcomplete_' + anim.key, anim, frame);
          // this.hero.play('hero-standing');
        },
        this.hero
      );
    }
  }
}

// ITEM SHOP SCENE

class ItemShopScene extends Phaser.Scene {
  constructor() {
    super({ key: "itemShopScene" });
    this.merchant;
    this.merchantZone;
    this.merchantText;
  }

  preload() {
    this.load.spritesheet("merchant-sprite", merchantImg, {
      frameWidth: 58,
      frameHeight: 95
    });
    this.load.image("throne", throneImg);
  }

  create() {
    // DATA
    this.soulScore = this.registry.list.soulScore;
    this.soulScoreText = this.add.text(16, 16, "Souls: " + this.soulScore, {
      fontSize: "32px",
      fill: "#fff"
    });
    this.hp = this.registry.list.hp;
    this.hpText = this.add.text(16, 556, "HP: " + this.hp, {
      fontSize: "32px",
      fill: "#fff"
    });

    // Portal
    this.portal = this.add.image(300, 70, "portal-image");
    this.portalZone = this.add.zone(280, 50).setSize(50, 50);
    this.physics.world.enable(this.portalZone);

    // Throne
    this.add.image(602, 182, "throne");

    // Merchant
    this.anims.create({
      key: "merchant-standing",
      frames: this.anims.generateFrameNames("merchant-sprite"),
      frameRate: 1,
      repeat: 0
    });
    this.merchant = this.physics.add.sprite(600, 200, "merchant-sprite");
    this.merchant.play("merchant-standing");

    this.merchantZone = this.add
      .zone(this.merchant.x - 29, this.merchant.y - 47)
      .setSize(60, 95);
    this.physics.world.enable(this.merchantZone);

    this.merchant.on(
      "animationcomplete",
      function(anim, frame) {
        this.emit("animationcomplete_" + anim.key, anim, frame);
      },
      this.merchant
    );

    this.merchant.on("animationcomplete_merchant-standing", function() {
      this.setVelocityY(500);
    });

    // Hero
    this.hero = this.physics.add.sprite(100, 300, "hero-sprite");
    this.hero.play("hero-standing");
    this.hero.setCollideWorldBounds(true);
    this.hero.body.setSize(40, 40);
    this.hero.setImmovable();

    // Physics Overlap
    this.physics.add.overlap(
      this.hero,
      this.portalZone,
      this.portalCallback,
      null,
      this
    );
    this.physics.add.overlap(
      this.hero,
      this.merchantZone,
      this.merchantCallback,
      null,
      this
    );

    // Controls
    this.WKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.W
    );
    this.AKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.A
    );
    this.SKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.S
    );
    this.DKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.D
    );
    this.EKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.E
    );
  }

  portalCallback(hero, portal) {
    hero.x = 100;
    hero.y = 300;
    hero.setVelocity(0);
    this.scene.switch("mainScene");
  }

  merchantCallback(hero, merchant) {
    this.merchantText = this.add.text(360, 360, "You're back!");
  }

  update() {
    // Stop HERO movement
    if (
      this.hero.body.velocity.x !== 0 ||
      this.hero.body.velocity.y !== 0
    ) {
      this.hero.setVelocityX(0);
      this.hero.setVelocityY(0);
    }

    // Update UI
    var soulScore = this.registry.list.soulScore;
    this.soulScoreText.setText("Souls: " + soulScore);
    var hp = this.registry.list.hp;
    this.hpText.setText("HP: " + hp);

    // CONTROLS
    if (this.WKey.isDown) {
      this.hero.setVelocityY(-130);
    }
    if (this.AKey.isDown) {
      this.hero.setVelocityX(-130);
      this.hero.flipX = false;
    }
    if (this.SKey.isDown) {
      this.hero.setVelocityY(130);
    }
    if (this.DKey.isDown) {
      this.hero.setVelocityX(130);
      this.hero.flipX = true;
    }
    if (this.EKey.isDown) {
    }
  }
}

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "soul-collector",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0, x: 0 },
      debug: false
    }
  },
  scene: [TitleScreen, MainScene, ItemShopScene]
};

var game = new Phaser.Game(config);


`}
        </code>
      </pre>
      <A href="/work" className="back-link">
        Back to Work
      </A>
    </div>
  );
};

export default SoulCollector;
