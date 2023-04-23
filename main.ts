namespace SpriteKind {
    export const Bomb = SpriteKind.create()
}
/**
 * Maps-
 * 
 * The Core
 * 
 * The Omega (Joke)
 * 
 * The Green
 * 
 * The Hive
 */
/**
 * Protagonist= George
 */
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (claw && controller.up.isPressed()) {
        music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.InBackground)
        if (characterAnimations.matchesRule(mySprite, characterAnimations.rule(Predicate.FacingRight))) {
            projectile = sprites.createProjectileFromSprite(assets.image`Claw`, mySprite, speeedd + 100, 0)
        } else {
            projectile = sprites.createProjectileFromSprite(assets.image`Claw`, mySprite, 0 - (speeedd + 100), 0)
        }
        sprites.setDataNumber(projectile, "type", 2)
        projectile.y += 2
        projectile.lifespan = 750
    } else if (blaster) {
        music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.InBackground)
        if (characterAnimations.matchesRule(mySprite, characterAnimations.rule(Predicate.FacingRight))) {
            projectile = sprites.createProjectileFromSprite(assets.image`beam`, mySprite, speeedd + 100, 0)
        } else {
            projectile = sprites.createProjectileFromSprite(assets.image`beam`, mySprite, 0 - (speeedd + 100), 0)
        }
        sprites.setDataNumber(projectile, "type", 0)
        projectile.y += 2
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (game2) {
        if (mySprite.vy == 0) {
            music.play(music.melodyPlayable(music.knock), music.PlaybackMode.InBackground)
            mySprite.vy = -100
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`objBlaster`, function (sprite, location) {
    music.stopAllSounds()
    music.play(music.stringPlayable("G A G F G B - B ", 200), music.PlaybackMode.UntilDone)
    game.splash("You got the Blaster!", "Press B to fire!")
    blaster = true
    tiles.setTileAt(location, assets.tile`transparency8`)
})
function createWorld (test: boolean) {
    if (test) {
        tiles.setCurrentTilemap(tileUtil.createSmallMap(tilemap`worldTest`))
    } else {
        tiles.setCurrentTilemap(tileUtil.createSmallMap(tilemap`worldHive`))
    }
    for (let value of walls) {
        for (let for_pos of tiles.getTilesByType(value)) {
            tiles.setWallAt(for_pos, true)
        }
    }
}
function createEnemy (_type: number) {
    mySprite2 = sprites.create(assets.image`Temp`, SpriteKind.Enemy)
    sprites.setDataNumber(mySprite2, "speed", randint(1, 2.000000000000001))
    sprites.setDataNumber(mySprite2, "type", 0)
    animation.runImageAnimation(
    mySprite2,
    assets.animation`alienBomb`,
    200,
    true
    )
    tiles.placeOnRandomTile(mySprite2, assets.tile`myTile2`)
    mySprite2.y += -5
}
function initVars () {
    hard_mode = game.ask("Hard mode?", "A=Sure, B=Nah")
    game2 = false
    debugMode = true
    blaster = debugMode
    bomb = debugMode
    claw = debugMode
    enemyTime = 0
    speeedd = 100
    walls = [
    assets.tile`alienBlue0`,
    assets.tile`alienRed`,
    assets.tile`alienLeaves`,
    assets.tile`alienGreen`,
    assets.tile`sideLadder`,
    assets.tile`alienTween`,
    assets.tile`alienWalkway`,
    assets.tile`doorBlaster`,
    assets.tile`doorBomb`,
    assets.tile`doorClaw`,
    assets.tile`doorCharge`,
    assets.tile`breakableBlock`,
    assets.tile`bombableBlock0`,
    assets.tile`clawableBlock`
    ]
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`tempWin`, function (sprite, location) {
    game.setGameOverMessage(true, "Well Played... Warrior")
    game.setGameOverPlayable(true, music.stringPlayable("D F A G A D E F ", 200), true)
    game.gameOver(true)
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (bomb) {
        music.play(music.melodyPlayable(music.zapped), music.PlaybackMode.InBackground)
        mySprite4 = sprites.create(assets.image`bomb`, SpriteKind.Bomb)
        mySprite4.setPosition(mySprite.x, mySprite.y)
        sprites.setDataNumber(mySprite4, "type", 1)
        sprites.setDataNumber(mySprite4, "time", 10)
        mySprite4.ay = 150
        mySprite4.y += 2
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`objBomb`, function (sprite, location) {
    music.stopAllSounds()
    music.play(music.stringPlayable("G A G F G B - B ", 200), music.PlaybackMode.UntilDone)
    game.splash("You got the Bomb!", "Press Down to drop a Bomb!")
    bomb = true
    tiles.setTileAt(location, assets.tile`transparency8`)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`objSpeed`, function (sprite, location) {
    music.stopAllSounds()
    music.play(music.stringPlayable("G A G F G B - B ", 200), music.PlaybackMode.UntilDone)
    game.splash("You got a speed upgrade!", "You Speed up by 10")
    speeedd += 10
    tiles.setTileAt(location, assets.tile`transparency8`)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`objClaw`, function (sprite, location) {
    music.stopAllSounds()
    music.play(music.stringPlayable("G A G F G B - B ", 200), music.PlaybackMode.UntilDone)
    game.splash("You got the Claw!", "Press B and Up to Launch!")
    claw = true
    tiles.setTileAt(location, assets.tile`transparency8`)
})
scene.onHitWall(SpriteKind.Projectile, function (sprite, location) {
    if (tiles.tileAtLocationEquals(location, assets.tile`breakableBlock`) && sprites.readDataNumber(sprite, "type") == 0) {
        tiles.setTileAt(location, assets.tile`transparency8`)
        tiles.setWallAt(location, false)
    } else if (tiles.tileAtLocationEquals(location, assets.tile`doorBlaster`) && sprites.readDataNumber(sprite, "type") == 0) {
        tiles.setTileAt(location, assets.tile`dmB0`)
        tiles.setWallAt(location, false)
        if (tiles.tileAtLocationEquals(location.getNeighboringLocation(CollisionDirection.Top), assets.tile`doorBlaster`)) {
            tiles.setTileAt(location.getNeighboringLocation(CollisionDirection.Top), assets.tile`dmB0`)
            tiles.setWallAt(location.getNeighboringLocation(CollisionDirection.Top), false)
        } else if (tiles.tileAtLocationEquals(location.getNeighboringLocation(CollisionDirection.Bottom), assets.tile`doorBlaster`)) {
            tiles.setTileAt(location.getNeighboringLocation(CollisionDirection.Bottom), assets.tile`dmB0`)
            tiles.setWallAt(location.getNeighboringLocation(CollisionDirection.Bottom), false)
        }
        timer.after(5000, function () {
            tiles.setTileAt(location, assets.tile`doorBlaster`)
            tiles.setWallAt(location, true)
            if (tiles.tileAtLocationEquals(location.getNeighboringLocation(CollisionDirection.Top), assets.tile`dmB0`)) {
                tiles.setTileAt(location.getNeighboringLocation(CollisionDirection.Top), assets.tile`doorBlaster`)
                tiles.setWallAt(location.getNeighboringLocation(CollisionDirection.Top), true)
            } else if (tiles.tileAtLocationEquals(location.getNeighboringLocation(CollisionDirection.Bottom), assets.tile`dmB0`)) {
                tiles.setTileAt(location.getNeighboringLocation(CollisionDirection.Bottom), assets.tile`doorBlaster`)
                tiles.setWallAt(location.getNeighboringLocation(CollisionDirection.Bottom), true)
            }
        })
    } else if (tiles.tileAtLocationEquals(location, assets.tile`clawableBlock`) && sprites.readDataNumber(sprite, "type") == 2) {
        tiles.setTileAt(location, assets.tile`breakableBlock`)
    } else if (tiles.tileAtLocationEquals(location, assets.tile`doorClaw`) && sprites.readDataNumber(sprite, "type") == 2) {
        tiles.setTileAt(location, assets.tile`dmClaw`)
        tiles.setWallAt(location, false)
        if (tiles.tileAtLocationEquals(location.getNeighboringLocation(CollisionDirection.Top), assets.tile`doorClaw`)) {
            tiles.setTileAt(location.getNeighboringLocation(CollisionDirection.Top), assets.tile`dmClaw`)
            tiles.setWallAt(location.getNeighboringLocation(CollisionDirection.Top), false)
        } else if (tiles.tileAtLocationEquals(location.getNeighboringLocation(CollisionDirection.Bottom), assets.tile`doorClaw`)) {
            tiles.setTileAt(location.getNeighboringLocation(CollisionDirection.Bottom), assets.tile`dmClaw`)
            tiles.setWallAt(location.getNeighboringLocation(CollisionDirection.Bottom), false)
        }
        timer.after(5000, function () {
            tiles.setTileAt(location, assets.tile`doorClaw`)
            tiles.setWallAt(location, true)
            if (tiles.tileAtLocationEquals(location.getNeighboringLocation(CollisionDirection.Top), assets.tile`dmClaw`)) {
                tiles.setTileAt(location.getNeighboringLocation(CollisionDirection.Top), assets.tile`doorClaw`)
                tiles.setWallAt(location.getNeighboringLocation(CollisionDirection.Top), true)
            } else if (tiles.tileAtLocationEquals(location.getNeighboringLocation(CollisionDirection.Bottom), assets.tile`dmClaw`)) {
                tiles.setTileAt(location.getNeighboringLocation(CollisionDirection.Bottom), assets.tile`doorClaw`)
                tiles.setWallAt(location.getNeighboringLocation(CollisionDirection.Bottom), true)
            }
        })
    }
})
function createPlayer () {
    mySprite = sprites.create(assets.image`Player`, SpriteKind.Player)
    mySprite.setStayInScreen(false)
    characterAnimations.loopFrames(
    mySprite,
    assets.animation`PidleR`,
    1000,
    characterAnimations.rule(Predicate.NotMoving, Predicate.FacingRight)
    )
    characterAnimations.loopFrames(
    mySprite,
    assets.animation`PidleL`,
    1000,
    characterAnimations.rule(Predicate.NotMoving, Predicate.FacingLeft)
    )
    characterAnimations.loopFrames(
    mySprite,
    assets.animation`PrunnR`,
    100,
    characterAnimations.rule(Predicate.MovingRight)
    )
    characterAnimations.loopFrames(
    mySprite,
    assets.animation`PrunnL`,
    100,
    characterAnimations.rule(Predicate.MovingLeft)
    )
    characterAnimations.loopFrames(
    mySprite,
    assets.animation`PfallR`,
    200,
    characterAnimations.rule(Predicate.MovingDown, Predicate.FacingRight)
    )
    characterAnimations.loopFrames(
    mySprite,
    assets.animation`PfallR`,
    200,
    characterAnimations.rule(Predicate.MovingUp, Predicate.FacingRight)
    )
    characterAnimations.loopFrames(
    mySprite,
    assets.animation`PfallL`,
    200,
    characterAnimations.rule(Predicate.MovingDown, Predicate.FacingLeft)
    )
    characterAnimations.loopFrames(
    mySprite,
    assets.animation`PfallL`,
    200,
    characterAnimations.rule(Predicate.MovingUp, Predicate.FacingLeft)
    )
    tiles.placeOnRandomTile(mySprite, assets.tile`spawnPoint`)
    mySprite.y += -32
    mySprite.ay = 150
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    sprites.destroy(otherSprite, effects.fire, 500)
    music.play(music.melodyPlayable(music.bigCrash), music.PlaybackMode.InBackground)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (sprites.readDataNumber(otherSprite, "type") == 0) {
        mySprite3 = sprites.create(assets.image`Temp`, SpriteKind.Enemy)
        sprites.setDataNumber(mySprite3, "type", 10)
    }
})
let mySprite3: Sprite = null
let mySprite4: Sprite = null
let enemyTime = 0
let bomb = false
let debugMode = false
let hard_mode = false
let mySprite2: Sprite = null
let walls: Image[] = []
let speeedd = 0
let projectile: Sprite = null
let mySprite: Sprite = null
let blaster = false
let claw = false
let game2 = false
game.setDialogCursor(assets.image`icon`)
game.setDialogFrame(img`
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    `)
scene.setBackgroundImage(assets.image`Thing`)
game.showLongText("", DialogLayout.Bottom)
scene.setBackgroundImage(img`
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    `)
initVars()
createWorld(false)
game2 = true
createPlayer()
game.onUpdate(function () {
    scene.centerCameraAt(mySprite.x, mySprite.y - 15)
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        value.ay = 150
        value.setVelocity((mySprite.x - value.x) * sprites.readDataNumber(value, "speed"), value.ay)
    }
    for (let value of tiles.getTilesByType(assets.tile`onewayFloor`)) {
        if (mySprite.y < value.y) {
            tiles.setWallAt(value, true)
        } else {
            tiles.setWallAt(value, false)
        }
    }
    for (let value of sprites.allOfKind(SpriteKind.Projectile)) {
        for (let col = 0; col <= 2; col++) {
            for (let row = 0; row <= 2; row++) {
                if (sprites.readDataNumber(value, "type") == 1) {
                    if (tiles.tileAtLocationEquals(tiles.getTileLocation(value.tilemapLocation().column + (col - 1), value.tilemapLocation().row + (row - 1)), assets.tile`bombableBlock0`)) {
                        tiles.setTileAt(tiles.getTileLocation(value.tilemapLocation().column + (col - 1), value.tilemapLocation().row + (row - 1)), assets.tile`transparency8`)
                        tiles.setWallAt(tiles.getTileLocation(value.tilemapLocation().column + (col - 1), value.tilemapLocation().row + (row - 1)), false)
                    }
                    if (tiles.tileAtLocationEquals(tiles.getTileLocation(value.tilemapLocation().column + (col - 1), value.tilemapLocation().row + (row - 1)), assets.tile`doorBomb`)) {
                        tiles.setTileAt(tiles.getTileLocation(value.tilemapLocation().column + (col - 1), value.tilemapLocation().row + (row - 1)), assets.tile`dmBomb0`)
                        tiles.setWallAt(tiles.getTileLocation(value.tilemapLocation().column + (col - 1), value.tilemapLocation().row + (row - 1)), false)
                        timer.after(5000, function () {
                            if (tiles.tileAtLocationEquals(tiles.getTileLocation(value.tilemapLocation().column + (col - 1), value.tilemapLocation().row + (row - 1)), assets.tile`dmBomb0`)) {
                                tiles.setTileAt(tiles.getTileLocation(value.tilemapLocation().column + (col - 1), value.tilemapLocation().row + (row - 1)), assets.tile`doorBomb`)
                                tiles.setWallAt(tiles.getTileLocation(value.tilemapLocation().column + (col - 1), value.tilemapLocation().row + (row - 1)), true)
                            }
                        })
                    }
                }
            }
        }
    }
    for (let value of sprites.allOfKind(SpriteKind.Bomb)) {
        sprites.changeDataNumberBy(value, "time", -1)
        if (sprites.readDataNumber(value, "time") == 0) {
            value.setFlag(SpriteFlag.Ghost, true)
            value.ay = 0
            value.y += -7
            animation.runImageAnimation(
            value,
            assets.animation`Boom`,
            100,
            false
            )
            value.x += -7
            value.setKind(SpriteKind.Projectile)
            timer.after(500, function () {
                sprites.destroy(value)
            })
        }
    }
    if (tiles.tileAtLocationEquals(mySprite.tilemapLocation(), assets.tile`Ladder`)) {
        controller.moveSprite(mySprite, speeedd, speeedd)
    } else {
        controller.moveSprite(mySprite, speeedd, 0)
    }
})
forever(function () {
    music.play(music.stringPlayable("D - D D E F C - ", 230), music.PlaybackMode.UntilDone)
    music.play(music.stringPlayable("D - D D E F F E ", 230), music.PlaybackMode.UntilDone)
})
