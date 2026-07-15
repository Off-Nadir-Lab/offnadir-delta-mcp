# Off-Nadir Delta — MCP server (stdio)

Local [Model Context Protocol](https://modelcontextprotocol.io) server for **[Off-Nadir Delta](https://offnadir-delta.com/mcp)** — live, geolocated world-event intelligence for AI agents.

It exposes the same tool surface as the hosted server and **forwards every call** to `https://offnadir-delta.com/api/v1/mcp` using your API key. Use this if your client prefers a local stdio server and a bearer key over the remote OAuth connector.

> Prefer zero-install? Point any MCP client straight at the hosted endpoint
> `https://offnadir-delta.com/api/v1/mcp` (OAuth 2.1 or a bearer key). See the
> [docs](https://offnadir-delta.com/docs/mcp). This package is the local option.

## Tools

| Tool | Cost | What it does |
|------|------|--------------|
| `query_signals` | 3 | Geolocated world-event signals by area / date / category, with severity, escalation, and GEOINT scores. |
| `query_stats` | 1 | Event counts by category and day for an area/window. |
| `query_hotspots` | 1 | Where activity is concentrating — grid-binned, ranked. |
| `search_imagery` | 2 | Satellite scenes (Sentinel-1/2, OPERA RTC-S1) over an area. |
| `get_world_brief` | **free** | The AI-synthesized Daily World Brief. |
| `get_usage` | **free** | Your remaining token balance and plan capabilities. |
| `assess_signal` | 5 / 15 | AI remote-sensing assessment for one signal (quick / deep). |
| `ask_analyst` | 5–45 | Agentic OSINT/GEOINT Q&A returning a structured, cited brief. |

Plus resources (`brief://latest`, `brief://{date}`, `signals://schema`, `usage://current`, `imagery://collections`) and prompts (`daily-situation-briefing`, `assess-top-signal`, `aoi-watch`, `market-exposure-check`).

Costs are token charges against your balance. Reading the brief and checking usage are free; only your token balance gates metered calls. **Free tier available** — start with `get_world_brief` (0 tokens).

## Setup

1. Get an API key at <https://offnadir-delta.com/account/api> (issued self-serve; format `ond_…`).
2. Add the server to your MCP client.

### Claude Desktop / Claude Code (`claude_desktop_config.json`)

```json
{
  "mcpServers": {
    "off-nadir-delta": {
      "command": "npx",
      "args": ["-y", "offnadir-delta-mcp"],
      "env": { "OFFNADIR_DELTA_API_KEY": "ond_your_key_here" }
    }
  }
}
```

### From source

```bash
git clone https://github.com/Off-Nadir-Lab/offnadir-delta-mcp.git
cd offnadir-delta-mcp
npm install && npm run build
OFFNADIR_DELTA_API_KEY=ond_... node dist/index.js
```

### Docker

```bash
docker build -t offnadir-delta-mcp .
docker run --rm -i -e OFFNADIR_DELTA_API_KEY=ond_... offnadir-delta-mcp
```

## Environment

| Variable | Required | Default | Notes |
|----------|----------|---------|-------|
| `OFFNADIR_DELTA_API_KEY` | for tool calls | — | Bearer key from `/account/api`. Not needed for `tools/list` introspection. |
| `OFFNADIR_DELTA_MCP_URL` | no | `https://offnadir-delta.com/api/v1/mcp` | Override the remote endpoint (testing). |

## How it works

Introspection (`initialize`, `tools/list`, `resources/list`, `prompts/list`) is answered from a bundled catalog with **no network and no credentials**. Execution (`tools/call`, `resources/read`, `prompts/get`) is forwarded to the hosted remote server over Streamable HTTP with your `OFFNADIR_DELTA_API_KEY`.

## Links

- MCP overview: <https://offnadir-delta.com/mcp>
- Docs / setup: <https://offnadir-delta.com/docs/mcp>
- Python SDK: <https://pypi.org/project/offnadir-delta/>
- Official MCP Registry: `com.offnadir-delta/mcp`

## License

[Apache-2.0](./LICENSE) © Off-Nadir Lab
