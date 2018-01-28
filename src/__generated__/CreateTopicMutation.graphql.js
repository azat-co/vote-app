/**
 * @flow
 * @relayHash 94ea2664e386c99092fb46bd1e0ccc6a
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type CreateTopicMutationVariables = {|
  input: {
    description: string;
    status: "Proposal" | "Published" | "Draft" | "Rejected" | "OnHold";
    title?: ?string;
    votes?: ?number;
    clientMutationId: string;
  };
|};
export type CreateTopicMutationResponse = {|
  +createTopic: ?{|
    +topic: ?{|
      +id: string;
      +title: string;
      +description: string;
    |};
  |};
|};
*/


/*
mutation CreateTopicMutation(
  $input: CreateTopicInput!
) {
  createTopic(input: $input) {
    topic {
      id
      title
      description
    }
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "CreateTopicInput!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateTopicMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "CreateTopicInput!"
          }
        ],
        "concreteType": "CreateTopicPayload",
        "name": "createTopic",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "Topic",
            "name": "topic",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "id",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "title",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "description",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "CreateTopicMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "CreateTopicInput!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "CreateTopicMutation",
    "operation": "mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "CreateTopicInput!"
          }
        ],
        "concreteType": "CreateTopicPayload",
        "name": "createTopic",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "Topic",
            "name": "topic",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "id",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "title",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "description",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "mutation CreateTopicMutation(\n  $input: CreateTopicInput!\n) {\n  createTopic(input: $input) {\n    topic {\n      id\n      title\n      description\n    }\n  }\n}\n"
};

module.exports = batch;
