const steps = require("../steps/steps.json");
const actions = require("../actions/actions.json");
const tracks = require("../tracks/tracks.json");
const {
  transition,
  stepByTitle,
  trackByTitle,
  actionByTitle,
  ruleFromTransition,
  datapointFromRuleCondition,
} = require("../helpers");
const { RuleCondition } = require("../enums");

describe("Default track", () => {
  const defaultTrack = trackByTitle("Default track");
  const stepOne = stepByTitle("step 1");

  it("Default track exists", async () => {
    expect(defaultTrack).toBeDefined();
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
       * 1. get patient information
       * 2. patient completes the phq-9
       * 3. perform a calculation
       * 4. send the calculation result to the EHR
       */

      expect(stepActions.length).toBe(6);
      expect(stepActions[0].action.type).toBe("plugin");
      expect(stepActions[1].action.type).toBe("message");
      expect(stepActions[2].action.type).toBe("checklist");
      expect(stepActions[3].action.type).toBe("form");
      expect(stepActions[4].action.type).toBe("calculation");
      expect(stepActions[5].action.type).toBe("plugin");
    });
  });
  describe("Transition from step 1 to step 2", () => {
    const stepTwo = steps.find((s) => s.step.title === "PHQ-9 over 10");
    it("step 2 exists", () => {
      expect(stepTwo).toBeDefined();
    });
    it("step 1 to step 2 transition exists", () => {
      const stepOneToTwo = transition({ from: stepOne, to: stepTwo });
      expect(stepOneToTwo).toBeDefined();
    });
    it("phq-9 rule is implemented", () => {
      const stepOneToTwo = transition({ from: stepOne, to: stepTwo });
      const phqRule = ruleFromTransition(stepOneToTwo);
      expect(phqRule).toBeDefined();
      const phq9Conditions = phqRule.rule.conditions.filter(
        (c) => c.reference === "phq_9.PHQ9_SCORE"
      );
      expect(phq9Conditions.length).toBe(1);
      expect(phq9Conditions[0].operator).toBe(
        RuleCondition.GREATHER_THAN_OR_EQUAL
      );
      expect(Number(phq9Conditions[0].operand.value)).toBe(10);
      const scoreDatapoint = datapointFromRuleCondition(phq9Conditions[0]);
      expect(scoreDatapoint).toBeDefined();
    });
  });
});
