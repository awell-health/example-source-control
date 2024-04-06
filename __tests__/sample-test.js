const steps = require("../steps/steps.json");
const actions = require("../actions/actions.json");
describe("Sample test", () => {
  it("should pass", () => {
    expect(1).toBe(1);
  });
  it("expect there to be only a single step", async () => {
    expect(steps.length).toBe(1);
  });
  it("expect only two actions in the step", async () => {
    expect(steps[0].step.action_definition_ids.length).toBe(2);
  });
  it("expect the first action to be a form", async () => {
    const actionDefinitionId = steps[0].step.action_definition_ids[0];
    const actionDefinition = actions.find(
      (a) => a.action.definition_id === actionDefinitionId
    );
    expect(actionDefinition.action.type).toBe("form");
  });
});
