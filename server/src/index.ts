import fastify from 'fastify';
import jwt from '@fastify/jwt'
import cors from '@fastify/cors';
import _ from 'lodash';
import { TPaginationProps, TPaginationResponse, TSortProps } from 'types';

const server = fastify();
server.register(jwt, { secret: 'secret' });
server.register(cors, {
  origin: "*",
  allowedHeaders: "*",
  methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
  preflightContinue: true,
});

const users = [...Array(20)].map((_, i) => ({ id: i + 1, name: `user${i + 1}`, age: i }));

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const paginationUsers = (paginationProps: TPaginationProps & TSortProps): {
  data: typeof users,
  totalItems: number;
  totalPages: number;
  page: number;
} => {
  const props = {
    page: paginationProps.page ?? 0,
    take: paginationProps.take ?? 1,
    sortBy: paginationProps.sortBy,
    sortType: paginationProps.sortType ?? "asc",
  }
  let items = [...users];
  if (props.sortBy) {
    const key = props.sortBy;
    items.sort((a, b) => {
      const prev = paginationProps.sortType === "asc" ? 1 : -1;
      const next = paginationProps.sortType === "desc" ? 1 : -1;
      const aItem = a[key];
      const bItem = b[key];
      return aItem > bItem ? prev : next;
    });
  }
  const chunks = _.chunk(items, paginationProps.take);
  items = chunks[props.page];

  return {
    page: props.page,
    totalItems: users.length,
    totalPages: chunks.length,
    data: items,
  }
}

server.get<{
  Querystring: TPaginationProps & TSortProps
}>('/users', async (req, reply) => {
  await sleep(1000);
  return reply.status(200).send(paginationUsers(req.query));
});


server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})