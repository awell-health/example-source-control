const steps = require("../steps/steps.json");
const actions = require("../actions/actions.json");
const tracks = require("../tracks/tracks.json");
describe("Default track", () => {
  const track = tracks.find((t) => t.track.title === "Default track");
  const stepOne = steps.find((s) => s.step.title === "step 1");

  it("Default track exists", async () => {
    expect(track).toBeDefined();
  });

  describe("Step 1", () => {
    const actionIds = stepOne.step.action_definition_ids;
    const stepActions = actionIds.map((id) =>
      actions.find((a) => a.action.definition_id === id)
    );

    it("step 1 exists", () => {
      expect(stepOne).toBeDefined();
    });

    it("step 1 action order", async () => {
      /**
       * the actions in the first step:
       * 1. create a form
       * 2. perform a calculation
       * 3. send the calculation result to elation
       */

      expect(stepActions.length).toBe(3);
      expect(stepActions[0].action.type).toBe("form");
      expect(stepActions[1].action.type).toBe("calculation");
      expect(stepActions[2].action.type).toBe("plugin");
    });
  });
});
