/**
 * @class Model a question from the inquirer module.
 */
export class Question {
  private question: Object = {};

  /**
   * Initilize an inquirer model object.
   * @param {string} type Type of the prompt
   * @param {string} name Name of the assign value answered
   * @param {string} message Message of the object
   * @param {Function} funct Function that executes after the message
   * @param {string[]} choices Choice to make
   */
  constructor(
    private type: string,
    private name: string,
    private message: string,
    private funct: Function = () => {},
    private choices: string[] = [],
  ) {
    this.type = type;
    this.name = name;
    this.message = message;
    this.funct = funct;
    this.choices = choices;
  }

  /**
   * Get the question type.
   * @returns {string} type
   */
  public getType(): string {
    return this.type;
  }

  /**
   * Set the type.
   * @param {string} type type
   */
  public setType(type: string): void {
    this.type = type;
  }

  /**
   * Returns a question.
   * @param {boolean} returnFunction return of the function
   * @param {boolean} choices Choice to make
   * @returns {Object} Object result.
   */
  public returnQuestion(returnFunction: boolean = false, choices: boolean = false): Object {
    if (!choices) {
      if (this.funct.toString() === (() => {}).toString() || !returnFunction) {
        const object1: {
          type: string,
          name:string,
          message:string,
        } = {
          type: this.type,
          name: this.name,
          message: this.message,
        };
        return object1;
      } else {
        const object2: {
          type: string,
          name:string,
          message:string,
          validate: Function,
        } = {
          type: this.type,
          name: this.name,
          message: this.message,
          validate: this.funct,
        };
        return object2;
      }
    } else {
      if (this.funct.toString() === (() => {}).toString() || !returnFunction) {
        const object3: {
          type: string,
          name: string,
          message: string,
          choices: string[],
        } = {
          type: this.type,
          name: this.name,
          message: this.message,
          choices: this.choices,
        };
        return object3;
      } else {
        const object4: {
          type: string,
          name:string,
          message:string,
          choices: string[],
          validate: Function,
        } = {
          type: this.type,
          name: this.name,
          message: this.message,
          choices: this.choices,
          validate: this.funct,
        };
        return object4;
      }
    }
  }

  /**
   * Get the question name.
   * @returns {string} name
   */
  public getName(): string {
    return this.name;
  }

  /**
   * Set the name.
   * @param {string} name Name
   */
  public setName(name: string): void {
    this.name = name;
  }

  /**
   * Get the question message.
   * @returns {string} message
   */
  public getMessage(): string {
    return this.message;
  }

  /**
   * Set the message.
   * @param {string} message message
   */
  public setMessage(message: string): void {
    this.message = message;
  }
}
