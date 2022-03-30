// eslint-disable-next-line no-unused-vars
import {Fighter, Pokemon, Stats, statsIndex, DragonBall, ArknightOperator, FateServant} from './fighter';
/**
 * Clase combate que contiene a dos fighters que pelearan cuando se invoque start(), contiene
 * metodos necesarios para llevar a cabo el combate adecuadamente, el combate se informara por pantalla.
 */
export class Combat {
  /**
   *
   * @param fighterA Atributo de la clase que debe ser un objecto Fighter, atacara primero
   * @param fighterB Atributo de la clase que debe ser un objecto Fighter
   */
  constructor(private fighterA: Fighter, private fighterB: Fighter) {
  }
  /**
   * Comienza el combate entre los Fighters que se encuentran en los atributos de la clase,
   * comienza el primero declarado y se van turnando, entran en efecto el ataque, los hp, la defensa y el tipo.
   * \Todo el combate se muestra por pantalla con barra de vida por texto.
   * @returns Numero que indica quien es el ganador (irrelevante ya que se trata por la salida de pantalla)
   */
  start(): number {
    // Stats Basicas : Nombre, Peso, Altura, Tipo, [Ataque, defensa, velocidad, hp]

    let fighterIsOut: boolean = false;
    let fighterWinner: number = 0;
    let fighterBCurrentHp: number = ((this.fighterB.getStats())[statsIndex.hp]);
    let fighterACurrentHp: number = ((this.fighterA.getStats())[statsIndex.hp]);
    const fighterAHpPerBlock: number = (this.fighterA.getStats())[statsIndex.hp]/20;
    const fighterBHpPerBlock: number = (this.fighterB.getStats())[statsIndex.hp]/20;
    const fighterAStartHp: number = (this.fighterA.getStats())[statsIndex.hp];
    const fighterBStartHp: number = (this.fighterB.getStats())[statsIndex.hp];
    const fighterAName: string = this.fighterA.getName();
    const fighterBName: string = this.fighterB.getName();
    const fighterACatchPhrase: string = this.fighterA.getCatchPhrase();
    const fighterBCatchPhrase: string = this.fighterB.getCatchPhrase();
    let turn: string = 'A';
    let turnNumber: number = 0;
    // eslint-disable-next-line max-len
    console.log(`fighterA: ${fighterAName} \nTipo: ${this.fighterA.getType()} \n Stats: \n  Ataque: ${this.fighterA.getStats()[statsIndex.ataque]} \n  Defensa: ${this.fighterA.getStats()[statsIndex.defensa]}`);
    // eslint-disable-next-line max-len
    console.log(`  Velocidad: ${this.fighterA.getStats()[statsIndex.velocidad]} \n  Hp: ${this.fighterA.getStats()[statsIndex.hp]}`);

    // eslint-disable-next-line max-len
    console.log(`fighterB: ${fighterBName} \nTipo: ${this.fighterB.getType()} \n Stats: \n  Ataque: ${this.fighterB.getStats()[statsIndex.ataque]} \n  Defensa: ${this.fighterB.getStats()[statsIndex.defensa]}`);
    // eslint-disable-next-line max-len
    console.log(`  Velocidad: ${this.fighterB.getStats()[statsIndex.velocidad]} \n  Hp: ${this.fighterB.getStats()[statsIndex.hp]}`);
    console.log(`----Comienza la batalla entre ${fighterAName} y ${fighterBName}-----`);
    let dummy: string = ``;
    let counter: number = 0;
    let dmg: number = 0;
    while (!fighterIsOut) {
      fighterBCurrentHp = ((this.fighterB.getStats())[statsIndex.hp]);
      fighterACurrentHp = ((this.fighterA.getStats())[statsIndex.hp]);
      counter = 0;
      dummy = ``;
      if (fighterACurrentHp > 0 && fighterBCurrentHp > 0) {
        turnNumber++;
        switch (turn) {
          case 'A':
            dmg = this.dmgCalculator(this.fighterA, this.fighterB);
            console.log(`\n  Turno: ${turnNumber}    #${fighterAName} ataca a ${fighterBName}# \n`);
            console.log(`    #${fighterAName}: ${fighterACatchPhrase}#    `);
            console.log(`¡${fighterBName} recibe ${Math.round(dmg)} de daño!`);
            this.fighterB.setHp(fighterBCurrentHp-dmg);
            fighterBCurrentHp = ((this.fighterB.getStats())[statsIndex.hp]);
            fighterACurrentHp = ((this.fighterA.getStats())[statsIndex.hp]);
            turn = 'B';
            for (let i = 0; i < Math.round(fighterACurrentHp/fighterAHpPerBlock); i++) {
              dummy += `\x1b[32m■\x1b[0m`;
              counter++;
            }
            if (counter < 20) {
              while (counter < 20) {
                dummy += `\x1b[31m■\x1b[0m`;
                counter++;
              }
            }
            // eslint-disable-next-line max-len
            console.log(`Vida de ${fighterAName}: `+dummy +` `+ Math.round(fighterACurrentHp) + `/` +fighterAStartHp+ `hp`);
            dummy = ``;
            counter = 0;
            for (let i = 0; i < Math.round(fighterBCurrentHp/fighterBHpPerBlock); i++) {
              dummy += `\x1b[32m■\x1b[0m`;
              counter++;
            }
            if (counter < 20) {
              while (counter < 20) {
                dummy += `\x1b[31m■\x1b[0m`;
                counter++;
              }
            }
            // eslint-disable-next-line max-len
            console.log(`Vida de ${fighterBName}: `+ dummy +` `+ Math.round(fighterBCurrentHp) + `/` +fighterBStartHp+ `hp`);
            break;
          case 'B':
            dmg = this.dmgCalculator(this.fighterB, this.fighterA);
            console.log(`\n  Turno: ${turnNumber}    #${fighterBName} ataca a ${fighterAName}# \n`);
            console.log(`    #${fighterBName}: ${fighterBCatchPhrase}#    `);
            console.log(`¡${fighterAName} recibe ${Math.round(dmg)} de daño!`);
            this.fighterA.setHp(fighterACurrentHp-dmg);
            turn = 'A';
            fighterBCurrentHp = ((this.fighterB.getStats())[statsIndex.hp]);
            fighterACurrentHp = ((this.fighterA.getStats())[statsIndex.hp]);
            for (let i = 0; i < Math.round(fighterACurrentHp/fighterAHpPerBlock); i++) {
              dummy += `\x1b[32m■\x1b[0m`;
              counter++;
            }
            if (counter < 20) {
              while (counter < 20) {
                dummy += `\x1b[31m■\x1b[0m`;
                counter++;
              }
            }
            // eslint-disable-next-line max-len
            console.log(`Vida de ${fighterAName}: `+dummy +` `+ Math.round(fighterACurrentHp) + `/` +fighterAStartHp+ `hp`);
            dummy = ``;
            counter = 0;
            for (let i = 0; i < Math.round(fighterBCurrentHp/fighterBHpPerBlock); i++) {
              dummy += `\x1b[32m■\x1b[0m`;
              counter++;
            }
            if (counter < 20) {
              while (counter < 20) {
                dummy += `\x1b[31m■\x1b[0m`;
                counter++;
              }
            }
            // eslint-disable-next-line max-len
            console.log(`Vida de ${fighterBName}: `+dummy +` `+ Math.round(fighterBCurrentHp) + `/` +fighterBStartHp+ `hp`);
            break;
        }
      } else {
        if (((this.fighterB.getStats())[statsIndex.hp]) <= 0) {
          fighterIsOut = true;
          fighterWinner = 1;
        }
        if (((this.fighterA.getStats())[statsIndex.hp] <= 0)) {
          fighterIsOut = true;
          fighterWinner = 2;
        }
      }
    }
    if (fighterWinner == 1) {
      console.log(`\n¡¡¡Ha ganado ${fighterAName} en ${turnNumber} turnos!!!`);
    }
    if (fighterWinner == 2) {
      console.log(`\n¡¡¡Ha ganado ${fighterBName} en ${turnNumber} turnos!!!`);
    }
    return fighterWinner;
  }
  /**
   * Funcion adaptada de la P3-Ej8 en la que recibe ahora dos Fighters y calcula el daño que hace el primero al tercero dado unas estadisticas
   * @param fighterA Objecto de la clase Fighter con caracteristicas propias
   * @param fighterB Objecto de la clase Fighter con caracteristicas propias
   * @returns Daño calculado segun el tipo del Fighter, stats mediante una formula proporcionada
   */
  dmgCalculator(fighterA:Fighter, fighterB:Fighter): number {
    // eslint-disable-next-line max-len
    return (50*(fighterA.getStats()[statsIndex.ataque]/fighterB.getStats()[statsIndex.defensa])*this.getEffectivity(fighterA, fighterB));
  }
  /**
   * Funcion utilizada por el calculador de daño entre Fighters para obtener el multiplicador de efectividad segun el tipo de Fighter que ataca al otro
   * @param fighterA Objecto de la clase Fighter con caracteristicas propias
   * @param fighterB Objecto de la clase Fighter con caracteristicas propias
   * @returns Numero indice de la eficacia del ataque del fighterA a fighterB
   */
  getEffectivity(fighterA:Fighter, fighterB:Fighter): number {
    if (fighterA instanceof Pokemon) {
      if (fighterB instanceof Pokemon) {
        switch (fighterA.getType()) {
          case `fuego`:
            switch (fighterB.getType()) {
              case `fuego`:
                return 1;
              case `hierba`:
                return 2;
              case `agua`:
                return 0.5;
              case `electrico`:
                return 1;
            }
          case `hierba`:
            switch (fighterB.getType()) {
              case `fuego`:
                return 0.5;
              case `hierba`:
                return 1;
              case `agua`:
                return 2;
              case `electrico`:
                return 1;
            }
          case `agua`:
            switch (fighterB.getType()) {
              case `fuego`:
                return 2;
              case `hierba`:
                return 0.5;
              case `agua`:
                return 1;
              case `electrico`:
                return 0.5;
            }
          case `electrico`:
            switch (fighterB.getType()) {
              case `fuego`:
                return 1;
              case `hierba`:
                return 1;
              case `agua`:
                return 2;
              case `electrico`:
                return 1;
            }
        }
      }
      if (fighterB instanceof DragonBall) {
        return 0.3;
      }
      if (fighterB instanceof FateServant) {
        return 0.1;
      }
      if (fighterB instanceof ArknightOperator) {
        return 0.2;
      }
    }
    if (fighterA instanceof DragonBall) {
      if (fighterB instanceof DragonBall) {
        switch (fighterA.getType()) {
          case `saiyan`:
            switch (fighterB.getType()) {
              case `saiyan`:
                return 1;
              case `mutant`:
                return 2;
            }
          case `mutant`:
            switch (fighterB.getType()) {
              case `saiyan`:
                return 0.5;
              case `mutant`:
                return 1;
            }
        }
      }
      if (fighterB instanceof Pokemon) {
        return 5;
      }
      if (fighterB instanceof FateServant) {
        return 0.75;
      }
      if (fighterB instanceof ArknightOperator) {
        return 1;
      }
    }
    if (fighterA instanceof FateServant) {
      if (fighterB instanceof FateServant) {
        switch (fighterA.getType()) {
          case `saber`:
            switch (fighterB.getType()) {
              case `lancer`:
                return 2;
              case `archer`:
                return 0.5;
              case `saber`:
                return 1;
              case `berserker`:
                return 2;
            }
          case `lancer`:
            switch (fighterB.getType()) {
              case `saber`:
                return 0.5;
              case `archer`:
                return 2;
              case `lancer`:
                return 1;
              case `berserker`:
                return 2;
            }
          case `archer`:
            switch (fighterB.getType()) {
              case `archer`:
                return 1;
              case `saber`:
                return 2;
              case `lancer`:
                return 0.5;
              case `berserker`:
                return 2;
            }
          case `berserker`:
            switch (fighterB.getType()) {
              case `saber`:
                return 1.5;
              case `lancer`:
                return 1.5;
              case `archer`:
                return 1.5;
              case `berserker`:
                return 1.5;
            }
        }
      }
      if (fighterB instanceof DragonBall) {
        return 1;
      }
      if (fighterB instanceof Pokemon) {
        return 3;
      }
      if (fighterB instanceof ArknightOperator) {
        return 1.1;
      }
    }
    if (fighterA instanceof ArknightOperator) {
      if (fighterB instanceof ArknightOperator) {
        switch (fighterA.getType()) {
          case `sniper`:
            switch (fighterB.getType()) {
              case `sniper`:
                return 1;
              case `caster`:
                return 2;
              case `guard`:
                return 1;
              case `specialist`:
                return 1;
            }
          case `specialist`:
            switch (fighterB.getType()) {
              case `sniper`:
                return 1;
              case `caster`:
                return 1;
              case `guard`:
                return 2;
              case `specialist`:
                return 0.5;
            }
          case `guard`:
            switch (fighterB.getType()) {
              case `sniper`:
                return 0.5;
              case `caster`:
                return 0.5;
              case `guard`:
                return 1;
              case `specialist`:
                return 0.7;
            }
          case `caster`:
            switch (fighterB.getType()) {
              case `sniper`:
                return 1;
              case `caster`:
                return 1;
              case `guard`:
                return 2;
              case `specialist`:
                return 0.5;
            }
        }
      }
      if (fighterB instanceof DragonBall) {
        return 0.7;
      }
      if (fighterB instanceof Pokemon) {
        return 2;
      }
      if (fighterB instanceof FateServant) {
        return 0.9;
      }
    }
    return 0;
  }
}
