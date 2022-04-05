import * as inquirer from 'inquirer';

export class Question {
  constructor(
    private type: string,
    private name: string,
    private message: string,
    private question: Object = {},
    private funct: Function = () => {},
  ) {
    this.type = type;
    this.name = name;
    this.message = message;
    this.question = {};
  }

  /**
   * Get the question type.
   * @returns type
   */
  public getType(): string {
    return this.type;
  }

  /**
   * Set the type.
   * @param type type
   * @returns type
   */
  public setType(type: string): void {
    this.type = type;
  }
  public returnQuestion():Object {
    const objeto: {
      type: string,
      name:string,
      message:string,
    } = {
      type: this.type,
      name: this.name,
      message: this.message,
    };
    return objeto;
  }
  /**
   * Get the question name.
   * @returns name
   */
  public getName(): string {
    return this.name;
  }

  /**
   * Set the name.
   * @param name Name
   * @returns name
   */
  public setName(name: string): void {
    this.name = name;
  }

  /**
   * Get the question message.
   * @returns message
   */
  public getMessage(): string {
    return this.message;
  }

  /**
   * Set the message.
   * @param message message
   * @returns message
   */
  public setMessage(message: string): void {
    this.message = message;
  }
}
