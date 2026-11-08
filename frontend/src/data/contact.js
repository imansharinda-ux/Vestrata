export const CONTACT_EMAIL = "hello@vestrata.io";

export const contactTopics = [
  {
    value: "question",
    label: "A question",
    hint: "How can we help? For example: how is cash flow worked out?",
    needsAddress: false,
  },
  {
    value: "problem",
    label: "Report a problem",
    hint: "What happened, and on which page? What did you expect instead?",
    needsAddress: true,
  },
  {
    value: "data",
    label: "Wrong numbers or data",
    hint: "Which number looks wrong, and what do you think it should be?",
    needsAddress: true,
  },
  {
    value: "feedback",
    label: "Feedback or idea",
    hint: "What would make Vestrata more useful for you?",
    needsAddress: false,
  },
];

export const MESSAGE_MAX_LENGTH = 1000;
export const MESSAGE_MIN_LENGTH = 10;
export const MESSAGE_WARNING_LENGTH = 900;
export const SEND_DELAY_MS = 900;
