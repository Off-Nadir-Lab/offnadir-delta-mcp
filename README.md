<!--
  AUTO-GENERATED from the Off-Nadir Delta contract registry
  (src/lib/api/toolRegistry.ts + src/lib/api/mcpResources.ts) by
  scripts/gen-contract-artifacts.mjs in the Off-Nadir Delta application repo.

  DO NOT EDIT BY HAND — `node scripts/gen-contract-artifacts.mjs --check` fails on drift,
  and scripts/publish-distribution.sh refuses to publish a stale copy.
-->

# Off-Nadir Delta MCP

**From first signal to satellite evidence.** Give an AI agent a live intelligence workflow:
discover an event, verify the reporting, identify what evidence is missing, determine whether a
satellite can actually resolve it, and produce a collection-ready plan.

Real-time event and geospatial intelligence for OSINT, geopolitical risk, and GEOINT work —
source-linked, geolocated, and current, not a training snapshot.

`20` tools · MCP server version `1.8.3` · [full reference](https://offnadir-delta.com/docs/mcp)

## What it does

Seeing the event is easy. Knowing what you can *prove* — and what evidence is still missing — is
the product. Delta:

- monitors emerging world events and geolocates them
- checks claims against source-linked open data, and reports the source breadth behind each one
- assesses whether the event is observable from space, at what resolution, and by which sensor
- returns a collection-ready recommendation: what to collect, where, and when

## Connect

### Hosted server — recommended

No install. Point any MCP client at the remote endpoint and approve once over OAuth 2.1
(Dynamic Client Registration is supported, so most clients need only the URL):

```
https://offnadir-delta.com/api/v1/mcp
```

In the Claude or ChatGPT apps: **Settings → Connectors → Add custom connector**, paste that URL.
Cursor and VS Code have one-click installs on the [docs page](https://offnadir-delta.com/docs/mcp).

Claude Code:

```bash
claude mcp add --transport http off-nadir-delta https://offnadir-delta.com/api/v1/mcp
```

### This package — local stdio

Use this when your client cannot do remote OAuth, or you would rather hold an API key in an
environment variable and pin a version. Get a key at
[offnadir-delta.com/account/api](https://offnadir-delta.com/account/api).

```json
{
  "mcpServers": {
    "off-nadir-delta": {
      "command": "npx",
      "args": ["-y", "offnadir-delta-mcp"],
      "env": { "OFFNADIR_DELTA_API_KEY": "ond_..." }
    }
  }
}
```

Docker:

```bash
docker run -i --rm -e OFFNADIR_DELTA_API_KEY=ond_... offnadir-delta-mcp
```

The package forwards `tools/call` to the hosted server with your key. `tools/list` answers
locally from a generated catalog, so registries can introspect it without credentials.

### First call — free

10 of the 20 tools cost nothing, so the first thing you run is free:

> Give me the latest Daily World Brief. Lead with the three most significant developments,
> explain why each matters, and cite the supporting signals.

Then try the full signal-to-satellite workflow:

> Find the highest-priority observable event from the last 24 hours, verify the reporting, and
> recommend the best available satellite collection plan.

## Tools

### Discover

What is happening, where it concentrates, and what today looks like.

| Tool | What it does | Cost |
| --- | --- | --- |
| `query_signals` | Query geolocated world event signals (Delta Signals: geopolitical, security, disaster, and infrastructure events distilled from global news media, AI-enriched with severity/GEOINT scores and satellite-collection recommendations). | 3 tok |
| `query_stats` | Aggregate statistics over the signal corpus — total event count plus per-category and per-day breakdown (trend) for a bounding box and date window. | 1 tok |
| `query_hotspots` | Geographic hotspots — signal density grid-binned into cells, ranked by event count, each with peak severity, the categories present, and up to 5 representative event_ids (trace a cell back to its signals). | 1 tok |
| `get_world_brief` | Fetch the Daily World Brief — an AI-synthesized OSINT/GEOINT digest of the previous UTC day's worldwide event signals (headline, executive summary, top developments with why-it-matters and what-to-watch, per-theme roll-up, ranked signals). | free |

### Plan

Whether a satellite can resolve it, which one, and when it next passes.

| Tool | What it does | Cost |
| --- | --- | --- |
| `search_imagery` | Search the satellite imagery catalog (Sentinel-1, Sentinel-2, NISAR L-band) for scenes over an area and date window — the natural follow-up to a signal (find imagery over the event location). | 2 tok |
| `plan_event_imagery` | Plan the imagery evidence for ONE event in a single call, instead of guessing collections one at a time. | 4 tok |
| `rank_imaging_priority` | WHERE — and with what class (and therefore cost) of satellite — is observation most worthwhile right now? | 1 tok |
| `survey_observable_events` | Which events in a window can a given in-app sensor actually RESOLVE? | 1 tok |
| `predict_satellite_passes` | WHEN can this place next be imaged, and by WHAT — the timing half of collection planning. | 2 tok |

### Analyze

Turn reporting into a cited assessment you can audit afterwards.

| Tool | What it does | Cost |
| --- | --- | --- |
| `assess_signal` | Run an AI RS (remote-sensing) deep-dive assessment for a specific signal: what to observe, recommended sensors, and a collection window. | 5/15 tok |
| `ask_analyst` | Ask the Delta Analyst an OSINT/GEOINT question. | 5–123 tok |
| `get_analyst_job` | Fetch the status and result of an ask_analyst run by job_id. | free |
| `query_claims` | Read the LEDGER of claims this key has been given — every factual assertion the Analyst made, with its evidence class (CONFIRMED / REPORTED / PARTY_CLAIM / ASSESSMENT), how many INDEPENDENT source families backed it, and the publishers. | free |

### Watch

Stand up continuous coverage and be told only when the answer changes. Creating and listing cost nothing — you are metered only when a check actually fires, or a new acquisition is actually measured.

| Tool | What it does | Cost |
| --- | --- | --- |
| `create_standing_order` | Put an area under CONTINUOUS watch: save a question plus a bounding box and Delta re-answers it on a schedule, notifying only when the answer actually changed. | free |
| `list_standing_orders` | List the standing orders on this key, with each one’s cadence, watched area, when it last checked, when it last actually fired, and how many consecutive checks found nothing (quiet_checks — a high number means the watch is not earning its place). | free |
| `delete_standing_order` | Delete a standing order by id, or pause/resume it instead by passing active=false/true. | free |
| `list_monitored_areas` | List the places under continuous satellite measurement on this key (Delta Monitor), with each area’s metric, most recent value, change since the previous measurement, whether that value was flagged anomalous, and coverage — how many acquisitions were measured versus how many exist. | free |
| `get_monitored_area` | Fetch one monitored area with its full measurement history — every acquisition that was measured, its value, and whether it was flagged anomalous. | free |
| `create_monitored_area` | Put a place under continuous satellite measurement: pick an area and what to count, and every new Sentinel-1 / Sentinel-2 / VIIRS acquisition over it is measured automatically from then on. | free |

### Account

Pre-flight your token balance before a metered call.

| Tool | What it does | Cost |
| --- | --- | --- |
| `get_usage` | Check the calling key's remaining token balance and plan capabilities — monthly allocation, tokens used this period, tokens remaining, and whether the plan includes AI tools over the API (assess_signal / ask_analyst). | free |

## Pricing and metering

Usage-based Delta tokens, identical over REST and MCP. Costs above are generated from the same
constant the biller reads, and every metered result carries the exact charge it incurred — so
you never have to trust a number in a README. Free tools never touch the balance.

`ask_analyst` is **hybrid-async**: it enqueues a run and returns a `job_id` immediately; poll
`get_analyst_job` (free — the run is charged once, on completion). Most questions finish in
~30–90s; a brief with satellite-imagery lookups or many sources can take 2–3 minutes.

The API and the MCP server are available on **every plan, including Free** — the only gate is
your token balance. Call `get_usage` (free) to pre-flight. Current limits and package prices:
[offnadir-delta.com/pricing](https://offnadir-delta.com/pricing).

## Authentication

Two credentials are accepted on the hosted endpoint:

- **OAuth 2.1** with PKCE and Dynamic Client Registration — for interactive clients
- **Bearer API key** (`Authorization: Bearer ond_...`) — for servers, CI, and this stdio package

Keys are shown once at creation, hashed at rest, and revocable at any time from
[/account/api](https://offnadir-delta.com/account/api).

## Resources and prompts

| Resource | Description |
| --- | --- |
| `brief://latest` | The most recent AI-synthesized Daily World Brief (JSON). Free. |
| `signals://schema` | JSON Schema of the public Signal shape returned by query_signals / /api/v1/signals. |
| `usage://current` | Remaining token balance and plan capabilities for the calling key. Free. |
| `imagery://collections` | The satellite catalog collections searchable via search_imagery — Sentinel-1 C-band SAR, Sentinel-2 optical, and NISAR L-band SAR (provisional calibration). Free. |
| `status://current` | How current the data is (ingestion/enrichment frontier), the Daily World Brief status, and an Operational/Delayed/Degraded roll-up. Free. |
| `brief://{date}` | The Daily World Brief for a specific UTC date (YYYY-MM-DD). Free. |

| Prompt | Description |
| --- | --- |
| `daily-situation-briefing` | Summarize the current world situation from the Daily World Brief. |
| `assess-top-signal` | Find the highest-severity recent signal in an area/category and run an RS assessment. |
| `aoi-watch` | Scan an area of interest for recent escalations and recommend collection. |
| `market-exposure-check` | Find recent events that could plausibly move a given market (oil, grain, shipping, ...) and explain each transmission channel. Informational only — not investment advice. |

## Links

- [Tool reference, setup, and one-click installs](https://offnadir-delta.com/docs/mcp)
- [REST API reference](https://offnadir-delta.com/docs/api) · [OpenAPI](https://offnadir-delta.com/api/v1/openapi.json)
- [Changelog and compatibility policy](https://offnadir-delta.com/docs/changelog)
- [Live server version probe](https://offnadir-delta.com/api/v1/version) (no auth, no tokens)

## License

Apache-2.0
