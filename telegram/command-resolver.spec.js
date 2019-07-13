const { CommandResolver, Iterator } = require("./command-resolver");
const { Command } = require("./bot-command");

describe("CommandResolver", () => {
  /** @type {CommandResolver} */
  let commandResolver = null;

  beforeEach(() => {
    commandResolver = new CommandResolver();
  });

  it("should create new command resolver", () => {
    expect(commandResolver).toBeInstanceOf(CommandResolver);
    expect(commandResolver.resolvers).toBeDefined();
  });

  it("should add new resolvers properly", () => {
    const resolverCallback = jest.fn();
    const commandType = "custom_command";

    commandResolver.resolve(commandType, resolverCallback);

    expect(commandResolver.resolvers[commandType]).toBeInstanceOf(Iterator);
    expect(commandResolver.resolvers[commandType].items).toHaveLength(1);
  });

  // one resolver
  it("should run a single resolver properly", () => {
    const commandType = "custom_command";
    const commandParams = "custom_params";
    const command = new Command(commandType, commandParams);

    let nextRef = null;

    const resolverCallback = jest.fn(next => {
      nextRef = next;
    });

    commandResolver.resolve(commandType, resolverCallback);

    commandResolver.run(command);

    expect(resolverCallback).toBeCalled();
    expect(resolverCallback).toBeCalledWith(nextRef, commandParams);
  });

  // two resolvers (default params)
  it("should run multiple resolvers with initial params", () => {
    const commandType = "custom_command";
    const commandParams = "custom_params";
    const command = new Command(commandType, commandParams);

    let nextRef = null;

    const resolverCallback1 = jest.fn(next => {
      nextRef = next;
    });

    const resolverCallback2 = jest.fn(next => {
      nextRef = next;
    });

    commandResolver.resolve(commandType, resolverCallback1);
    commandResolver.resolve(commandType, resolverCallback2);

    commandResolver.run(command);
    expect(commandResolver.resolvers[commandType].items).toHaveLength(2);
    expect(resolverCallback1).toBeCalledTimes(1);
    expect(resolverCallback2).toBeCalledTimes(1);

    expect(resolverCallback1).toBeCalledWith(nextRef, commandParams);
    expect(resolverCallback2).toBeCalledWith(nextRef, commandParams);
  });

  // two resolvers (one has params from another)
  it("should run multiple resolvers with initial params", () => {
    const commandType = "custom_command";
    const commandParams = "custom_params";
    const reassignedParam = "reassigned_param";
    const command = new Command(commandType, commandParams);

    let nextRef = null;

    const resolverCallback1 = jest.fn(next => {
      next(reassignedParam);
    });

    const resolverCallback2 = jest.fn(next => {
      nextRef = next;
    });

    commandResolver.resolve(commandType, resolverCallback1);
    commandResolver.resolve(commandType, resolverCallback2);

    commandResolver.run(command);
    expect(commandResolver.resolvers[commandType].items).toHaveLength(2);
    expect(resolverCallback1).toBeCalledTimes(1);
    expect(resolverCallback2).toBeCalledTimes(1);

    expect(resolverCallback1).toBeCalledWith(nextRef, commandParams);
    expect(resolverCallback2).toBeCalledWith(nextRef, reassignedParam);
  });

  it("should resolve multiple commands properly", () => {
    const command1 = new Command("custom_command1", "abc");
    const command2 = new Command("custom_command2", "abc");

    const resolverCallback1 = jest.fn();
    const resolverCallback2 = jest.fn();

    commandResolver.resolve(command1.command, resolverCallback1);
    commandResolver.resolve(command2.command, resolverCallback2);

    expect(commandResolver.resolvers).toHaveProperty(command1.command);
    expect(commandResolver.resolvers).toHaveProperty(command2.command);

    commandResolver.run(command1);

    expect(resolverCallback1).toBeCalled();
    expect(resolverCallback2).not.toBeCalled();

    commandResolver.run(command2);

    expect(resolverCallback2).toBeCalled();

    commandResolver.run(command1);

    expect(resolverCallback1).toBeCalledTimes(2);
  });
});
