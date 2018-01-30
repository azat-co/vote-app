/**
 * @flow
 * @relayHash 1df3ee92e0ef39a53046477647d6f081
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type VoteMutationVariables = {|
  input: {
    description?: ?string;
    id: string;
    status?: ?"Proposal" | "Published" | "Draft" | "Rejected" | "OnHold";
    title?: ?string;
    votes?: ?number;
    clientMutationId: string;
  };
|};
export type VoteMutationResponse = {|
  +updateTopic: ?{|
    +topic: ?{|
      +id: string;
      +title: string;
      +description: string;
      +votes: number;
    |};
  |};
|};
*/


/*
mutation VoteMutation(
  $input: UpdateTopicInput!
) {
  updateTopic(input: $input) {
    topic {
      id
      title
      description
      votes
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
        "type": "UpdateTopicInput!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "VoteMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "UpdateTopicInput!"
          }
        ],
        "concreteType": "UpdateTopicPayload",
        "name": "updateTopic",
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
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "votes",
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
  "name": "VoteMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "UpdateTopicInput!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "VoteMutation",
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
            "type": "UpdateTopicInput!"
          }
        ],
        "concreteType": "UpdateTopicPayload",
        "name": "updateTopic",
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
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "votes",
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
  "text": "mutation VoteMutation(\n  $input: UpdateTopicInput!\n) {\n  updateTopic(input: $input) {\n    topic {\n      id\n      title\n      description\n      votes\n    }\n  }\n}\n"
};

module.exports = batch;
