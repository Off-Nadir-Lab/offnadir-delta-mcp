#!/usr/bin/env node
/**
 * Off-Nadir Delta — stdio MCP server (thin proxy).
 *
 * A self-hostable, local (stdio) Model Context Protocol server that exposes the
 * Off-Nadir Delta event-intelligence tools and forwards every call to the hosted
 * remote server at https://offnadir-delta.com/api/v1/mcp using your API key.
 *
 * Why a proxy instead of connecting to the remote directly? Some clients and
 * registries only speak local stdio, or prefer a bearer key over interactive
 * OAuth. This binary gives them the same tool surface with a single env var.
 *
 * Introspection (initialize / tools/list / resources/list / prompts/list) is
 * answered from a bundled catalog and needs NO credentials, so registries can
 * inspect the server in a bare container. Only tools/call, resources/read and
 * prompts/get reach the network, and those require OFFNADIR_DELTA_API_KEY.
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import {
  CallToolRequestSchema,
  GetPromptRequestSchema,
  ListPromptsRequestSchema,
  ListResourcesRequestSchema,
  ListResourceTemplatesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

import { PROMPTS, RESOURCES, RESOURCE_TEMPLATES, TOOLS } from './catalog.js';

const VERSION = '1.3.13';
const REMOTE_URL = new URL(process.env.OFFNADIR_DELTA_MCP_URL ?? 'https://offnadir-delta.com/api/v1/mcp');

/** Lazily-connected client to the hosted remote MCP server. */
let remote: Client | null = null;
let connecting: Promise<Client> | null = null;

async function getRemote(): Promise<Client> {
  if (remote) return remote;
  if (connecting) return connecting;

  const apiKey = process.env.OFFNADIR_DELTA_API_KEY;
  if (!apiKey) {
    throw new Error(
      'OFFNADIR_DELTA_API_KEY is not set. Issue a key at https://offnadir-delta.com/account/api ' +
        'and pass it as the OFFNADIR_DELTA_API_KEY environment variable.',
    );
  }

  connecting = (async () => {
    const transport = new StreamableHTTPClientTransport(REMOTE_URL, {
      requestInit: { headers: { Authorization: `Bearer ${apiKey}` } },
    });
    const client = new Client({ name: 'offnadir-delta-mcp-proxy', version: VERSION }, { capabilities: {} });
    await client.connect(transport);
    remote = client;
    connecting = null;
    return client;
  })();

  try {
    return await connecting;
  } catch (err) {
    connecting = null;
    throw err;
  }
}

const server = new Server(
  { name: 'off-nadir-delta', title: 'Off-Nadir Delta', version: VERSION },
  { capabilities: { tools: {}, resources: {}, prompts: {} } },
);

// --- Introspection: answered locally, no network, no credentials. ---
server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: TOOLS }));
server.setRequestHandler(ListResourcesRequestSchema, async () => ({ resources: RESOURCES }));
server.setRequestHandler(ListResourceTemplatesRequestSchema, async () => ({ resourceTemplates: RESOURCE_TEMPLATES }));
server.setRequestHandler(ListPromptsRequestSchema, async () => ({ prompts: PROMPTS }));

// --- Execution: forwarded to the hosted remote server with the caller's key. ---
server.setRequestHandler(CallToolRequestSchema, async (req) => {
  const client = await getRemote();
  return client.callTool({ name: req.params.name, arguments: req.params.arguments ?? {} });
});

server.setRequestHandler(ReadResourceRequestSchema, async (req) => {
  const client = await getRemote();
  return client.readResource({ uri: req.params.uri });
});

server.setRequestHandler(GetPromptRequestSchema, async (req) => {
  const client = await getRemote();
  return client.getPrompt({ name: req.params.name, arguments: req.params.arguments ?? {} });
});

async function main(): Promise<void> {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  // Keep stderr for diagnostics only — stdout is the MCP transport.
  console.error(`off-nadir-delta MCP proxy v${VERSION} ready (remote: ${REMOTE_URL.href})`);
}

main().catch((err) => {
  console.error('Fatal:', err instanceof Error ? err.message : err);
  process.exit(1);
});
