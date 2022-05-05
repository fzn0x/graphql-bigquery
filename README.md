# graphql-bigquery

## Setup the project

```sh
gcloud auth login

gcloud functions deploy helloWorld --trigger-http --runtime=nodejs8 --project=master-bruin-344906 --entry-point handler --runtime nodejs14
```

## Usage examples

### Defining query

```
query Query ($projectId: String, $dataset: String, $table: String, $fields: [String]) {
  transactions(projectId: $projectId, dataset: $dataset, table: $table, fields: $fields)
}
```

### Defining variables

```
{
  "projectId": "master-bruin-344906",
  "dataset": "blockchain_data",
  "table": "bscscan_bep20_transactions",
  "fields": ["blockchain", "game"]
}
```