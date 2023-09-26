// import { gql, GraphQLClient } from 'graphql-request'

const endpoint = 'https://graphql.datocms.com/'

export const performRequest = async ({
  query,
  variables = {},
  includeDrafts = false,
}) => {
  const response = await fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_DATO_API_KEY}`,
      ...(includeDrafts ? { 'X-Include-Drafts': 'true' } : {}),
    },
    method: 'POST',
    body: JSON.stringify({ query, variables }),
  })

  const responseBody = await response.json()

  if (!response.ok) {
    throw new Error(
      `${response.status} ${response.statusText}: ${JSON.stringify(
        responseBody
      )}`
    )
  }

  return responseBody
}
