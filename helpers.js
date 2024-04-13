const transitions = require("./transitions/transitions.json");
const steps = require("./steps/steps.json");
const actions = require("./actions/actions.json");
const tracks = require("./tracks/tracks.json");
const rules = require("./rules/rules.json");
const datapointDefinitions = require("./data_point_definitions/data_point_definitions.json");

const transition = ({ from, to }) => {
  const fromKey = from[from.type]._key;
  const toKey = to[to.type]._key;
  const transition = transitions.find(
    (t) =>
      t.transition.origin.node_id === fromKey &&
      t.transition.destination.node_id === toKey
  );
  return transition;
};

const trackByTitle = (title) => tracks.find((t) => t.track.title === title);
const stepByTitle = (title) => steps.find((s) => s.step.title === title);
const actionByTitle = (title) => actions.find((a) => a.action.title === title);
const ruleFromTransition = (transition) => {
  const foundRule = rules.find(
    (r) => r.rule._key === transition.transition.rule_definition_id
  );
  if (!foundRule) {
    throw new Error(
      `No rule found with rule_definition_id: ${foundTransition.transition.rule_definition_id}`
    );
  }
  return foundRule;
};
const variableByTitle = (title) =>
  variables.find((v) => v.variable.label === title);

const datapointFromRuleCondition = (condition) => {
  return datapointDefinitions.find(
    (d) => d.data_point_definition._key === condition.reference
  );
};

module.exports = {
  transition,
  stepByTitle,
  actionByTitle,
  trackByTitle,
  ruleFromTransition,
  variableByTitle,
  datapointFromRuleCondition,
};
